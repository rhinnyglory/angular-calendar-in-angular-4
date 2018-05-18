import { Component, OnInit, OnDestroy, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserServices } from './login.services';
import { Login } from './../events';
import { LoginServices } from './login.services';

@Component({
    selector: 'app-home-login',
    templateUrl: './home-login.component.html',
    styleUrls: ['./home-login.component.scss'],
})
export class HomeLoginComponent implements OnInit, OnDestroy {
    body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    model: Login = {
        email: 'superadmin@gmail.com',
        password: '123456'
    };
    errMsg: string;

    private loading = false;
    public userRights: any;
    returnUrl: string;

    constructor(
        // private appComponent: AdminComponent,
        private loginServices: LoginServices,
        private userServices: UserServices,
        private router: Router) {
        if (localStorage.getItem('auth')) {
            this.router.navigate(['/calendars']);
        }
        document.title = 'Login - The Model Book';
    }

    ngOnInit() {
        this.body.classList.add('admin-login');
    }
    ngOnDestroy() {
        this.body.classList.remove('admin-login');
    }

    login() {
        this.loginServices.login(this.model).subscribe((token: HttpResponse<any>) => {
            console.log(token.body.success, '123');
            const xToken = token.headers.get('x-access-token');
            localStorage.setItem('auth', xToken);
            const LoginResponse = token.body.data;
            localStorage.setItem('email', LoginResponse.email);
            localStorage.setItem('name', LoginResponse.name);
            localStorage.setItem('userId', LoginResponse.userId);
            localStorage.setItem('roleId', LoginResponse.roleId);
            this.router.navigate(['/calendars']);
            // this.userServices.userinfo().subscribe(user => {
            //     localStorage.setItem('userinfo', JSON.stringify(user));
            //     console.log(localStorage.getItem('userinfo'), 'glory');
            //     localStorage.setItem('adminName', user.data.name);
            //     localStorage.setItem('adminEmail', user.data.email);
            //     // this.appComponent.setUser(user.data);
            //     if (user.success) {
            //         console.log(user.success, 'usersssssssssssssss');
            //         this.router.navigate(['/calendars']);
            //     }
            // });
            if (!token.body.success) {
                this.errMsg = token.body.msg;
            }
        }, err => {
            this.loading = false;
            this.errMsg = 'Incorrect Email or Password';
        });
    }
}
