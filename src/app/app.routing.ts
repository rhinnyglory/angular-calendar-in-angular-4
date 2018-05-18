
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticateGuard } from './guards/authenticate.guard';
import { CalendarsComponent } from './calendars/calendars.component';
import { LoginComponent } from './login/login.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { ChatComponent } from './chat/chat.component';
import { RazorPayComponent } from './razor-pay/razor-pay.component';
const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full', data: { 'pageName': '' } },
  {
    path: 'login',
    component: HomeLoginComponent,
    data: {
      'pageName': 'Login'
    }
  },
  {
    path: 'calendars',
    component: CalendarsComponent,
    canActivate: [AuthenticateGuard],
    data: {
      'pageName': 'Calendars'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthenticateGuard],
    data: {
      'pageName': 'Chat'
    }
  }, {
    path: 'payment',
    component: RazorPayComponent,
    canActivate: [AuthenticateGuard],
    data: {
      'pageName': 'Payment'
    }
  }
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   canActivate: [AuthenticateGuard],
  //   data: { 'pageName': 'Users' },
  //   children: [
  //     { path: 'add', component: UserEditAddComponent, data: { 'pageName': 'Add User' } },
  //     { path: 'edit/:id', component: UserEditAddComponent, data: { 'pageName': 'Edit User' } },
  //     { path: 'view/:id', component: UserDetailComponent, canActivate: [AuthenticateGuard], data: { 'pageName': 'User Details' } },


  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
