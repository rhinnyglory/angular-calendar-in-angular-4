import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../app/demo-utils/demo-utils.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { HttpService } from './demo-utils/http.service';
import { EventService } from './demo-utils/event.service';
import { HttpModule } from '@angular/http';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';
import { LoginComponent } from './login/login.component';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';
import { ChatComponent } from './chat/chat.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CalendarsComponent } from './calendars/calendars.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { LoginServices, UserServices } from './home-login/login.services';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { RazorPayComponent } from './razor-pay/razor-pay.component';
import { AuthService } from './chat/auth.service';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '80738151486-ujc4aem3g8qq1bs5rg042opudl1lufbj.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics'
  ].join(' ')
};

export const firebaseConfig = {
  apiKey: 'AIzaSyDO7qnojyhYz2igwaVbcLeCnQaf0oNN9jw',
  authDomain: 'my-project-1475153076448.firebaseapp.com',
  databaseURL: 'https://my-project-1475153076448.firebaseio.com',
  projectId: 'my-project-1475153076448',
  storageBucket: 'my-project-1475153076448.appspot.com',
  messagingSenderId: '804427523017'
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    CalendarsComponent,
    HomeLoginComponent,
    RazorPayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    AppRoutingModule,
    CalendarModule.forRoot(),
    DemoUtilsModule,
    BrowserAnimationsModule,
    HttpModule,
    SocialLoginModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [HttpService, EventService, LoginServices, UserServices, AuthenticateGuard, AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    // {
    //   id: FacebookLoginProvider.PROVIDER_ID,
    //   provider: new FacebookLoginProvider('Your-Facebook-app-id')
    // },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('80738151486-ujc4aem3g8qq1bs5rg042opudl1lufbj.apps.googleusercontent.com')
    },
  ]);
  return config;
}
