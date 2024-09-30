import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './core/services/auth.service';
import { Platform } from '@angular/cdk/platform';
declare var cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // @ViewChild(NewsletterComponent) newsletterComponent!: NewsletterComponent;
  showHeaderFooter = true;
  headerData = {
    maintenanceMode: 0,
    maintenanceTitle: '',
    maintenanceDescription: '',
  }

  // @ViewChild('openLink') openLink!: ElementRef;
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public loaderService: LoaderService,
    public cdr: ChangeDetectorRef,
    public route: ActivatedRoute,
    private authService: AuthService,
    private platform: Platform
  ) {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  onDeviceReady() {
    // if (this.openLink) {
    //   this.openLink.nativeElement.addEventListener('click', this.showBrowser.bind(this));
    // }



  }

  // showBrowser() {
  //   const target = '_blank';
  //   const url = 'https://www.google.com';
  //   if (cordova && cordova.InAppBrowser) {
  //     cordova.InAppBrowser.open(url, target, 'location=no');
  //   } else {
  //     console.error('InAppBrowser plugin is not available or not initialized.');
  //   }
  // }

  /**
   * Initializes the component.
   * 
   * - Enables PrimeNG ripple effect.
   * - Toggles the visibility of header and footer based on the current route.
   * - Navigates to the login page if the platform is Android and the user is not logged in.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    // this.router.navigate(['/m-login']);
    this.primengConfig.ripple = true;
    setTimeout(() => {
      this.showHeaderFooter = !this.router.url.startsWith('/blinkit');
    });

    if (this.platform.ANDROID) {
      if (!this.authService.isLoggedIn) {
        this.router.navigate(['/m-login']);
      }
    }

    // this.loaderService.isLoading.subscribe((value) => {
    //   if (value) {
    //     this.isPageLoading = true;
    //   } else {
    //     this.isPageLoading = false;
    //   }
    // });

    // this.isGlobalLoader.subscribe((value) => {
    //   if (value) {
    //     this.isPageLoading = true;
    //   } else {
    //     this.isPageLoading = false;
    //   }
    // });

    // this.commonService.headerData$.subscribe((headerDataObj) => {
    //   if (Object.keys(headerDataObj).length > 0) {
    //     this.headerData = headerDataObj;
    //   } else {
    //     this.headerData = {
    //       maintenanceMode: 0,
    //       maintenanceTitle: '',
    //       maintenanceDescription: '',
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     const isLoggedIn = this.authService.isLoggedIn;
    //     const isHomePage = event.url === '/';
    //     const isAccountPage = event.url === '/account';
    //     const hasShownModal = localStorage.getItem('loginNewsletter') === 'true';

    //     if ((isLoggedIn && isAccountPage && !hasShownModal)) {
    //       this.newsletterComponent.showDialog();
    //       this.cdr.detectChanges();
    //       localStorage.setItem('loginNewsletter', 'true');
    //     }

    //     if ((event.url === '/' && event.id === 1)) {
    //       const showSubscribeValue = localStorage.getItem('showSubscribe');
    //       const shouldShowModal = showSubscribeValue !== 'true';

    //       if (shouldShowModal) {
    //         this.newsletterComponent.showDialog();
    //         this.cdr.detectChanges();
    //       }
    //     }
    //   }
    // });
  }

}
