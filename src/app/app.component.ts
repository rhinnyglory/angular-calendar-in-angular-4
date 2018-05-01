import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { DatePipe } from '@angular/common';

import { EventService } from './demo-utils/event.service';
import { EventsTypes } from './events';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  // moduleId: __moduleName,
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('addEvents') addEvents: TemplateRef<any>;
  view = 'month';
  datePipe = new DatePipe('en-US');

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event, '');
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event, '');
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  newEve = {
    eTitle: '',
    ePrimaryColor: '',
    eSecondaryColor: '',
    color: {
      primary: '',
      secondary: ''
    },
    eStartDate: '',
    eEndDate: '',
    eAgencyId: 1,
    eModelId: 4,
    eClientId: 3,
    createdBy: 2,
    eLocation: '',
    eStartTime: '',
    eEndTime: ''
  };
  getEves: CalendarEvent[] = [];
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  ngOnInit() {
    this.getEvents();
  }
  constructor(private modal: NgbModal, private eve: EventService) { }

  getEvents() {
    this.eve.getEves().then(users => {
      users.data.forEach(obj => {
        const data = {
          id: obj.eId,
          start: startOfDay(obj.eStartDate),
          end: addDays(obj.eEndDate, 0),
          title: obj.eTitle,
          color: {
            primary: obj.ePrimaryColor,
            secondary: obj.eSecondaryColor
          },
          actions: this.actions
        };
        this.events.push(data);
      });
      this.view = 'month';
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event, '');
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent, events): void {
    this.eve.getEveData(event.id).then(data => {
      this.newEve = data.data;
      this.newEve.eStartDate = this.datePipe.transform(this.newEve.eStartDate, 'yyyy-MM-dd');
      this.newEve.eEndDate = this.datePipe.transform(this.newEve.eEndDate, 'yyyy-MM-dd');
      console.log(this.newEve, '456');
    }).catch(err => {
      console.log(err, '456');
    });
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addCalendarEvent(): void {
    this.newEve = {
      eTitle: '',
      ePrimaryColor: '',
      eSecondaryColor: '',
      color: {
        primary: '',
        secondary: ''
      },
      eStartDate: '',
      eEndDate: '',
      eAgencyId: 1,
      eModelId: 4,
      eClientId: 3,
      createdBy: 2,
      eLocation: '',
      eStartTime: '',
      eEndTime: ''
    };
    this.modal.open(this.addEvents, { size: 'lg' });
  }

  addNewEvent(): void {
    this.events.push({
      title: this.newEve.eTitle,
      start: startOfDay(this.newEve.eStartDate),
      end: endOfDay(this.newEve.eEndDate),
      color: this.newEve.color,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.eve.creatEvent(this.newEve).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
    this.refresh.next();
  }

  updateEvent() {
    this.eve.updateEvent(this.newEve).then(data => {
      console.log(data);
      const dataupdate = {
        primary: this.newEve.ePrimaryColor,
        secondary: this.newEve.eSecondaryColor,
      };
      this.events.filter(eve => {
        if (eve.id === data.data.id) {
          eve.color = dataupdate;
          eve.title = this.newEve.eTitle;
          eve.start = startOfDay(this.newEve.eStartDate);
          eve.end = endOfDay(this.newEve.eEndDate);
        }
        this.refresh.next();
      });
    }).catch(err => {
      console.log(err);
    });
    this.refresh.next();
  }

  deleteEvent(id: any) {
    this.eve.delEveData(id).then(data => {
      const delEve = this.events.filter(
        eve => eve.id === id);
      const index = this.events.indexOf(delEve[0]);
      this.events.splice(index, 1);
      this.refresh.next();
    }).catch(err => {
      console.log(err);
    });
  }
}


// addEvent(): void {
//   this.events.push({
//     title: 'New event',
//     start: startOfDay(new Date()),
//     end: endOfDay(new Date()),
//     color: colors.red,
//     draggable: true,
//     resizable: {
//       beforeStart: true,
//       afterEnd: true
//     }
//   });
//   this.refresh.next();
// }

// this.events = [
    //   {
    //     start: startOfDay(new Date()),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'An event with no end date',
    //     color: colors.yellow,
    //     actions: this.actions
    //   },
    //   {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: colors.blue
    //   },
    //   {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: new Date(),
    //     title: 'A draggable and resizable event',
    //     color: colors.yellow,
    //     actions: this.actions,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true
    //     },
    //     draggable: true
    //   }
    // ];