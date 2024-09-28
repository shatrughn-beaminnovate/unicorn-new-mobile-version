import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';

// Import Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-onboarding-swiper',
  templateUrl: './onboarding-swiper.component.html',
  styleUrls: ['./onboarding-swiper.component.scss']
})
export class OnboardingSwiperComponent implements OnInit {

  // config: SwiperOptions = {
  //   pagination: { clickable: true },
  //   navigation: true,
  //   loop: false, // We don't want to loop
  //   on: {
  //     reachEnd: () => this.onReachEnd(),
  //   },
  // };

  isAndroid: boolean = false;

  constructor(
    // private router: Router,
    // private platform: Platform
  ) { }

  ngOnInit(): void {
    //   // Detect if the platform is Android using Cordova's device plugin
    //   if (this.platform.ANDROID) {
    //     this.isAndroid = true;
    //     this.enterFullscreen();
    //   }
  }

  // // Function to enter fullscreen mode if on Android
  // enterFullscreen() {
  //   if (this.isAndroid) {
  //     // You can use Cordova's full screen plugin or CSS to manage this.
  //     document.documentElement.requestFullscreen();
  //   }
  // }

  // // Action when the last slide is reached
  // onReachEnd() {
  //   if (this.isAndroid) {
  //     this.exitFullscreen();
  //   }

  //   const isLoggedIn = this.userService.isLoggedIn(); // Check if the user is logged in
  //   if (isLoggedIn) {
  //     this.router.navigate(['/home']); // Redirect to home if logged in
  //   } else {
  //     this.router.navigate(['/m-login']); // Redirect to login if not logged in
  //   }
  // }

  // // Exit fullscreen mode when the swiper is closed
  // exitFullscreen() {
  //   if (document.fullscreenElement) {
  //     document.exitFullscreen();
  //   }
  // }

}
