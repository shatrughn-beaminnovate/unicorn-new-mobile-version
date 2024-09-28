import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';
import { DummyDataService } from 'src/app/core/services/dummy-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  @ViewChild('floatingSocialLink') floatingSocialLink!: ElementRef;
  newsLetterForm!: FormGroup;
  isNewsLetterSubmitted = false;
  isNewsLetterFormSaving = false;
  destroy = new Subject();
  destroy$ = this.destroy.asObservable();
  isNavbarActive = false;
  degrees: number = 308;
  pagesList: any[] = [];
  socialMediaHolder: any[] = [];
  currentYear = new Date().getFullYear();
  isCookiesAccepted = false;
  newsLetterSubscribed = { status: false, message: '', email: '' }
  primaryFontHolder!: any;
  secondaryFontHolder!: any;
  disableButtons!: boolean;
  socialMediaHolders: any[] = [];
  socialMedia: any;
  imgUrl = environment.imgUrl;
  ipflStatus: number = 0;
  maintenanceMode: number = 0;
  maintenanceDescription: string = '';
  maintenanceTitle: string = '';
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private meta: Meta,
    private titleService: Title,
    private dummyService: DummyDataService
  ) {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  onDeviceReady() {
    if (this.floatingSocialLink && this.floatingSocialLink.nativeElement) {
      this.floatingSocialLink.nativeElement.remove();
    }
  }

  get f() {
    return this.newsLetterForm.controls;
  }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    const storedState = localStorage.getItem('buttonState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.disableButtons = parsedState.disableButtons;

    }
    this.isCookiesAccepted = localStorage.getItem('acceptCookies') === 'true';
    this.getClientSetting();
    this.getFontSetting();
    fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$)).subscribe(() => {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      // let scrollPercentRounded = Math.round(scrollPercent * 100);
      this.degrees = 308 - (scrollPercent * 308);
      this.isNavbarActive = document.documentElement.scrollTop > 100;
    });
    let newsLetterSubscribed = JSON.parse(localStorage.getItem('newsLetterSubscribed')!);

    if (newsLetterSubscribed && newsLetterSubscribed.status === true) {
      this.newsLetterSubscribed = newsLetterSubscribed;
    }
    this.initNewsLetterForm();
    this.getAllPagesList();
  }


  toggleButtons() {
    this.disableButtons = !this.disableButtons;
    const currentState = { disableButtons: this.disableButtons, };
    localStorage.setItem('buttonState', JSON.stringify(currentState));
  }

  getIconClass(socialMediaName: string): string {
    switch (socialMediaName.toLowerCase()) {
      case 'facebook':
        return 'fa-facebook-square';
      case 'instagram':
        return 'fa-instagram-square';
      case 'youtube':
        return 'fa-youtube';
      case 'linkedin':
        return 'fa-linkedin';
      case 'twitter':
        return 'fa-twitter-square';
      default:
        return '';
    }
  }

  initNewsLetterForm() {
    let emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.newsLetterForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]]
    });
  }

  /**
   * Retrieves client settings and updates the meta tags, site title, and header data.
   */
  getClientSetting() {
    // this.commonService.getRequest('client_setting?key=ss_link|site_title|site_keywords|site_description|google_analytics|cashify_toggle|crt_toggle|ipfl|maintenance_mode|maintenance_title|maintenance_description|notice_bar_enabled|notice_bar_description|notice_bar_closable').subscribe((res: any) => {
    this.dummyService.getClientSettings().subscribe((res: any) => {
      if (res?.status === true) {
        if (res.data.length > 0) {
          if (res.data[0] && res.data[0].length > 0) {
            this.socialMediaHolder = res.data[0]
            const filteredSocialMedia = this.socialMediaHolder.filter((socialMedia: any) => socialMedia.url !== "");
            // console.log("Filtered social media:", filteredSocialMedia);
            this.socialMediaHolders = filteredSocialMedia
          }
          this.commonService.isCashifyAllowed.next(res.data[5]);
          this.commonService.isCRTAllowed.next(res.data[6]);

          // Update meta description
          // this.meta.updateTag({ name: 'description', content: 'Your meta description here' });

          // Update meta keywords
          this.meta.updateTag({ name: 'keywords', content: res.data[2] });

          const metaDescriptions = res.data[3];

          if (metaDescriptions) {
            // Create a div element to safely parse the HTML string
            const tempDiv = document.createElement('div'); // Create a div element to safely parse the HTML string
            tempDiv.innerHTML = metaDescriptions; // Set the HTML content with the provided string

            const metaTags = tempDiv.querySelectorAll('meta'); // Find all meta tags with the name "description" within the div

            if (metaTags.length > 0) {
              // Clone and append each meta tag to the <head> element
              metaTags.forEach(metaTag => {
                const clonedMetaTag = metaTag.cloneNode(true); // Clone the meta tag
                document.querySelector('head')!.appendChild(clonedMetaTag); // Append the cloned meta tag to <head>
              });
            }
          }
          // Update Site title
          this.titleService.setTitle(res.data[1].site_title);

          // Hold Google Analytics Code With Script
          const googleAnalyticsScriptTag = res.data[4];

          if (googleAnalyticsScriptTag) {
            const tempDiv = document.createElement('div'); // Create a div element to safely parse the HTML string
            tempDiv.innerHTML = googleAnalyticsScriptTag; // Set the HTML content with the provided string

            const scriptElement = tempDiv.querySelector('script'); // Find the script element

            if (scriptElement) {
              document.querySelector('head')?.appendChild(scriptElement); // Append the script element to the <head> element
            }
          }


          this.commonService.headerData.next({
            ipflStatus: res.data[7],
            maintenanceMode: res.data[8],
            maintenanceTitle: res.data[9],
            maintenanceDescription: res.data[10],
            noticeBarEnabled: res.data[11],
            noticeBarDescription: res.data[12],
            noticeBarClosable: res.data[13]
          });

        }
      }
    });
  }


  getAllPagesList() {
    // this.commonService.getData('get_page/all').subscribe((res) => {
    this.dummyService.getPageList().subscribe((res) => {
      if (res.status === true) {
        this.pagesList = res.data;
      }
    });
  }

  getFontSetting() {
    // this.commonService.getRequest('get_theme/font').subscribe((res: any) => {
    //   if (res && res.component_type === 'font') {
    //     this.primaryFontHolder = res.component_values.primarySelectedFont;
    //     this.secondaryFontHolder = res.component_values.secondarySelectedFont;
    //     // console.log('this.primaryFontHolder : ', this.primaryFontHolder);
    //     // console.log('this.secondaryFontHolder : ', this.secondaryFontHolder);
    //     // Set Primary Font Family 
    //     let pLink = document.createElement('link');
    //     pLink.href = this.primaryFontHolder.font_url;
    //     pLink.rel = 'stylesheet';
    //     document.head.appendChild(pLink);
    //     // Update style to body tag for font family 
    //     document.body.style.fontFamily = this.primaryFontHolder.font_family;

    //     // Set Secondary Font Family
    //     let sLink = document.createElement('link');
    //     sLink.href = this.secondaryFontHolder.font_url;
    //     sLink.rel = 'stylesheet';
    //     document.head.appendChild(sLink);
    //     // Update style to body tag for font family
    //     // document.body.style.fontFamily = this.secondaryFontHolder.font_family;
    //   }
    // });
  }

  scrollToTop() {
    document.documentElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  ngOnDestroy(): void {
    this.ipflStatus = 0;
    this.maintenanceMode = 0;
    this.maintenanceDescription = '';
    this.maintenanceTitle = '';
    this.destroy.next();
  }

  submitNewsLetterForm() {
    this.isNewsLetterSubmitted = true;
    if (this.newsLetterForm.invalid) {
      return;
    }

    let subscribePayload = {
      name: this.newsLetterForm.value.name,
      email: this.newsLetterForm.value.email,
      subscribe: true
    };

    this.isNewsLetterFormSaving = true;
    this.commonService.postRequest('newsletter_subscribers', subscribePayload).subscribe((res: any) => {
      this.isNewsLetterFormSaving = false;
      this.isNewsLetterSubmitted = false;
      if (res.status === true) {
        this.newsLetterSubscribed.status = true;
        this.newsLetterSubscribed.message = res.message || 'You have successfully subscribed to our newsletter.';
        this.newsLetterSubscribed.email = this.newsLetterForm.value.email;
        localStorage.setItem('newsLetterSubscribed', JSON.stringify(this.newsLetterSubscribed));
        this.newsLetterForm.reset();
      } else {
        this.newsLetterSubscribed.status = false;
        this.newsLetterSubscribed.message = res.message || 'Something went wrong. Please try again later.';
        localStorage.setItem('newsLetterSubscribed', JSON.stringify(this.newsLetterSubscribed));
      }
    });
  }

  newsLetterUnSubscribe() {
    let unsubscribePayload = {
      email: JSON.parse(localStorage.getItem('newsLetterSubscribed')!).email,
      subscribe: false
    };
    this.commonService.postRequest('newsletter_subscribers', unsubscribePayload).subscribe((res: any) => {
      if (res.status === true) {
        this.newsLetterSubscribed.status = false;
        this.newsLetterSubscribed.message = res.message || 'You have successfully unsubscribed from our newsletter.';
        localStorage.setItem('newsLetterSubscribed', JSON.stringify(this.newsLetterSubscribed));
        // After unsubscribing, we need to remove the email from local storage after 5 seconds and set the message to empty string. 
        setTimeout(() => {
          localStorage.removeItem('newsLetterSubscribed');
          this.newsLetterSubscribed.message = '';
        }, 5000);
      } else {
        this.newsLetterSubscribed.status = true;
        this.newsLetterSubscribed.message = res.message || 'Something went wrong. Please try again later.';
      }
    });
  }

  onClickAcceptCookies() {
    this.isCookiesAccepted = true;
    localStorage.setItem('acceptCookies', 'true');
  }
}
