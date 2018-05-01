import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class EventService {
  constructor(private httpcaller: HttpService) { }
  getEves() {
    return this.httpcaller.httpcall('front/v1/get-events', 'get', {});
  }

  getEveData(id: any) {
    return this.httpcaller.httpcall('front/v1/event-details/' + id, 'get', {});
  }

  delEveData(id: any) {
    return this.httpcaller.httpcall('front/v1/delete-event/' + id, 'delete', {});
  }

  creatEvent(params: object) {
    return this.httpcaller.httpcall('front/v1/create-event', 'post', params);
  }

  updateEvent(params: object) {
    return this.httpcaller.httpcall('front/v1/update-event', 'put', params);
  }
}

