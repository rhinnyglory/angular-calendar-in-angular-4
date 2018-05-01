import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }
  httpcall(url: string, method: string, data?: any) {
    const header = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic3VwZXJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoic3VwZXIgYWRtaW4iLCJyb2xlSWQiOjF9.WolIQhqXH9M0MDR4WpjIFfDL0DyfVKbtlnSkGR8TgJ8'
    });
    const options = new RequestOptions({ headers: header });
    if (method !== 'put' && method !== 'post') {
      return this.http[method]('http://192.168.1.44:3030/' + url, options, data)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http[method]('http://192.168.1.44:3030/' + url, data, options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

// @Injectable()
// export class MessageService {
//     private _listners = new Subject<any>();

//     listen(): Observable<any> {
//        return this._listners.asObservable();
//     }

//     filter(filterBy: any) {
//        this._listners.next(filterBy);
//     }
// }

