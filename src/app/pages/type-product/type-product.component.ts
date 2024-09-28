import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../core/services/common.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { CartService } from "../../core/services/cart.service";
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ICountry, IStates } from "../account/address-form/address-form.component";
import { DomSanitizer, Meta, Title } from "@angular/platform-browser";
import { SubscriptionHandler } from 'src/app/core/shared/subscription-handler/subscription-handler';
import { AuthService } from "../../core/services/auth.service";
import { MessageService } from "primeng/api";
import { CashifyModalComponent } from "../cashify-modal/cashify-modal.component";
import { SwiperOptions } from "swiper";
import { NotifyMeModalComponent } from "../../core/shared/components/notify-me-modal/notify-me-modal.component";
import { HttpClient } from '@angular/common/http';
import { DataLayerService } from "../../core/services/data-layer.service";
import { DOCUMENT, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';
import { DummyDataService } from 'src/app/core/services/dummy-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.scss'],
})

export class TypeProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previewImageBox', { static: false }) previewImageBox!: ElementRef;
  @ViewChild('cashifyModal', { static: false }) cashifyModal!: CashifyModalComponent;
  @ViewChild('notifyMeModal') notifyMeModal!: NotifyMeModalComponent;
  
  shareUrl!: string;
  previewImagePath = '';
  imgUrl = environment.imgUrl;
  baseUrl = environment.apiUrl;
  subscription: Subscription = new Subscription();
  agreeAndJoinClicked: boolean = false;
  optionsHolder: any[] = [];
  selectedProduct: any;
  bundleProductHolder: any[] = [];
  relatedProductsHolder: any[] = [];
  isWishlistAdded = false;
  isModalOpen = false;
  isVariant = false;
  isLoading = false;
  guestForm!: FormGroup;
  submitted = false;
  countryHolder!: ICountry[];
  stateHolder!: IStates[];
  productId!: number;
  productName!: string;
  primaryProductData!: any;
  attributesHolder: any[] = [];
  selectedAttribute: any[] = [];
  selectedProductImgFileName!: string;
  countdown: number = 10;
  interval: any;
  val3: number = 5;
  isBajajEmiAvailable = false;
  ratings_disable = false;
  isFiveStarRating = false;
  isFourStarRating = false;
  isThreeStarRating = false;
  isTwoStarRating = false;
  iphoneForLife: boolean = false;
  isOneStarRating = false;
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
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


  fakeRelatedProductsHolder = [
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4,
      id: '5',
      name: 'iPhone 15',
      sale: '20% off',
      price: '79900',
      saleprice: '74900',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4.5,
      id: '9',
      name: 'iPad Pro 2023',
      sale: '15% off',
      price: '89900',
      saleprice: '76400',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 5,
      id: '10',
      name: 'MacBook Air M2',
      sale: '10% off',
      price: '99900',
      saleprice: '89900',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4,
      id: '11',
      name: 'Apple Watch Series 8',
      sale: '22% off',
      price: '39900',
      saleprice: '31122',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4.5,
      id: '12',
      name: 'AirPods Pro',
      sale: '12% off',
      price: '24900',
      saleprice: '21900',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4,
      id: '13',
      name: 'iMac 2023',
      sale: '18% off',
      price: '129900',
      saleprice: '106122',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 5,
      id: '14',
      name: 'Mac Mini M2',
      sale: '25% off',
      price: '69900',
      saleprice: '52425',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4,
      id: '15',
      name: 'iPhone SE (2023)',
      sale: '15% off',
      price: '49900',
      saleprice: '42415',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4.5,
      id: '16',
      name: 'MacBook Pro 14-inch',
      sale: '20% off',
      price: '149900',
      saleprice: '119920',
    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/6493443f702959921c7dbc2461a560bd.png',
      ratings: 4,
      id: '17',
      name: 'Apple Pencil (3rd Gen)',
      sale: '10% off',
      price: '12900',
      saleprice: '11610',
    }
  ];

  // Fake review holder with random name, rating, review, date, and image, and review title based on review rating 
  fakeReviewHolder = [
    {
      name: 'Rahul Sharma',
      rating: 5,
      review: 'Excellent product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: 'February 15, 2022',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'Outstanding Quality',
      comments: [
        { user: 'Priya Patel', text: 'I totally agree! This product is amazing.' },
        { user: 'Amit Singh', text: 'Great choice! I love it too.' }
      ],
      likes: 15
    },
    {
      name: 'Priya Patel',
      rating: 4,
      review: 'Good product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: 'February 16, 2022',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      title: 'Impressive Performance',
      comments: [
        { user: 'Rahul Sharma', text: 'I also found it to be a great buy.' },
        { user: 'Amit Singh', text: 'Decent choice! I\'m satisfied with it.' }
      ],
      likes: 12
    },
    {
      name: 'Amit Singh',
      rating: 3,
      review: 'Average product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: 'February 17, 2022',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      title: 'Satisfactory Experience',
      comments: [
        {
          user: 'Priya Patel', text: 'It\'s okay, but I expected more.'
        },
        { user: 'Rahul Sharma', text: 'Not bad, but there are better options.' }
      ],
      likes: 8
    },
    {
      name: 'Sneha Verma',
      rating: 2,
      review: 'Disappointing product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: 'February 18, 2022',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      title: 'Below Expectations',
      comments: [
        { user: 'Amit Singh', text: 'I regret my purchase. Not worth it.' },
        { user: 'Rahul Sharma', text: 'I had a similar experience. Not recommended.' }
      ],
      likes: 5
    },
    {
      name: 'Neha Kapoor',
      rating: 1,
      review: 'Worst product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      date: 'February 19, 2022',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      title: 'Regrettable Purchase',
      comments: [
        { user: 'Sneha Verma', text: 'I completely agree. Terrible choice.' },
        { user: 'Priya Patel', text: 'I wish I had read reviews before buying.' }
      ],
      likes: 3
    }
  ];

  swiperConfig = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigator: true,
    loop: false,
    autoplay: true,
    centerSlides: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      368: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      380: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      508: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,

      },
      1025: {
        slidesPerView: 5,
        navigator: true
      },
      1440: {
        slidesPerView: 6,
        navigator: true
      }
    }
  };

  products = [
    {
      image: '6493443f702959921c7dbc2461a560bd.png',
      rating: 4.5,
      id: '5',
      name: 'iPhone 15',
      sale: '20% off',
      actual_price: 'Rs 79,900',
      sel_price: 'Rs74,900',
    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/20e6769a1abc10892b7a1cf8006a4ae7.jpg',
      rating: 3.8,
      name: 'iPhone 15 Green',
      sale: '25% off',
      id: '8',
      actual_price: 'Rs 79,900',
      sel_price: 'Rs73,900',

    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/20e6769a1abc10892b7a1cf8006a4ae7.jpg',
      rating: 3.8,
      id: '6',
      name: 'iPhone 15  Black',
      sale: '10% off',
      actual_price: 'Rs 78,900',
      sel_price: 'Rs73,900',

    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/dd98802c7d8c8452596fc474a3de339d.jpg',
      rating: 4.0,
      name: 'iPhone 15  Yellow',
      id: '7',
      sale: '15% off',
      actual_price: 'Rs 80,900',
      sel_price: 'Rs75,900',

    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/20e6769a1abc10892b7a1cf8006a4ae7.jpg',
      rating: 3.8,
      name: 'iPhone 15 Green',
      sale: '25% off',
      id: '8',
      actual_price: 'Rs 79,900',
      sel_price: 'Rs73,900',

    }, {
      image: 'https://shop.unicornstore.in/uploads/images/medium/20e6769a1abc10892b7a1cf8006a4ae7.jpg',
      rating: 3.8,
      name: 'iPhone 15 Green',
      sale: '25% off',
      id: '8',
      actual_price: 'Rs 79,900',
      sel_price: 'Rs73,900',

    }, {
      image: 'https://shop.unicornstore.in/uploads/images/medium/20e6769a1abc10892b7a1cf8006a4ae7.jpg',
      rating: 3.8,
      name: 'iPhone 15 Green',
      sale: '25% off',
      id: '8',
      actual_price: 'Rs 79,900',
      sel_price: 'Rs73,900',

    },


  ];

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

  images = [
    {
      src: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/327eb5e3d3f6926684347d77bb0977dc.jpg',
      alt: 'iPhone 14 Blue',
      description: 'iPhone 14 Blue...',
    },
    {
      src: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/a29f63d9981815669025580b09db59cf.jpg',
      alt: 'iPhone 14 Purple',
      description: 'iPhone 14 Purple...',
    },
    {
      src: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/9cb99aa118ea661a6ce0d1f68ec8894c.jpg',
      alt: 'iPhone 14 Starlight',
      description: 'iPhone 14 Starlight...',
    },
    {
      src: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/b70f1aaa31ca4c3624c7190cbe777964.jpg',
      alt: 'iPhone 14 Midnight',
      description: 'iPhone 14 Midnight...',
    },
  ];

  val2: number = 4;
  val1: number = 3;
  val4: number = 2;
  val5: number = 1;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  };

  thumbnailsCarouselOptions: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      425: {
        items: 5,
      }
    }
  };

  relatedProductCarouselOptions: OwlOptions = {
    loop: false,
    margin: 0,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      425: {
        items: 4,
      }
    }
  };

  isProduct: { status: boolean, message: string } = { status: true, message: '' };
  disabledOptions: any[] = [];

  subscriptionHolder: SubscriptionHandler = new SubscriptionHandler();
  rating!: number;
  reviewRatingHolder!: any;
  withExchange = 'N';

  mainBundleProductId: any[] = [];
  selectedBundleProductIds: any[] = [];
  config: SwiperOptions = {
    // direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 10,
    speed: 1200,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    autoplay: true,
    navigation: true,
    loop: false,
    pagination: false,
    scrollbar: { draggable: false },
    // Responsive breakpoints
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
      1440: {
        slidesPerView: 6,
      }
    }
  };
  totalBundlePrice!: any;
  bundlePriceWithCashback!: number;
  // selectedAppleCare!: string;
  selectedAppleCareId!: number | null;
  selectedAppleCarePrice!: number;
  isOutOfStock!: number | null;
  isCashifyEnabled = 0;
  currentNumber = 1;
  responsiveOptions!: any[];
  pdpSubscription: any;
  assetURL: any;
  parentProductReviews: any;
  pdpHTM!: string;
  selectedAppleCare: any[] = [];
  pdpHTML!: any;
  isFirstSelectedAppleCare = false;
  isSecondSelectedAppleCare = false;
  isAppleCareFound = false;
  selectedAppleCareProduct: any = {};
  isProductFetching = false;
  categoryType: any;
  shippingDate: string | undefined;
  categoryId: any;
  isColumnSelected = false;
  tatData: any;
  deliveryDateRange: string = '';
  isResult: any;
  pinData: any;
  localStorageSubscription!: Subscription;
  allCareProduct: any;

  display: boolean = false;
  varient: any;
  primaryProductDataName: any;
  products_custom_column_1: any;
  firstStepSalePrice!: number;
  finalSalePrice!: number;
  payMonth!: number;
  iPhoneForLifeEnabled: number = 0;
  selectedBundleProduct: any[] = [];
  wishlist_check: any;
  isPageLoading = true;
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private dataLayerService: DataLayerService,
    private cdr: ChangeDetectorRef,
    private location: Location,
    private dummyService: DummyDataService
  ) {
    this.shareUrl = window.location.href;
  }

  get f() {
    return this.guestForm.controls;
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        // Do something when the countdown reaches 0
      }
    }, 1000); // Update every second
  }

  proceedWithExchange() {
    this.cashifyModal.show();
  }

  afterModalHide(status: boolean) {
    this.withExchange = status ? 'Y' : 'N';
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

  // private updateSwiperConfig() {
  //   // Check the window width and update the Swiper configuration accordingly
  //   if (window.innerWidth < 768) {
  //     this.swiperConfig.slidesPerView = 2;
  //   } else if (window.innerWidth < 992) {
  //     this.swiperConfig.slidesPerView = 2;
  //   } else if (window.innerWidth < 1200) {
  //     this.swiperConfig.slidesPerView = 3;
  //   } else {
  //     this.swiperConfig.slidesPerView = 4;
  //   }
  // }

  // onWindowResize(event: Event) {
  //   // Update the Swiper configuration when the window is resized
  //   this.updateSwiperConfig();
  // }

  ngOnInit(): void {
    this.commonService.isResult$.subscribe(result => {
      this.isResult = result;
      if (this.isResult?.status) {
        this.calculateDeliveryDate();
      }
    });
    // Dynamic Image Url Change In Cart Page
    this.commonService.baseUrls$.subscribe((result) => {
      this.assetURL = result?.asset_url?.s3_link || result?.asset_url?.fallback || '';
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    // this.messageService.add({sticky: true, severity: 'success', detail: 'Item quantity in cart has been increased'});
    this.startCountdown();
    this.getCountry();
    this.initGuestForm();
    // this.updateSwiperConfig();
    /** Get Product Details */
    this.subscriptionHolder.add(this.route.paramMap.subscribe((resp: any) => {
      // let endpoint = 'attribute/get_category';
      // if (this.route.snapshot.queryParams.type) {
      //   endpoint = 'attribute/get_type';
      // }
      let slug = resp.params.slug;
      this.getProductsBySlug(slug);
      // this.commonService.getRequest(`${endpoint}/${slug}`).subscribe((result) => {
      //   if (result.status && result.product) {
      //     this.isProduct.status = true;
      //     this.isProduct.message = '';
      //     this.attributesHolder = result.attributes;
      //     this.primaryProductData = result.product;
      //     this.selectedProduct = result.product;
      //     this.titleService.setTitle(this.selectedProduct.name + ' | Unicorn Store');
      //     this.relatedProductsHolder = result.product.related_products || [];
      //     if (this.selectedProduct.images && this.selectedProduct.images.length > 0) {
      //       this.selectedProductImgFileName = this.selectedProduct.images[0].filename;
      //     }
      //
      //
      //     // this.selectedAttribute = result.selected_attribute;
      //     // result.selected_attribute.forEach((item: any) => {
      //     //   this.optionsHolder.push(item.integer_value);
      //     // });
      //
      //     if (result.review_rating) {
      //       this.reviewRatingHolder = result.review_rating;
      //       if (result?.review_rating && result?.review_rating?.reviews?.length > 0) {
      //         this.parentProductReviews = result.review_rating.reviews;
      //       }
      //     }
      //
      //     this.googleAnalytics(this.selectedProduct.name + ' | Unicorn Store'); // Google Analytics for View Item List Event  starts here
      //
      //     if (result.product.pdp_filename && result.product.pdp_filename !== '') {
      //       this.loadPDP(this.assetURL, result.product.pdp_filename, result.product.pdp_filename);
      //     } else {
      //       this.pdpHTML = 'Overview Not Available';
      //     }
      //   } else {
      //     this.isProduct.status = false;
      //     this.isProduct.message = result.message;
      //   }
      // });


    }));

    this.isCashifyEnabled = this.commonService.isCashifyAllowed.getValue();

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 4
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 2
      }
    ];

    this.commonService.headerData$.subscribe((headerDataObj) => {
      if (Object.keys(headerDataObj).length > 0) {
        this.iPhoneForLifeEnabled = headerDataObj.ipflStatus;
      } else {
        this.iPhoneForLifeEnabled = 0;
      }
    });

  }


  calculateDeliveryDate() {
    const today = new Date();
    const deliveryDays = parseInt(this.isResult.TAT.split(' ')[2]);
    const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const formattedToday = today.toLocaleDateString('en-US', options);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', options);
    this.deliveryDateRange = `${formattedToday} - ${formattedDeliveryDate}`;
  }

  getProductsBySlug(slug: string) {
    let payload = {
      view: "variant" //variant or tree
    };
    this.categoryType = '';
    this.attributesHolder = [];
    this.selectedProduct = {};
    this.primaryProductData = {};
    this.optionsHolder = [];
    this.isPageLoading = true;
    this.commonService.postRequest(`get_category_by_id/${slug}`, payload).pipe(finalize(() => {
      this.isPageLoading = false;
    })).subscribe((result) => {
      this.categoryType = result?.category?.category_type;
      this.attributesHolder = result?.category?.attribute_groups;
      this.primaryProductData = result?.category;
      this.primaryProductDataName = result?.category.name;

      if (this.primaryProductData.pdp_filename && this.primaryProductData.pdp_filename !== '') {
        this.loadPDP(this.assetURL, this.primaryProductData.pdp_filename, this.primaryProductData.pdp_filename);
      } else {
        this.pdpHTML = 'Overview Not Available';
      }

      this.optionsHolder = [];
      // this.selectedProduct = result.category;
      // Loop through the attributes and set the optionsHolder array to the first option ID of each attribute.
      if (this.attributesHolder && this.attributesHolder.length > 0) {
        this.attributesHolder.forEach((attribute: any, i) => {
          // this.optionsHolder.push(attribute.attribute_options[0].id);
          this.onClickOptions(attribute.attribute_options[0].id, i);
        });
      }
    });
  }

  /**
   * Loads the PDP HTML content from the specified URL, folder name, and file name.
   * @param url - The base URL to load the PDP HTML content from.
   * @param folderName - The name of the folder containing the PDP HTML file.
   * @param fileName - The name of the PDP HTML file (without the .html extension).
   */
  loadPDP(url: string, folderName: string, fileName: string) {
    this.pdpSubscription = this.http.get(url + '/pdp/' + folderName + '/' + fileName + '.html', { responseType: 'text' }).subscribe((response) => {
      this.pdpHTML = this.sanitizer.bypassSecurityTrustHtml(response.toString());
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * @description - This method is used to set selected product in the dataLayer
   */
  googleAnalytics(title: string = 'Product Type') {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item",
      ecommerce: {
        page_title: title,
        item_list_name: 'Product Type',
        items: [
          {
            item_id: this.selectedProduct.id,
            item_name: this.selectedProduct.name,
            currency: 'INR',
            item_variant: this.selectedProduct.name,
            price: this.selectedProduct.saleprice,
            quantity: this.selectedProduct.quantity,
          }
        ]
      }
    });
  }

  selectColumn() {
    this.isColumnSelected = !this.isColumnSelected;
  }

  showDialog() {
    this.display = true;
  }
  openPdfInNewTab() {
    const pdfUrl = '/assets/ipfl-pdf/icici-buyback-offer-Jan-24.pdf';
    window.open(pdfUrl, '_blank');
  }
  agreeAndJoin() {
    this.agreeAndJoinClicked = true;
    this.display = false;
  }
  CancleAndJoin() {
    this.agreeAndJoinClicked = false;

  }
  /* Add To Cart: params: Product Id & Product Name */
  // Don't miss out! Log in now to pre-book your product
  addToCart(product: any, isBundle = false, accessories = false, accessoriesData?: any, prebook = false): void {
    if (!this.authService.isLoggedIn && prebook === true) {
      Swal.fire({
        title: 'Pre-Book',
        text: 'You need to login to pre-book this product',
        icon: 'info',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.commonService.loginPopupToggle$.next(true);
        }
      });
      return;
    }
    this.productId = product.id;
    this.productName = product.name;
    // Payload For Add to Cart
    let payload: any;
    if (!isBundle) {
      payload = {
        product_id: product.id,
        quantity: 1,
        ipfl: this.agreeAndJoinClicked
      };
    }

    if (isBundle) {
      payload = {
        product_id: +this.mainBundleProductId.join(),
        quantity: 1,
        bundle_status: true,
        ipfl: this.agreeAndJoinClicked,
        bundle_accessory: this.flattenArray(this.selectedBundleProductIds)
      }
    }

    if (this.selectedAppleCareId) {
      payload = {
        ...payload,
        apple_care_id: this.selectedAppleCareId
      }
    }

    // Check User Logged In or Not
    if (this.authService.isLoggedIn) {
      if (isBundle) {
        // Product Add to Cart in database when user logged in
        this.cartService.addToCartBundle(payload).subscribe((resp) => {
          this.fireGA4EventOnAddToCart(product); // Google Analytics for Add to Cart Event  starts here
          if (!resp.status) {
            this.messageService.add({ severity: 'error', detail: resp.message });
            localStorage.setItem('payload-for-selected-product', JSON.stringify(this.optionsHolder));
            localStorage.setItem('product-id-before-login-for-add-to-cart', String(product.id));
          } else {
            localStorage.removeItem('payload-for-selected-product');
          }
          if (resp.status) {
            this.messageService.add({ severity: 'success', detail: resp.message });
            // if (!accessories) {
            //   this.addToCartAnimation();
            // }
          }
        })
      }
      if (!isBundle) {
        // Product Add to Cart in database when user logged in
        this.cartService.addToCart(payload).subscribe((resp) => {
          this.fireGA4EventOnAddToCart(product); // Google Analytics for Add to Cart Event  starts here
          if (!resp.status) {
            this.messageService.add({ severity: 'error', detail: resp.message });
            localStorage.setItem('payload-for-selected-product', JSON.stringify(this.optionsHolder));
            localStorage.setItem('product-id-before-login-for-add-to-cart', String(product.id));
          } else {
            localStorage.removeItem('payload-for-selected-product');
          }
          if (resp.status) {
            this.messageService.add({ severity: 'success', detail: resp.message });
            // if (!accessories) {
            //   this.addToCartAnimation();
            // }
          }
        })
      }
    } else {
      let existing: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!) || [];
      this.authService.checkGuestCheckoutStatus().subscribe((resp) => {
        if (+resp.data === 1) {
          localStorage.setItem('guest', 'not-allowed');
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(product.id));
          this.commonService.loginPopupToggle$.next(true);
        } else {
          localStorage.setItem('guest', 'allowed');
          if (accessories === true) {
            // Accessories Add to Cart
            if (accessoriesData) {
              const existingItem = existing.find((item: any) => item.id === accessoriesData.id && +item.bundle === 0);

              if (existingItem) {
                existingItem.item_quantity++;
                this.messageService.add({ severity: 'success', detail: 'Product quantity updated in cart' });
              } else {
                existing.push({ ...accessoriesData, ipfl: this.iphoneForLife, cart_item_id: accessoriesData.id, item_quantity: 1, fixed_quantity: 0, bundle: 0 });
                this.messageService.add({ severity: 'success', detail: 'Product successfully added to cart' });
                this.fireGA4EventOnAddToCart(accessoriesData); // Google Analytics for Add to Cart Event  starts here
              }
            } else {
              this.messageService.add({ severity: 'error', detail: 'Something went wrong with accessoriesData' });
            }
          } else {
            // Check if the selectedProduct already exists in the array
            // const existingIndex = existing.findIndex((item: any) => {
            //   if (isBundle) {
            //     return false;
            //   }
            //   // Check if the item ID matches the selected product ID
            //   if (item.id === this.selectedProduct.id) {
            //     // If item is part of a bundle, return false to continue searching
            //     if (item.bundle === 2) {
            //       return false;
            //     }
            //     // If not part of a bundle, return true to indicate match found
            //     return true;
            //   }
            //   // Continue searching if IDs don't match
            //   return false;
            // });

            if (!isBundle) {
              const existingIndex = existing.findIndex((item: any) => +item.id === +this.selectedProduct.id && +item.bundle === 0);
              if (existingIndex === -1) {
                this.selectedProduct.item_quantity = 1;
                this.selectedProduct.cart_item_id = this.selectedProduct.id;

                // Add ipfl property to selectedProduct
                this.selectedProduct.ipfl = this.agreeAndJoinClicked ? 'true' : 'false';

                existing.push({ ...this.selectedProduct, bundle: 0 });
                this.messageService.add({ severity: 'success', detail: 'Product successfully added to cart' });
              } else {

                console.log('Fixed : ', +existing[existingIndex].fixed_quantity);
                if (+existing[existingIndex].fixed_quantity === 0) {

                  existing[existingIndex].item_quantity++;
                  existing[existingIndex].ipfl = this.agreeAndJoinClicked ? 'true' : 'false';

                  // existing[existingIndex] = {
                  //   ...existing[existingIndex],
                  //   item_quantity: existing[existingIndex].item_quantity++,
                  //   ipfl: this.agreeAndJoinClicked ? 'true' : 'false'
                  // };

                  console.log('existing 2 : ', existing);
                  this.messageService.add({ severity: 'success', detail: 'Item quantity in cart has been increased' });
                } else {
                  this.messageService.add({ severity: 'error', detail: 'Only one unit of this item allowed' });
                }
              }
              // Handle: Add Apple Care to cart if selected
              if (this.selectedAppleCareId && this.selectedAppleCarePrice > 0) {
                const existingItem = existing.find((item: any) => item.id === this.selectedAppleCareId);
                if (existingItem) {
                  existingItem.item_quantity++;
                } else {
                  existing.push({ ...this.selectedAppleCareProduct, cart_item_id: this.selectedAppleCareId, item_quantity: 1, fixed_quantity: 0, bundle: false });
                }
              }
            }
            sessionStorage.setItem('total-cart-items', String(existing.length));
            sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
            this.fireGA4EventOnAddToCart(existing); // Google Analytics for Add to Cart Event  starts here
          }

          // Handle: Add Bundle Products to cart if Bundle is true
          if (isBundle) {
            this.handleBundleAddToCartInGuestMode(product);
          }
        }
      });
    }

  }

  handleBundleAddToCartInGuestMode(product: any) {
    let bundleExisting: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!) || [];
    const bundleExistingIndex = bundleExisting.findIndex((item: any) => +item.id === +this.selectedProduct.id && +item.bundle === 2);
    const isBundleMainProductAlreadyInCart = bundleExisting.findIndex((item: any) => +item.id !== +this.selectedProduct.id && +item.bundle === 2);

    if (isBundleMainProductAlreadyInCart !== -1) {
      this.messageService.add({ severity: 'error', detail: 'Only one bundle product allowed in cart' });
      return;
    }

    let ids = this.flattenArray(this.selectedBundleProductIds);
    if (ids.length === 0) {
      this.messageService.add({ severity: 'error', detail: 'Please select bundle products' });
      return;
    }
    if (bundleExistingIndex === -1) {
      this.selectedProduct.item_quantity = 1;
      this.selectedProduct.cart_item_id = this.selectedProduct.id;
      // Add ipfl property to selectedProduct
      this.selectedProduct.ipfl = this.agreeAndJoinClicked ? 'true' : 'false';
      bundleExisting.push({
        ...this.selectedProduct,
        bundle: 2,
        bundle_main_product: true,
        product_value: this.bundleProductHolder[0].product_value
      });
      this.messageService.add({ severity: 'success', detail: 'Bundle Product successfully added to cart' });
    } else {
      this.messageService.add({ severity: 'error', detail: 'Bundle Product already in cart' });
    }

    if (ids?.length > 0) {
      // Create a map for quick lookup
      const bundleProductMap = new Map(this.bundleProductHolder.map(item => [+item.id, item]));
      ids.forEach((id: any) => {
        // Check if the item already exists in the 'existing' array
        const existingItem = bundleExisting.find((item: any) => +item.id === +id);
        if (!existingItem) {
          // If not, check if the item exists in the bundleProductMap
          const bundleProduct = bundleProductMap.get(+id);
          if (bundleProduct) {
            // Push the new item to the 'existing' array with the necessary properties
            bundleExisting.push({
              ...bundleProduct,
              bundle: 1,
              cart_item_id: bundleProduct.id,
              main_product_id: +product.id,
              item_quantity: 1,
              fixed_quantity: 0,
            });
          }
        }
      });
    }
    sessionStorage.setItem('total-cart-items', String(bundleExisting.length));
    sessionStorage.setItem('guest-cart-items', JSON.stringify(bundleExisting));
    this.fireGA4EventOnAddToCart(bundleExisting); // Google Analytics for Add to Cart Event  starts here
  }


  toggleBundleProduct(event: any, bundle: any, i: any) {
    if (event.checked.length > 0) {
      this.totalBundlePrice += bundle.accessory_value;
    } else {
      this.totalBundlePrice -= bundle.accessory_value;
    }
    if (this.selectedProduct?.cashback_price > 0) {
      this.bundlePriceWithCashback = this.totalBundlePrice - this.selectedProduct?.cashback_price;
    }
  }

  fireGA4EventOnAddToCart(products: any, quantity: number = 1) {
    let items: any[] = [];
    if (Array.isArray(products)) {
      items = products.map((product: any) => {
        return {
          item_id: product.sku,
          item_name: product.name,
          currency: 'INR',
          price: product.saleprice,
          quantity: quantity
        }
      });
    } else {
      items.push({
        item_id: products.sku,
        item_name: products.name,
        price: products.saleprice,
        quantity: quantity
      });
    }
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        currency: 'INR',
        value: products.saleprice,
        items: items
      },
      'pagePath': fullUrl,
      'pageTitle': 'Type product',
    });
  }

  onClickOptions(optionId: any, i: number) {
    this.isOutOfStock = null;
    this.optionsHolder[i] = optionId;
    const groupIds = this.attributesHolder.map((item: any) => item.attribute_group.group_id).join(',');
    const payload = {
      category_id: this.primaryProductData.id,
      family_id: this.primaryProductData.attribute_family_id,
      group_ids: groupIds,
      option_ids: this.optionsHolder.join(',')
    };
    if (this.attributesHolder.length === Object.keys(this.optionsHolder).length) {
      this.isPageLoading = true;
      this.commonService.postRequest('get_product_by_option_id', payload).pipe(finalize(() => {
        this.isPageLoading = false;
      })).subscribe((response) => {
        this.selectedProduct = {}; // Clear the selected product
        this.bundleProductHolder = []; // Clear the bundle product holder
        if (response.status === 'success') {
          this.selectedProduct = response.data.product;
          this.products_custom_column_1 = response.data.product.custom_column_1; // here i hold value for iPhone For live Condition
          console.log('products_custom_column_1 : ', this.products_custom_column_1);
          this.wishlist_check = this.selectedProduct.wishlist
          this.firstStepSalePrice = this.selectedProduct.saleprice * 0.75;
          this.payMonth = this.firstStepSalePrice / 24;
          this.finalSalePrice = this.selectedProduct.saleprice - this.firstStepSalePrice;
          this.isVariant = false;
          this.relatedProductsHolder = [];
          if (response.data.related_products && response.data.related_products.length > 0) {
            this.relatedProductsHolder = response.data.related_products;
          }

          // this.previewImagePath = this.imgUrl + '/full/' + this.selectedProduct?.images;
          if (this.selectedProduct.images && this.selectedProduct.images.length > 0) {
            this.selectedProductImgFileName = this.selectedProduct.images[0].filename;
          }
          this.isOutOfStock = this.selectedProduct.quantity;
          this.mainBundleProductId = [response.data.product.id];
          if (this.selectedProduct && this.selectedProduct.rating && this.selectedProduct.rating.length > 0) {
            this.rating = Math.floor(this.selectedProduct.rating[0]['avg_rating']);
          }
          this.disabledOptions = response.disabled_option;

          if (response.data.bundle && response.data.bundle.length > 0) {
            this.handleBundleProduct(response.data.bundle);
          }
          if (this.selectedProduct.seo_title && this.selectedProduct.seo_title !== '') {
            this.titleService.setTitle(this.selectedProduct.seo_title + ' | Unicorn Store');
          } else {
            this.titleService.setTitle(this.selectedProduct.name + ' | Unicorn Store');
          }

          // append meta tags in under head dynamically for SEO purpose starts here //
          // if (this.selectedProduct.meta && this.selectedProduct.meta !== '') {
          //   // Create a new DOMParser
          //   const parser = new DOMParser();
          //   // Parse the meta string into a Document
          //   const parsed = parser.parseFromString(this.selectedProduct.meta, 'text/html');
          //   // Get the meta tags from the parsed Document
          //   const metas = parsed.head.childNodes;

          //   // Append each meta tag to the head of the document
          //   for (let i = 0; i < metas.length; i++) {
          //     this.renderer.appendChild(this.document.head, metas[i]);
          //   }
          // }

          if (this.selectedProduct.meta && this.selectedProduct.meta !== '') {
            // Create a new DOMParser
            const parser = new DOMParser();
            // Parse the meta string into a Document
            const parsed = parser.parseFromString(this.selectedProduct.meta, 'text/html');
            // Get the meta tags from the parsed Document
            const metas = parsed.head.childNodes;

            // Iterate over each meta tag
            for (let i = 0; i < metas.length; i++) {
              const metaTag = metas[i] as HTMLMetaElement;

              if (metaTag.name) {
                // If a meta tag with the same name already exists, update it
                if (this.meta.getTag(`name='${metaTag.name}'`)) {
                  this.meta.updateTag({ name: metaTag.name, content: metaTag.content });
                } else {
                  // Otherwise, add a new meta tag
                  this.meta.addTag({ name: metaTag.name, content: metaTag.content });
                }
              }
            }
          } else {
            this.meta.updateTag({ name: 'description', content: this.selectedProduct.name });
            this.meta.updateTag({ name: 'keywords', content: this.selectedProduct.name });
          }

          this.handleOnProductVariantSelectGA4();
        } else {
          this.isVariant = true;
          this.varient = response.message
        }
      });
    }
    this.cdr.detectChanges();
  }

  optionName(i: number) {
    // get option name from selected option id
    let optionName = '';
    this.attributesHolder[i].attribute_options.forEach((item: any) => {
      if (item.id === this.optionsHolder[i]) {
        optionName = item.admin_name;
      }
    });
    return optionName;
  }

  onThumbnailImageClick(image: string) {
    this.previewImagePath = image;
  }

  // onClickOptionsOld(productId: number, optionId: any, i: number) {
  //   this.isOutOfStock = null;
  //   this.optionsHolder[i] = optionId;
  //   let attrType;
  //   if (localStorage.getItem('attr_type') != 'undefined' && localStorage.getItem('attr_type') != null) {
  //     if (JSON.parse(localStorage.getItem('attr_type')!).length > 0) {
  //       attrType = JSON.parse(localStorage.getItem('attr_type')!)[0].attribute_type;
  //     }
  //   }

  //   let combination = {
  //     primary: productId,
  //     attribute: [
  //       {
  //         attribute_type: attrType,
  //         attribute_id: this.optionsHolder
  //       }
  //     ]
  //   };
  //   if (this.attributesHolder.length === Object.keys(this.optionsHolder).length) {
  //     this.isProductFetching = true;
  //     this.commonService.postRequest('attribute/get_product', combination).subscribe((result) => {
  //       this.isProductFetching = false;
  //       this.selectedProduct = null;
  //       if (result.status === true) {
  //         this.bundleProductHolder = [];
  //         this.selectedBundleProductIds = [];
  //         this.totalBundlePrice = null;
  //         this.bundlePriceWithCashback = 0;


  //         this.selectedProduct = result.data;
  //         if (this.selectedProduct.seo_title && this.selectedProduct.seo_title !== '') {
  //           this.titleService.setTitle(this.selectedProduct.seo_title + ' | Unicorn Store');
  //         }
  //         // append meta tags in under head dynamically for SEO purpose starts here //
  //         if (this.selectedProduct.meta && this.selectedProduct.meta !== '') {
  //           // Create a div element and set its innerHTML to your meta data
  //           const div = this.renderer.createElement('div');
  //           div.innerHTML = this.selectedProduct.meta;
  //           // Append the meta tags to the head of the document
  //           this.renderer.appendChild(this.document.head, div);
  //         }
  //         this.isOutOfStock = this.selectedProduct.quantity;
  //         this.mainBundleProductId = [result.data.id];
  //         if (this.selectedProduct && this.selectedProduct.rating && this.selectedProduct.rating.length > 0) {
  //           this.rating = Math.floor(this.selectedProduct.rating[0]['avg_rating']);
  //         }
  //         this.disabledOptions = result.disabled_option;
  //         if (this.selectedProduct?.images?.length > 0) {
  //           this.selectedProductImgFileName = this.selectedProduct.images[0].filename;
  //         }
  //         this.isWishlistAdded = result.data.wishlist;
  //         // this.location.replaceState('/type/' + result.data.slug);

  //         if (result.bundle && result.bundle.length > 0) {
  //           this.handleBundleProduct(result.bundle);
  //         }
  //       }
  //     })
  //   }
  //   this.handleOnProductVariantSelectGA4(productId, optionId, i);
  // }

  handleOnProductVariantSelectGA4() {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "selected_product",
        item_list_name: "Selected Product",
        items: [{
          item_id: this.selectedProduct.sku,
          item_name: this.selectedProduct.name,
          currency: 'INR',
          item_variant: this.selectedProduct.name,
          price: this.selectedProduct.saleprice,
        }]
      }
    });
  }

  handleBundleProduct(bundle: any) {
    if (bundle && bundle.length > 0) {
      this.bundleProductHolder = bundle;
      this.bundleProductHolder.forEach((item: any) => {
        this.selectedBundleProductIds.push([item.id]);
      });

      if (this.bundleProductHolder.length > 0) {
        this.totalBundlePrice = this.bundleProductHolder[0].bundle_price;
        if (this.selectedProduct?.cashback_price > 0) {
          this.bundlePriceWithCashback = this.bundleProductHolder[0].bundle_price - this.selectedProduct?.cashback_price;
        }
      }
    }
  }

  onAppleCareSelected(event: any, appleCareProductObj: any, index: number) {
    if (event.checked) {
      this.allCareProduct = 'With ' + appleCareProductObj.name;
      this.selectedAppleCare = this.selectedAppleCare.map((item: any, i: number) => i === index);
      this.selectedAppleCareId = appleCareProductObj.id;
      this.selectedAppleCarePrice = appleCareProductObj.price > appleCareProductObj.saleprice ? appleCareProductObj.saleprice : appleCareProductObj.price;
      this.selectedAppleCareProduct = appleCareProductObj;
    } else {
      this.allCareProduct = '';
      this.selectedAppleCare = [];
      this.selectedAppleCareId = null;
      this.selectedAppleCarePrice = 0;
    }
    this.fireGA4OnClickedDigitalProduct();
  }

  onRemovedAppleCare(value: string, id: number) {
    this.selectedAppleCareId = null;
  }

  fireGA4OnClickedDigitalProduct() {
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "select_digital_product",
        item_list_name: "Select Digital Product",
        items: [
          {
            item_id: this.selectedAppleCareProduct.sku,
            item_name: this.selectedAppleCareProduct.name,
            currency: 'INR',
            price: this.selectedAppleCareProduct.saleprice,
            quantity: 1
          }
        ]
      }
    });
  }

  isAttributeOptionDisabled(attrId: number, optionId: number) {
    if (this.disabledOptions.length > 0) {
      if (this.disabledOptions.findIndex((item: any) => item.attribute_id === attrId && item.integer_value === optionId) > -1) {
        return true;
      }
    }
    return false;
  }


  wishlistToggle(productId: number) {
    if (localStorage.getItem('customer_data')) {
      this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${productId}`).subscribe((resp) => {
        if (resp?.status) {
          this.isWishlistAdded = !this.isWishlistAdded;
          this.wishlist_check = !this.wishlist_check

        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
        if (this.isWishlistAdded) {

          // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.

          this.dataLayerService.push({
            event: "add_to_wishlist",
            ecommerce: {
              items: [
                {
                  item_id: this.selectedProduct.sku,
                  item_name: this.selectedProduct.name,
                  currency: 'INR',
                  price: this.selectedProduct.saleprice,
                  quantity: this.selectedProduct.quantity
                }
              ]
            }
          });
        }
      });
      localStorage.removeItem('before-login-wishlist-add');
    } else {
      localStorage.setItem('payload-for-selected-product', JSON.stringify(this.optionsHolder));
      localStorage.setItem('before-login-wishlist-add', String(productId));
      // i show here message 
      this.messageService.add({ severity: 'error', detail: "You  need to login to add product to wishlist" });
      // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });

    }
  }

  ngOnDestroy(): void {
    this.pdpSubscription?.unsubscribe();
    this.subscriptionHolder.unsubscribe();
  }

  initGuestForm() {
    this.guestForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // address1: ['', [Validators.required]],
      // address2: [''],
      city: ['', [Validators.required]],
      // zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country_id: ['', [Validators.required]],
      zone_id: ['', [Validators.required]],
      country: [''],
      country_code: [''],
      zone: [''],
    })
  }

  /**
   * Handles the form submission.
   */
  onSubmit() {
    this.submitted = true;
    if (this.guestForm.invalid) {
      return;
    }
    let payload = {
      ...this.guestForm.value,
      id: this.productId,
      product_name: this.productName
    };
    this.commonService.postRequest(`save_guest_details`, payload).subscribe((resp) => {
      if (resp.status && resp.order_id) {
        this.isModalOpen = false;
        this.cartService.cartChangeDetectionSubject.next(true);
      }
    })
  }

  getCountry() {
    // this.commonService.getData('master_country').subscribe((result) => {
    this.dummyService.getMasterCountryList().subscribe((result) => {
      this.countryHolder = result.data;
    })
  }

  onChangeCountry(event: any) {
    this.getStates(event.target.value);
    if (event.target.options[event.target.options.selectedIndex].text) {
      this.guestForm.patchValue({
        country: event.target.options[event.target.options.selectedIndex].text
      });
    }
    this.countryHolder.find((item) => {
      if (+item.id === +event.target.value) {
        this.guestForm.patchValue({
          country_code: item.iso_code_2
        });
      }
    })
  }

  onChangeState(event: any) {
    this.guestForm.patchValue({
      zone: event.target.options[event.target.options.selectedIndex].text
    });
  }

  getStates(id: number) {
    this.commonService.getData(`master_state/${id}`).subscribe((result) => {
      this.stateHolder = result.data;
    })
  }

  setPreviewImg(filename: string, alt: string) {
    // console.log('previewImageBox : ', this.previewImageBox?.nativeElement);
  }

  getRelatedProducts(Id: number) {
    this.commonService.getData(`related_products/${Id}`).subscribe((result) => {
      if (result.status) {
        this.relatedProductsHolder = result.data;
        if (this.relatedProductsHolder.length > 0) {
          this.relatedProductsHolder.forEach((item, index) => {
            if (item.images) {
              this.relatedProductsHolder[index].images = Object.values(JSON.parse(item.images))[0];
            }
          });
        }
      }
    })
  }

  showNotifyModal() {
    this.notifyMeModal.show(this.selectedProduct.id);
  }

  /**
   * Handles the click event when adding selected bundle products to the cart.
   *
   * @param id - The ID of the selected product.
   * @param mainBundleProductName - The name of the main bundle product.
   */
  addToCartBundleProducts(product: any) {
    this.addToCart(product, true);
  }

  flattenArray(arr: any[]): any[] {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? this.flattenArray(val) : val);
    }, []);
  }

  /** Add to cart animation */
  addToCartAnimation() {
    // const productImage = document.getElementById('previewImageBox')!;
    const productImage = document.querySelector('.ngxImageZoomThumbnail')!;
    const cartIcon = document.querySelector('.cart-view-btn')!;
    const rect = cartIcon.getBoundingClientRect();
    const productImageRect = productImage.getBoundingClientRect();
    const clone = productImage.cloneNode(true) as HTMLImageElement;
    clone.classList.add('product-image');
    document.body.appendChild(clone);
    clone.style.position = 'fixed';
    clone.style.top = `${productImageRect.top}px`;
    clone.style.left = `${productImageRect.left}px`;
    clone.style.width = `${productImageRect.width}px`;
    clone.style.height = `${productImageRect.height}px`;
    clone.style.transition = 'all 0.5s cubic-bezier(0.42, 0, 0.58, 1)';
    clone.style.zIndex = '9999';
    cartIcon.classList.add('rubber-band-animation');
    requestAnimationFrame(() => {
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = '50px';
      clone.style.height = '50px';
      clone.style.opacity = '0';

      setTimeout(() => {
        clone.remove();
      }, 500);

      setTimeout(() => {
        cartIcon.classList.remove('rubber-band-animation');
      }, 1000)
    });
  }

  handleThumbnailsImgError(thumbnailsImg: HTMLImageElement) {
    thumbnailsImg.src = 'assets/img/not-found/no-image-found.png';
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}

