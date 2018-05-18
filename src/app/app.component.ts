import { Component, OnInit, OnDestroy, Input, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginServices } from './home-login/login.services';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  url: string;
  haha: any;
  windHeight: any;
  showDashboard = true;
  public loading = false;
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  @Input() authentication: boolean;

  constructor(private element: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private log: LoginServices,
    private afAuth: AngularFireAuth) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.showDashboard = false;
        } else {
          this.showDashboard = true;
        }
      }

      setTimeout(function () {
        // Remove overflow from .wrapper if layout-boxed exists
        $('.layout-boxed > .wrapper').css('overflow', 'hidden');
        // Get window height and the wrapper height
        const footer_height = $('.main-footer').outerHeight() || 0;
        const neg = $('.main-header').outerHeight() + footer_height;
        const window_height = $(window).height();
        const sidebar_height = $('.sidebar').height() || 0;
        // Set the min-height of the content and sidebar based on the
        // the height of the document.

        if ($('body').hasClass('fixed')) {
          $('.content-wrapper, .right-side').css('min-height', window_height - footer_height);
        } else {
          let postSetWidth;
          if (window_height >= sidebar_height) {
            $('.content-wrapper, .right-side').css('min-height', window_height - neg);
            postSetWidth = window_height - neg;
          } else {
            $('.content-wrapper, .right-side').css('min-height', sidebar_height);
            postSetWidth = sidebar_height;
          }

          // Fix for the control sidebar height
          // const controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
          // if (typeof controlSidebar !== 'undefined') {
          //   if (controlSidebar.height() > postSetWidth) {
          //     $('.content-wrapper, .right-side').css('min-height', controlSidebar.height());
          //   }

          // }

        }

      }, 10);

    });
    // this.haha = this.element.nativeElement;
    // this.loading = true;
    // this.haha.style.height = '100%';
    // this.windHeight = (window.screen.height) + 'px';

  }

  ngOnInit() {
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

  logout() {
    this.log.logout();
    this.afAuth.auth.signOut();
  }
}
