import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, Pipe, Renderer2, ViewChild, PipeTransform, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CommonService } from "../../core/services/common.service";
import { Subscription } from "rxjs";
import { OwlOptions } from "ngx-owl-carousel-o";
import { environment } from 'src/environments/environment';
import { Meta, Title } from "@angular/platform-browser";
import SwiperCore, { A11y, EffectFade, Keyboard, Navigation, Pagination, Scrollbar, SwiperOptions } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DealsOfTheDayComponent } from './deals-of-the-day/deals-of-the-day.component';
import { WeeklyBestsellersComponent } from './weekly-bestsellers/weekly-bestsellers.component';
import { BestsellersComponent } from './bestsellers/bestsellers.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { RecommendedAccessoriesComponent } from './recommended-accessories/recommended-accessories.component';
import { PopularProductMac } from './popular-product-mac/popular-product-mac.component';
import { PopularProductiPad } from './popular-product-iPad/popular-product-iPad.component';
import { PopularProductWatch } from './popular-product-watch/popular-product-watch.component';
import { PopularProductiPhone } from './popular-product-iPhone/popular-product-iPhone.component';
import { DummyDataService } from 'src/app/core/services/dummy-data.service';
import { PopularProductAirPod } from './popular-product-airpod/popular-product-airpod.component';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';


