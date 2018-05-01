import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private gapiService: GoogleApiService) { }

  ngOnInit() {
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      console.log(GoogleLoginProvider.PROVIDER_ID, 'GoogleLoginProvider.PROVIDER_ID');
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ', userData);
        // this.gapiService.onLoad().subscribe(() => {
        //   // Here we can use gapi
        //   gapi.client.calendar.events.list({
        //     'calendarId': 'primary',
        //     'timeMin': (new Date()).toISOString(),
        //     'showDeleted': false,
        //     'singleEvents': true,
        //     'maxResults': 10,
        //     'orderBy': 'startTime'
        //   }).then(function (response) {
        //     const events = response.result.items;
        //     appendPre('Upcoming events:');

        //     if (events.length > 0) {
        //       for (let i = 0; i < events.length; i++) {
        //         const event = events[i];
        //         const when = event.start.dateTime;
        //         if (!when) {
        //           when = event.start.date;
        //         }
        //         appendPre(event.summary + ' (' + when + ')')
        //       }
        //     } else {
        //       appendPre('No upcoming events found.');
        //     }
        //   });
        // });
      }
    );
  }
}
