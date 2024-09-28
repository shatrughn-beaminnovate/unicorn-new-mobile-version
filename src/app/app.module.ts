import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from "./pages/home/home.component";
import { CommonService } from "./core/services/common.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";
import { AuthService } from "./core/services/auth.service";
import { AlertComponent } from './core/shared/alert/alert.component';
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule } from 'primeng/toast';
import { SharedModule } from "./core/shared/shared.module";
import { RatingModule } from 'primeng/rating';
import { SwiperModule } from 'swiper/angular';
import { CarouselModule } from 'primeng/carousel';
import { DataLayerService } from './core/services/data-layer.service';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { NewsAndEventComponent } from './pages/news-and-event/news-and-event.component';
import { SidebarModule } from 'primeng/sidebar';
import { GalleriaModule } from 'primeng/galleria';
import { FilterByIdPipe } from './pages/home/home.component';
import { LazyLoadSectionDirective } from './core/directive/lazy-load-section.directive';
import { DealsOfTheDayComponent } from './pages/home/deals-of-the-day/deals-of-the-day.component';
import { WeeklyBestsellersComponent } from './pages/home/weekly-bestsellers/weekly-bestsellers.component';
import { BestsellersComponent } from './pages/home/bestsellers/bestsellers.component';
import { FeaturedProductsComponent } from './pages/home/featured-products/featured-products.component';
import { RecommendedAccessoriesComponent } from './pages/home/recommended-accessories/recommended-accessories.component';
import { SkeletonModule } from 'primeng/skeleton';
import { PopularProductiPad } from './pages/home/popular-product-iPad/popular-product-iPad.component';
import { PopularProductiPhone } from './pages/home/popular-product-iPhone/popular-product-iPhone.component';
import { PopularProductMac } from './pages/home/popular-product-mac/popular-product-mac.component';
import { PopularProductWatch } from './pages/home/popular-product-watch/popular-product-watch.component';
import { PopularProductAirPod } from './pages/home/popular-product-airpod/popular-product-airpod.component';
import { IphoneFor } from './pages/iPhone-for-life/iphone-for.component';
import { BlinkitComponent } from './pages/blinkit/blinkit.component';
import { BlinkitOrderPlacedComponent } from './pages/blinkit/blinkit-order-placed/blinkit-order-placed.component';
import { ImgLazyLoadDirective } from './core/directive/img-lazy-load.directive';
import { DealsDayComponent } from './pages/deals-day/deals-day.component';
import { DummyDataService } from './core/services/dummy-data.service';
import { OnboardingSwiperComponent } from './pages/onboarding-swiper/onboarding-swiper.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AlertComponent,
    NewsletterComponent,
    BlogComponent,
    BlogDetailComponent,
    NewsAndEventComponent,
    FilterByIdPipe,
    LazyLoadSectionDirective,
    DealsOfTheDayComponent,
    WeeklyBestsellersComponent,
    BestsellersComponent,
    FeaturedProductsComponent,
    RecommendedAccessoriesComponent,
    PopularProductiPhone,
    PopularProductMac,
    PopularProductiPad,
    PopularProductWatch,
    PopularProductAirPod,
    IphoneFor,
    BlinkitComponent,
    BlinkitOrderPlacedComponent,
    ImgLazyLoadDirective,
    DealsDayComponent,
    OnboardingSwiperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    RatingModule,
    SwiperModule,
    CarouselModule,
    SidebarModule,
    GalleriaModule,
    SkeletonModule
  ],
  providers: [
    AuthService,
    CommonService,
    Location,
    CurrencyPipe,
    ConfirmationService,
    MessageService,
    DataLayerService,
    DummyDataService,
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: ((localStorage.getItem('currency')) ? localStorage.getItem('currency') : 'INR'),
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-IN'
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