@Pipe({
  name: 'filterById',
})
export class FilterByIdPipe implements PipeTransform {
  transform(items: any[], selectedId: string): any[] {
    return items.filter(item => item.id === selectedId);
  }
}
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Keyboard, EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  bannerHolder!: any[];
  imgUrl = environment.imgUrl;
  html!: any;
  val2 = 5
  currentNumber = 1;
  selectedProductImgPath!: string;
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,

    },
    {
      breakpoint: '768px',
      numVisible: 4
    },
    {
      breakpoint: '560px',
      numVisible: 2
    },
    {
      breakpoint: '425px',
      numVisible: 2
    },
    {
      breakpoint: '320px',
      numVisible: 2,
    }
  ];

  gImages: any[] = [
    {
      "previewImageSrc": "demo/images/galleria/galleria1.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria1s.jpg",
      "alt": "Description for Image 1",
      "title": "Title 1"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria2.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria2s.jpg",
      "alt": "Description for Image 2",
      "title": "Title 2"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria3.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria3s.jpg",
      "alt": "Description for Image 3",
      "title": "Title 3"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria4.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria4s.jpg",
      "alt": "Description for Image 4",
      "title": "Title 4"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria5.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria5s.jpg",
      "alt": "Description for Image 5",
      "title": "Title 5"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria6.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria6s.jpg",
      "alt": "Description for Image 6",
      "title": "Title 6"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria7.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria7s.jpg",
      "alt": "Description for Image 7",
      "title": "Title 7"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria8.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria8s.jpg",
      "alt": "Description for Image 8",
      "title": "Title 8"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria9.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria9s.jpg",
      "alt": "Description for Image 9",
      "title": "Title 9"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria10.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria10s.jpg",
      "alt": "Description for Image 10",
      "title": "Title 10"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria11.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria11s.jpg",
      "alt": "Description for Image 11",
      "title": "Title 11"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria12.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria12s.jpg",
      "alt": "Description for Image 12",
      "title": "Title 12"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria13.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria13s.jpg",
      "alt": "Description for Image 13",
      "title": "Title 13"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria14.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria14s.jpg",
      "alt": "Description for Image 14",
      "title": "Title 14"
    },
    {
      "previewImageSrc": "demo/images/galleria/galleria15.jpg",
      "thumbnailImageSrc": "demo/images/galleria/galleria15s.jpg",
      "alt": "Description for Image 15",
      "title": "Title 15"
    }
  ]
  items = [
    {
      image: '327eb5e3d3f6926684347d77bb0977dc.jpg',
      title: 'iPhone 14 Blue'
    },
    {
      image: 'a29f63d9981815669025580b09db59cf.jpg',
      title: 'iPhone 14 Purple'
    },
    {
      image: '9cb99aa118ea661a6ce0d1f68ec8894c.jpg',
      title: 'iPhone 14 Starlight'
    },
    {
      image: 'b70f1aaa31ca4c3624c7190cbe777964.jpg',
      title: 'iPhone 14 Midnight'
    },
    {
      image: 'a29f63d9981815669025580b09db59cf.jpg',
      title: 'iPhone 14 dPurple'
    },
    {
      image: '327eb5e3d3f6926684347d77bb0977dc.jpg',
      title: 'iPhone 14 Blue'
    },
    {
      image: 'a29f63d9981815669025580b09db59cf.jpg',
      title: 'iPhone 14 Purple'
    },
    {
      image: '9cb99aa118ea661a6ce0d1f68ec8894c.jpg',
      title: 'iPhone 14 Starlight'
    },
    {
      image: 'b70f1aaa31ca4c3624c7190cbe777964.jpg',
      title: 'iPhone 14 Midnight'
    },
    {
      image: 'a29f63d9981815669025580b09db59cf.jpg',
      title: 'iPhone 14 dPurple'
    }
  ];
  products = [
    {
      "id": 67,
      rating: 5,
      "href": "https://shop.unicornstore.in/type/iphone-15-pro2",
      "sku": "I1P1GWT586",
      "name": "iPhone 15 Pro 128GB White Titanium",
      "slug": "iphone-15-pro-128-gb-white-titanium",
      "route_id": 2703,
      "description": "",
      "excerpt": "",
      "price": 134900,
      "saleprice": 130853,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "823d75461890398b9ac3f65a4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "e2ff335a2cdd1e99d4118c355.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c5784370351640c8d08843a3a.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "5341ea56da5e3f789bbfdbea5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "4e2a9338eb4527ba14862043b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bcdb6f52056205c082e40bb4d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "0dfae6a220bcb2ea7edbe17a3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "91fadd6173373b783614f83a3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "d73ae64e31b4606dd2af3f005.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 6,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15 Pro",
      "category_slug": "iphone-15-pro2",
      "parent_category_slug": "iphone1"
    },
    {
      "href": "https://shop.unicornstore.in/type/iphone-14",
      rating: 3.8,
      "id": 4,
      "sku": "MPV03HN\/A",
      "name": "iPhone 14 Purple 128GB",
      "slug": "iphone-14-purple-128-gb",
      "route_id": 2636,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 60813,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "iPhone 14 Purple 128GB | Unicorn Store",
          "caption": "iPhone 14 Purple 128GB | Unicorn Store",
          "sequence": 1,
          "filename": "a29f63d9981815669025580b09db59cf.jpg",
          "primary": true
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 2,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14",
      "category_slug": "iphone-14",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 37,
      rating: 4.8,
      "href": "https://shop.unicornstore.in/type/iphone-15123",
      "sku": "I1P1G535",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "route_id": 2671,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 70312,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 4,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15",
      "category_slug": "iphone-15123",
      "parent_category_slug": "iphone1"
    },

    {
      "href": "https://shop.unicornstore.in/type/iphone-14",
      "id": 1,
      rating: 2.8,
      "sku": "MPVA3HN\/A",
      "name": "iPhone 14 (Product) Red 128GB",
      "slug": "iphone-14-product-red-128-gb",
      "route_id": 2633,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 60813,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "iPhone 14 (Product)Red 128GB | Unicorn Store",
          "caption": "iPhone 14 (Product)Red 128GB | Unicorn Store",
          "sequence": 1,
          "filename": "5500930433bc5894c5964d0d2a4e43b2.jpg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "e11b333c86d4b53a5e34ec2e8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "49f1e7348eddab98e0435afb6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "3fe1a292ec1c9db27c732d272.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "9b93250f2fa280a3718ed48b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "6aebe92da6965e3c15120cc04.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "661bd81ccbd9af6076fe89d6b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "0face2ba281214e4035ba1ab1.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "a423c8a45785df373c3d0ea62.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "c7de5bb0999ba9258e814d4b3.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 2,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14",
      "category_slug": "iphone-14",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 43,
      rating: 4.8,
      "href": 'https://shop.unicornstore.in/type/iphone-15123',
      "sku": "I1G1G276",
      "name": "iPhone 15 Green 128GB",
      "slug": "iphone-15-green-128-gb",
      "route_id": 2677,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 70312,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "d88a6c8f598fbd081376e3feb.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "180c674cbc5203f8ba2d00c64.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "fad982b02c691194dba2acd7b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "a8de579af4519e983e780c47c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "fee42cbe0f52422cc51b2a023.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "08a60e426c9d8d16965a18855.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "57e235ceea789358a1c869a3c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "cf68b2bf06840ff07f4ad83e3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "d7df54c5cab6a97a3f2a02caa.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 4,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15",
      "category_slug": "iphone-15123",
      "parent_category_slug": "iphone1"
    },
  ];

  currentIndex: number = 0;
  disableButtons!: boolean;
  displayModal!: boolean;
  thumbnailsPosition: string = 'left';
  displayMaximizable!: boolean;
  selectedProductId: string = '';
  matchingIds: any[] = [];
  buttonMargin = '0';
  homepage_seo: any;
  socialMediaHolder: any;
  bestsellersHolder: any;
  next(): void {
    this.currentIndex = (this.currentIndex + 3) % this.products.length;
  }

  // Function to handle carousel previous button click
  prev(): void {
    this.currentIndex = (this.currentIndex - 3 + this.products.length) % this.products.length;
  }
  swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
      380: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      },
      508: {
        slidesPerView: 1,
        spaceBetween: 5,
        navigator: false
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
        navigator: false
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 2,
        navigator: false
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 0,
        navigator: true

      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 10,
        navigator: true

      },
      1600: {
        slidesPerView: 4,
        spaceBetween: 0,
        navigator: true

      }
      ,
      4000: {
        slidesPerView: 3,
        spaceBetween: 0,
        navigator: true

      }

    }
  }
  recentlyColors = [
    { background: '#ffe5e4', selected: false },
    { background: 'rgb(186 195 162)', selected: false },
    { background: 'rgb(154 151 134)', selected: false },
    { background: '#855d5d', selected: false }
  ];

  swiper: any;
  customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    stagePadding: 50,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
      },
      425: {
        items: 2,
        stagePadding: 30,
      },
      768: {
        items: 3,
        stagePadding: 30,
      },
      1024: {
        items: 6,
        nav: true,
        stagePadding: 10,
      },
      1440: {
        items: 5,
        nav: true,
        stagePadding: 10,
      },
    }
  };
  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 15,
    centeredSlides: true,
    speed: 1200,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    autoplay: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      325: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    scrollbar: { draggable: false },
  };
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '576px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  space_variant = [
    { spaces: '128GB', selected_space: false },
    { spaces: '256GB', selected_space: false },
    { spaces: '512GB', selected_space: false },
  ];

  @ViewChild('swiperSlider', { static: false }) swiperSlider?: SwiperComponent;
  homeComponentHolder: any[] = [];
  // ----------------------------------- Lazy Loading Component ------------------------------------------------ //
  @ViewChild('featuredProductContainer', { read: ViewContainerRef })
  featuredProductContainer!: ViewContainerRef;
  featuredProductListRendered = false;

  @ViewChild('dealsOfTheDayContainer', { read: ViewContainerRef })
  dealsOfTheDayContainer!: ViewContainerRef;
  dealsOfTheDayListRendered = false;

  @ViewChild('recommendedAccessoriesContainer', { read: ViewContainerRef })
  recommendedAccessoriesContainer!: ViewContainerRef;
  recommendedAccessoriesListRendered = false;

  @ViewChild('weeklyBestSellersContainer', { read: ViewContainerRef })
  weeklyBestSellersContainer!: ViewContainerRef;
  weeklyBestSellersRendered = false;

  @ViewChild('bestSellersProductsContainer', { read: ViewContainerRef })
  bestSellersProductsContainer!: ViewContainerRef;
  bestSellersProductsRendered = false;

  @ViewChild('Highlight_new_in', { read: ViewContainerRef })
  Highlight_new_in!: ViewContainerRef;
  Highlight_new_inRendered = false;

  @ViewChild('Highlight_Mac', { read: ViewContainerRef })
  Highlight_Mac!: ViewContainerRef;
  Highlight_MacRendered = false;

  @ViewChild('HighlightAccessories', { read: ViewContainerRef })
  HighlightAccessories!: ViewContainerRef;
  HighlightAccessoriesRendered = false;

  @ViewChild('HighlightUnicornFamily', { read: ViewContainerRef })
  HighlightUnicornFamily!: ViewContainerRef;
  HighlightUnicornFamilyRendered = false;

  @ViewChild('PopularsProductsiPhone', { read: ViewContainerRef })
  PopularsProductsiPhone!: ViewContainerRef;
  PopularsProductsiPhoneRendered = false;

  @ViewChild('PopularsProductsMAC', { read: ViewContainerRef })
  PopularsProductsMAC!: ViewContainerRef;
  PopularsProductsMACRendered = false;

  @ViewChild('PopularsProducts_iPad', { read: ViewContainerRef })
  PopularsProducts_iPad!: ViewContainerRef;
  PopularsProducts_iPadRendered = false;

  @ViewChild('PopularsProductsWatch', { read: ViewContainerRef })
  PopularsProductsWatch!: ViewContainerRef;
  PopularsProductsWatchRendered = false;

  @ViewChild('PopularsProductsAirpod', { read: ViewContainerRef })
  PopularsProductsAirpod!: ViewContainerRef;
  PopularsProductsAirpodRendered = false;
  isVerifying = false;
  displayCartGuestItemsCompare: boolean = false;
  guestCartItems: any[] = [];
  cartItems: any[] = [];
  cartConflictCount: number = 0;
  loginSidebar: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isTokenExpired: boolean = false;
  isVerified: boolean = false;
  isReSendingVerificationLink: boolean = true;
  isVerificationFailed: boolean = false;
  isBannersLoading = false;
  constructor(
    private commonService: CommonService,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private dummyDataServices: DummyDataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService: CartService,
    private messageService: MessageService,
    private dummyService: DummyDataService,
  ) {
    this.dummyDataServices.getIphoneData().subscribe(() => {
      // console.log('Dummy iPhone Data : ', result); dummy data here call api 
    });
  }

  transform(items: any[], selectedId: string): any[] {
    return items.filter(item => item.id === selectedId);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateThumbnailsPosition();
  }

  ngOnInit(): void {
    // this.getClientSetting();
    // this.commonService.getBestsellers().subscribe(bestsellers => {
    //   console.log("data", bestsellers)
    // });
    this.updateThumbnailsPosition();
    // this.checkScroll();
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.commonService.getData('get_theme/home-page').subscribe((result) => {
      this.homeComponentHolder = result;
    });

    this.commonService.getData('homepage_seo_data').subscribe((result) => {
      if (result) {
        this.homepage_seo = result;

        // Set the title
        this.titleService.setTitle(this.homepage_seo.site_title ? `Home | ${this.homepage_seo.site_title}` : 'Home | Unicornstore');

        // Extract meta tags from meta_tag field
        const metaTagsRegex = /<meta\s+name="([^"]*)"\s+content="([^"]*)"\s*\/?>/g;
        let match;

        // Find all meta tags in meta_tag and add or update them
        if (this.homepage_seo.meta_tag) {
          while ((match = metaTagsRegex.exec(this.homepage_seo.meta_tag)) !== null) {
            const name = match[1];
            const content = match[2];
            // Check if the meta tag already exists
            const existingTag = this.metaService.getTag(`name='${name}'`);
            if (existingTag) {
              // Update existing tag
              this.metaService.updateTag({ name: name, content: content });
            } else {
              // Add new tag
              this.metaService.addTag({ name: name, content: content });
            }
            this.removeDuplicateMetaTags(name);
          }
        } else {
          // Default meta tags
          this.addOrUpdateMetaTag('description', 'Unicorn Store is one of the Largest Apple Premium Reseller in India, Explore the complete range of Apple Products like iPhone, MacBook, iPad, Apple Watch, etc. Visit Nearest Unicorn Store or Order online | Free Home Delivery.');
          this.addOrUpdateMetaTag('keyword', 'Unicorn Store, Apple Store, iPhone, MacBook, Apple Watch, iPad, Apple Store, Apple Service Center, Apple Premium Reseller, Apple Authorized Reseller');
        }
      } else {
        // Default title and meta tags if result is null
        this.setDefaultMetaTags();
      }
    }, (error) => {
      console.error('Error fetching homepage_seo_data:', error);
      this.setDefaultMetaTags();
    });

    this.getBannersByCollection(1);
    const storedState = localStorage.getItem('buttonState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.disableButtons = parsedState.disableButtons;
    }
    // .pipe(
    //   debounceTime(100),
    //   map(() => window.scrollY),
    //   distinctUntilChanged()
    // )
    // fromEvent(window, 'scroll').subscribe((result) => {
    //   const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //   const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    //   const scrollPercentage = (scrollPosition / pageHeight) * 100;
    //   console.log('scrollPercentage : ', scrollPercentage);


    // });
    this.fireHorizontalBannerPromotionGA4Event()

    if (this.route.snapshot.params.token) {
      console.log('Verification Token ', this.route.snapshot.params.token)
      const token = this.route.snapshot.params.token;
      this.isVerifying = true;
      Swal.fire({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 100 100">
        <path d="M 50,50 L 33,60.5 a 20 20 -210 1 1 34,0 z" fill="#464646">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"></animateTransform>
        </path>
        <circle cx="50" cy="50" r="16" fill="#fff"></circle>
      </svg> <h2 class="swal2-title custom-title">Verifying User</h2> <p>Please wait while we verify your account...</p>`,
        allowOutsideClick: false,
        showConfirmButton: false
      });

      // imageUrl: 'assets/img/loader/2.gif',

      this.commonService.postRequest('verify_user', { verify_user: token }).pipe(finalize(() => {
        this.isVerifying = false;
      })).subscribe((res) => {
        if (res.status === 'success') {
          Swal.close();
          Swal.fire({ title: res.status, text: res.message || 'User has been verified successfully', icon: 'success' });
          this.login(res.data.email, res.data.password);
        } else {
          Swal.close();
          Swal.fire({ title: res.status, text: res.message, icon: res.status });
        }
      }, () => {
        Swal.close();
        Swal.fire({ title: 'error', text: 'Something went wrong', icon: 'error' });
      });
    }
  }


  // Helper method to add or update a meta tag
  addOrUpdateMetaTag(name: string, content: string) {
    const existingTag = this.metaService.getTag(`name='${name}'`);
    if (existingTag) {
      this.metaService.updateTag({ name: name, content: content });
    } else {
      this.metaService.addTag({ name: name, content: content });
    }
  }

  // Set default meta tags
  setDefaultMetaTags() {
    this.titleService.setTitle('Home | Unicornstore');
    this.addOrUpdateMetaTag('description', 'Unicorn Store is one of the Largest Apple Premium Reseller in India, Explore the complete range of Apple Products like iPhone, MacBook, iPad, Apple Watch, etc. Visit Nearest Unicorn Store or Order online | Free Home Delivery.');
    this.addOrUpdateMetaTag('keyword', 'Unicorn Store, Apple Store, iPhone, MacBook, Apple Watch, iPad, Apple Store, Apple Service Center, Apple Premium Reseller, Apple Authorized Reseller');
  }

  // Function to remove duplicate meta tags, keeping only the latest
  removeDuplicateMetaTags(tagName: string) {
    const tags = this.metaService.getTags(`name='${tagName}'`);
    if (tags.length > 1) {
      // Keep the first tag and remove the rest
      for (let i = 1; i < tags.length; i++) {
        this.metaService.removeTagElement(tags[i]);
      }
    }
  }

  login(email: string, password: string) {
    this.authService.loginForNewUser(email, password, true).subscribe((resp) => {
      if (resp && resp.status === true) {
        this.loginSidebar = false;
        this.showPassword = false;
        this.showConfirmPassword = false;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('customer_data', JSON.stringify(resp.data));
        localStorage.setItem('customer_token', resp.data.token);
        this.cartService.emptyCart().subscribe(); // Empty the cart after login 
        this.messageService.add({ severity: 'success', detail: 'Login successful' });
        this.router.navigate(['/account']);

        // Call the API to get the guest is allowed to checkout or not
        // this.commonService.getRequest('guest_checkout_status').subscribe((resp) => {
        this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
          if (+resp.data === 1) {
            localStorage.setItem('guest', 'not-allowed');
          } else {
            localStorage.setItem('guest', 'allowed');
          }
        });
      }
      else {
        this.messageService.add({ severity: 'error', detail: resp.message || 'Login failed' });
      }
    });
  }

  fireHorizontalBannerPromotionGA4Event() {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_promotion",
      ecommerce: {
        creative_name: "Buy watch series 9 & get flat 5% off",
        creative_slot: "horizontal_banner_1",
        promotion_id: "horizontal_banner_1",
        promotion_name: "Watch series 9",
      }
    });
  }

  addMetaTags() {
    // Clear existing meta tags (if any)
    this.metaService.removeTag('name="keyword"');
    this.metaService.removeTag('name="description"');

    const keyword = this.homepage_seo.meta_tag?.keyword || '';
    const description = this.homepage_seo.meta_tag?.description || '';
    // Add new meta tags
    this.metaService.addTag({ name: 'keyword', content: keyword });
    this.metaService.addTag({ name: 'description', content: description });
  }

  ngAfterViewInit() {
    // this.loadFeaturedProductComponent();
  }

  getClientSetting() {
    this.commonService.getRequest('client_setting?key=ss_link|site_title|site_keywords|site_description|google_analytics|cashify_toggle|crt_toggle').subscribe((res: any) => {
      if (res?.status === true) {
        if (res.data.length > 0) {
          if (res.data[0] && res.data[0].length > 0) {
            this.socialMediaHolder = res.data[0]
            console.log("this is data ", this.socialMediaHolder)
          }
        }
      }
    });
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

  handleClick(url: string) {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("URL not available");
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY + document.documentElement.clientHeight + 50;
    const featuredProductContainerPos = this.featuredProductContainer.element.nativeElement.offsetTop;
    if (!this.featuredProductListRendered && scrollPosition >= featuredProductContainerPos) {
      this.featuredProductListRendered = true;
      this.loadFeaturedProductComponent();
      // console.log('Call Deals of the Day Loading component : ', scrollPosition);
    }
    const productListContainerPos = this.dealsOfTheDayContainer.element.nativeElement.offsetTop;
    if (!this.dealsOfTheDayListRendered && scrollPosition >= productListContainerPos) {
      this.dealsOfTheDayListRendered = true;
      this.loadProductListContainer();
      // console.log('Call Deals of the Day Loading component : ', scrollPosition);
    }

    const recommendedAccessoriesContainerPos = this.recommendedAccessoriesContainer.element.nativeElement.offsetTop;
    if (!this.recommendedAccessoriesListRendered && scrollPosition >= recommendedAccessoriesContainerPos) {
      this.recommendedAccessoriesListRendered = true;
      this.loadRecommendedAccessoriesContainer();
    }

    const weeklyBestSellersContainerPos = this.weeklyBestSellersContainer.element.nativeElement.offsetTop;
    if (!this.weeklyBestSellersRendered && scrollPosition >= weeklyBestSellersContainerPos) {
      this.weeklyBestSellersRendered = true;
      this.loadWeeklyBestSellersContainer();
    }

    const bestSellersProductsContainerPos = this.bestSellersProductsContainer.element.nativeElement.offsetTop;
    if (!this.bestSellersProductsRendered && scrollPosition >= bestSellersProductsContainerPos) {
      this.bestSellersProductsRendered = true;
      this.loadBestSellersProductsContainer();
      this.loadPopularProductiPhone();

    }
    // const Highlight_new_inPos = this.Highlight_new_in.element.nativeElement.offsetTop;
    // if (!this.Highlight_new_inRendered && scrollPosition >= Highlight_new_inPos) {
    //   this.Highlight_new_inRendered = true;
    //   this.loadHighlight_new_in();

    // }

  }

  // MacLoad() {
  //   if (!this.Highlight_MacRendered) {
  //     this.Highlight_MacRendered = true;
  //     this.loadHighlight_Mac();
  //   }
  // }

  // Accessories() {
  //   if (!this.HighlightAccessoriesRendered) {
  //     this.HighlightAccessoriesRendered = true;
  //     this.loadHighlightAccessories();
  //   }
  // }

  // UnicornFamily() {
  //   if (!this.HighlightUnicornFamilyRendered) {
  //     this.HighlightUnicornFamilyRendered = true;
  //     this.loadHighlightUnicornFamily();
  //   }
  // }

  PopularMacLoad() {
    if (!this.PopularsProductsMACRendered) {
      this.PopularsProductsMACRendered = true;
      this.loadPopularsProduct_Mac();
      // console.log('Popular Product mac Loaded Successfully');
    }
  }

  PopulariPadLoad() {
    if (!this.PopularsProducts_iPadRendered) {
      this.PopularsProducts_iPadRendered = true;
      this.loadPopularsProduct_iPad();
      console.log('Popular Product iPad Loaded Successfully');
    }
  }

  PopularProductWatch() {
    if (!this.PopularsProductsWatchRendered) {
      this.PopularsProductsWatchRendered = true;
      this.loadPopularsProductsWatch();
      // console.log("watch product loaded successfully")
    }
  }

  PopularProductAirpod() {
    if (!this.PopularsProductsAirpodRendered) {
      this.PopularsProductsAirpodRendered = true;
      this.loadPopularsProductsAirpod();
      console.log("air product loaded successfully")
    }
  }

  loadFeaturedProductComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FeaturedProductsComponent);
    this.featuredProductContainer.createComponent(componentFactory);
  }

  loadProductListContainer() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DealsOfTheDayComponent);
    this.dealsOfTheDayContainer.createComponent(componentFactory);
  }

  loadRecommendedAccessoriesContainer() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RecommendedAccessoriesComponent);
    this.recommendedAccessoriesContainer.createComponent(componentFactory);
  }

  loadWeeklyBestSellersContainer() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WeeklyBestsellersComponent);
    this.weeklyBestSellersContainer.createComponent(componentFactory);
  }

  loadBestSellersProductsContainer() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BestsellersComponent);
    this.bestSellersProductsContainer.createComponent(componentFactory);
  }

  // loadHighlight_new_in() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightNewIn);
  //   this.Highlight_new_in.createComponent(componentFactory);
  // }

  // loadHighlight_Mac() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightMac);
  //   this.Highlight_Mac.createComponent(componentFactory);
  // }

  // loadHighlightAccessories() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightAccessories);
  //   this.HighlightAccessories.createComponent(componentFactory);
  // }

  // loadHighlightUnicornFamily() {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightUnicornFamily);
  //   this.HighlightUnicornFamily.createComponent(componentFactory);
  // }

  loadPopularProductiPhone() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopularProductiPhone);
    this.PopularsProductsiPhone.createComponent(componentFactory);
  }

  loadPopularsProduct_Mac() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopularProductMac);
    this.PopularsProductsMAC.createComponent(componentFactory);
  }
  loadPopularsProduct_iPad() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopularProductiPad);
    this.PopularsProducts_iPad.createComponent(componentFactory);
  }
  loadPopularsProductsWatch() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopularProductWatch);
    this.PopularsProductsWatch.createComponent(componentFactory);
  }
  loadPopularsProductsAirpod() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopularProductAirPod);
    this.PopularsProductsAirpod.createComponent(componentFactory);
  }

  // toggleButtons() {
  //   this.disableButtons = !this.disableButtons;
  //   const currentState = { disableButtons: this.disableButtons, };
  //   localStorage.setItem('buttonState', JSON.stringify(currentState));
  // }

  private updateThumbnailsPosition(): void {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 425) {
      this.thumbnailsPosition = 'bottom';
    } else {
      this.thumbnailsPosition = 'left';
    }
  }

  selectColor(index: number): void {
    this.recentlyColors.forEach(color => color.selected = false);
    this.recentlyColors[index].selected = true;
  }

  selectSpace(index: number): void {
    this.space_variant.forEach(space => space.selected_space = false);
    this.space_variant[index].selected_space = true;
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
    this.renderer.addClass(document.body, 'body-overflow-hidden');
  }

  // Get All Banners By Banner Collection Id
  getBannersByCollection(collectionId: number): void {
    this.isBannersLoading = true;
    this.subscription = this.commonService.getData(`banners?banner_collection_id=${collectionId}`).subscribe((result) => {

      this.bannerHolder = result.Banners;
      if (this.bannerHolder.length > 0) {
        let itemsArray: any[] = [];
        this.bannerHolder.forEach((item) => {
          itemsArray.push({
            item_id: item.banner_id,
            item_name: item.name,
          })
        });

        if (itemsArray.length > 0) {
          this.dataLayerService.push({
            event: "view_promotion",
            ecommerce: {
              promotion_id: "banners_list",
              promotion_name: "Banners",
              items: itemsArray
            }
          });
        }
      }
      this.isBannersLoading = false;
    }, () => {
      this.isBannersLoading = false;
    });
  }

  isKeyExist(item: any, type: string) {
    return item.hasOwnProperty(type);
  }

  onClickBanner(data: any) {
    // this.dataLayerService.push({ "ecommerce": null }); // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_promotion",
      ecommerce: {
        promotion_id: "view_promotion",
        promotion_name: "Select Banner",
        items: [
          {
            item_id: data.banner_id,
            item_name: data.name,
          }
        ]
      }
    });
    this.router.navigate(['/hot-deals']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

