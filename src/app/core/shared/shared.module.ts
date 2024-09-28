import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { SwiperModule } from 'swiper/angular';
import { PriceAfterDotSmallPipe } from "../pipes/price-after-dot-small.pipe";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ImageLoaderComponent } from "./components/image-loader/image-loader.component";
import { PriceComponent } from "./components/price/price.component";
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { NotifyMeModalComponent } from './components/notify-me-modal/notify-me-modal.component';
import { ButtonModule } from "primeng/button";
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductSocialShareComponent } from './components/product-social-share/product-social-share.component';
import { ProductPriceComponent } from './components/product-price/product-price.component';
import { TabViewModule } from "primeng/tabview";
import { RatingModule } from 'primeng/rating';
import { SidebarcartComponent } from './sidebarcart/sidebarcart.component';
import { GalleriaModule } from 'primeng/galleria';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PriceAfterDotSmallPipe,
    ConfirmDialogComponent,
    ImageLoaderComponent,
    PriceComponent,
    AddToCartComponent,
    NotifyMeModalComponent,
    PriceComponent,
    WishlistComponent,
    ProductSocialShareComponent,
    ProductPriceComponent,
    SidebarcartComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    GalleriaModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxOtpInputModule,
    CarouselModule,
    SweetAlert2Module,
    RouterModule,
    PaginatorModule,
    DropdownModule,
    DataViewModule,
    DialogModule,
    NgxSliderModule,
    SwiperModule,
    NgxStarRatingModule,
    InfiniteScrollModule,
    ConfirmPopupModule,
    ButtonModule,
    TabViewModule,
    RatingModule
  ],
  exports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxOtpInputModule,
    CarouselModule,
    SweetAlert2Module,
    PaginatorModule,
    DropdownModule,
    DataViewModule,
    DialogModule,
    NgxSliderModule,
    SwiperModule,
    NgxStarRatingModule,
    InfiniteScrollModule,
    ConfirmPopupModule,
    PriceAfterDotSmallPipe,
    ConfirmDialogComponent,
    ImageLoaderComponent,
    PriceComponent,
    AddToCartComponent,
    NotifyMeModalComponent,
    ButtonModule,
    PriceComponent,
    WishlistComponent,
    ProductSocialShareComponent,
    ProductPriceComponent,
    TabViewModule,
    RatingModule,
    SidebarcartComponent
  ]
})
export class SharedModule {
}
