import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule
  ],
  declarations: [CalendarHeaderComponent, DateTimePickerComponent],
  exports: [CalendarHeaderComponent, DateTimePickerComponent]
})
export class DemoUtilsModule {}
