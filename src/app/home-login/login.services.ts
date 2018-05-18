import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpService } from './../demo-utils/http.service';
import { Login, Token, User } from './../events';

declare var $: any;

@Injectable()
export class LoginServices {

  constructor(private http: HttpClient, private router: Router, private httpcaller: HttpService) { }

  private tokenUrl = 'http://192.168.1.201:3030/' + 'front-login';
  private headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  login(login: Login): Observable<any> {
    const data = { ...login };
    return this.http.post<Login>(this.tokenUrl, $.param(data), { headers: this.headers, observe: 'response' });
  }

  logout() {
    // remove user from local storage to log user out
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}

@Injectable()
export class UserServices {

  constructor(private http: HttpClient, private httpcaller: HttpService) { }

  private userUrl = 'http://192.168.1.201:3030/';
  userinfo(): Observable<User> {
    const header = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('auth')
    });
    const options = new RequestOptions({ headers: header });
    // return this.http.get<User>(this.userUrl + 'admin-profile');
    return this.http.get<User>(this.userUrl + 'admin-profile',
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('auth'))
      });
  }
}
