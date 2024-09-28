import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CommonService } from '../../core/services/common.service';
import { LoaderService } from '../../core/services/loader.service';
import { CartService } from '../../core/services/cart.service';
import { environment } from '../../../environments/environment';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/core/helper/must-match-validators';
import { MessageService } from 'primeng/api';
import { NewsletterComponent } from 'src/app/newsletter/newsletter.component';
import { SwiperOptions } from 'swiper';
import Swal from 'sweetalert2';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { DummyDataService } from 'src/app/core/services/dummy-data.service';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  showModal: boolean = true;
  @ViewChild('megaDropDownMenu') megaDropDownMenu!: ElementRef;
  @ViewChild('megaDropDowns') megaDropDowns!: ElementRef;
  isDeliveryQuotesShow = true;
  imgUrl = environment.imgUrl;
  @ViewChild('modalClose') modalClose: any;
  // navigationSubscription: Subscription = new Subscription();
  categoryHolder: any[] = [];
  isGlobalLoader: BehaviorSubject<any> = this.loaderService.isLoading;
  cartHolder: any[] = [];
  cartSubscription!: Subscription;
  isMobileMenuOpen = false;
  password: string = '';
  isLoading = false;
  showMegaMenu: boolean = false;
  forgotEmail: any;
  displayBasic2: boolean | undefined;
  currentSlide = 0; // Initialize with the first slide
  registerSubmitted = false;
  loginSubmitted = false;
  showPassword: boolean = false;
  dealOfDayDropdownOpen: boolean = false;
  inputClicked: boolean = false;
  dealsHotVisible: boolean = false;
  showConfirmPassword: boolean = false;
  isPasswordFocused: boolean = false;
  isConfirmPasswordFocused: boolean = false;
  showCloseIcon: boolean = false;
  screenWidth: number = window.innerWidth;
  currencyHolder = [];

  search_value: any;
  searchResultHolder: any[] = [];
  searchSubscription: Subscription = new Subscription();
  searchTime!: string;
  endTime!: number;
  loginForm!: FormGroup;

  registerForm!: FormGroup;
  startTime!: number;
  searchError: { status: boolean; text: string } = { status: false, text: '' };
  cartSummaryHolder!: {
    subtotal: number;
    total: number;
    gst_percent: number | '';
    status: boolean;
    coupon_discount: number;
    customer_id: number;
  };
  newCategoryHolder: any[] = [];
  private readonly searchSubject = new Subject<string | undefined>();
  loginSidebar: boolean = false;
  registerSidebar: boolean = false;

  @ViewChild(NewsletterComponent) newsletterComponent!: NewsletterComponent;
  owlCarouselInstance: any;
  disableButtons!: boolean;

  newsletter_products: any[] = [
    {
      "id": "936",
      "sku": "SKIP-R21-HR-BLK",
      "name": "Skech Hard Rubber Black iPhone 13",
      "slug": "skech-hard-rubber-black-iphone-131",
      "route_id": "3604",
      "description": "Skech Hard Rubber Black iPhone 13",
      "excerpt": "",
      "price": "1890.00",
      "saleprice": "1228.50",
      "quantity": "0",
      "images": [
        {
          "alt": "Skech Hard Rubber Black iPhone 13 | Unicorn Store",
          "caption": "Skech Hard Rubber Black iPhone 13 | Unicorn Store",
          "sequence": 1,
          "filename": "1e0336233c7bddc72b0e17b60494756a.jpg",
          "primary": true
        }
      ],
      "product_type": "simple",
      "parent_id": "37",
      "enabled": "1"
    },
    {
      "id": "1549",
      "sku": "MT123ZM\/A",
      "name": "iPhone 15 Plus Silicone Case with MagSafe - Storm Blue",
      "slug": "iphone-15-plus-silicone-case-with-magsafe-storm-blue1",
      "route_id": "4217",
      "description": "<p><font color=\"#212529\">Designed by Apple to complement iPhone 15 Plus, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 15 Plus, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "86",
      "related_products": "[]",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "2591146ddc2eeccb3c3f1034dbbf3c00.jpeg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "43",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0"
    },
    {
      "id": "1731",
      "sku": "AMR KIT-02261-CLEAR BUNDLE",
      "name": "Muvtech Armour Bundle For iPhone 15 - Clear",
      "slug": "muvtech-armour-bundle-for-iphone-15-clear1",
      "route_id": "4399",
      "description": "",
      "excerpt": "",
      "price": "5999.00",
      "saleprice": "2999.00",
      "quantity": "10",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "4321a0d3dc3b533d658678086783a58a.jpeg"
        }
      ],
      "product_type": "simple",
      "parent_id": "37",
      "enabled": "1"
    },
    {
      "id": "733",
      "sku": "MKU63HN\/A",
      "name": "67W USB-C Power Adapter",
      "slug": "67w-usb-c-power-adapter1",
      "route_id": "3401",
      "description": "",
      "excerpt": "",
      "price": "5800.00",
      "saleprice": "5800.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "30",
      "related_products": "[]",
      "images": [
        {
          "alt": "67W USB-C Power Adapter | Unicorn Store",
          "caption": "67W USB-C Power Adapter | Unicorn Store",
          "sequence": 1,
          "filename": "5da8fbad4ef39d42f6a2b0b98b189f73.jpeg",
          "primary": true
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "61",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0"
    }
  ];
  socialMediaHolder: any;
  productId: any;
  productName: any;
  quantity: any;
  isCrtAlreadyRegistered: boolean = false;

  searchbar_products = [
    {
      "id": 16,
      "sku": "MPVN3HN\/A",
      "name": "iPhone 14 Blue 128GB",
      "slug": "iphone-14-blue-128-gb",
      "route_id": 2648,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 62211,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 29,
      "images": [
        {
          "alt": "iPhone 14 Blue 128GB | Unicorn Store",
          "caption": "iPhone 14 Blue 128GB | Unicorn Store",
          "sequence": 1,
          "filename": "327eb5e3d3f6926684347d77bb0977dc.jpg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "df343c72f6a7322b30754248e.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "7cf95f1d267c38b6995610ebb.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "da333882c7e477a0f97888021.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1cf134d76fb8f4a382c60ef18.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "d8d87d9748f59cca838461912.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "ad31fd3333db8b80ddeecf16a.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "69020209cf4cd612862f5d8c5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "af85fdfb27c6ee6e2f3e7b447.png"
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
      "cashback_note": "Cashback up to \u20b9 3,000.00* on HDFC Bank cards",
      "cashback_price": 3000,
      "blinkit_price": null,
      "reorder_level": null,
      "cashback_amt": null,
      "category_name": "iPhone 14",
      "category_slug": "iphone-14",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 83,
      "sku": "I1PM2GWT111",
      "name": "iPhone 15 Pro Max 256GB White Titanium",
      "slug": "iphone-15-pro-max-256-gb-white-titanium",
      "route_id": 2720,
      "description": "",
      "excerpt": "",
      "price": 159900,
      "saleprice": 151905,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 5,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bba50b41191b27a3281b19127.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "f935518b8a001fb1d88eb055d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "df67e91639b90516042795e07.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "4e26a2b531340fc3dab478358.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a6d68959bfa61e66a31935c49.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "620512e79fb18fd4892f61c0f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a59133b2eac59500f7726fa90.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bcaa9e2cc9215907d4b6748a4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "f65deef8b94da0ec717ae7329.png"
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
      "parent_id": 7,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "Cashback up to \u20b9 3,000.00* HDFC Bank cards",
      "cashback_price": 3000,
      "blinkit_price": null,
      "reorder_level": null,
      "cashback_amt": null,
      "category_name": "iPhone 15 Pro Max",
      "category_slug": "iphone-15-pro-max2",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 589,
      "sku": "AWS8S448",
      "name": "Apple Watch Series 8 Starlight 45mm",
      "slug": "apple-watch-series-8-starlight-45mm",
      "route_id": 3254,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
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
          "filename": "5fbce2146dff151f165d1fb81.png"
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
      "parent_id": 34,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "Cashback upto INR 1000 on HDFC Bank cards*",
      "cashback_price": 1000,
      "blinkit_price": null,
      "reorder_level": null,
      "cashback_amt": null,
      "category_name": "Apple Watch Series 8",
      "category_slug": "apple-watch-series-81",
      "parent_category_slug": "watch1"
    },
    {
      "id": 52,
      "sku": "I1PP1G537",
      "name": "iPhone 15 Plus Pink 128GB",
      "slug": "iphone-15-plus-pink-128-gb",
      "route_id": 2687,
      "description": "",
      "excerpt": "",
      "price": 89900,
      "saleprice": 80011,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 10,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "adeb87cec56e1eb8bd74a223c.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "2d4e969b95c009648540457bc.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "4f11c36b4cf890149828fe36d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "23ff9da3c93a286007050a129.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "4b0856773f5b8490eb5e3d685.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "f6cc5709de1fb734eba830936.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "9ac98af74b9c7c474401b0097.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "3f055d85ad328b9e75d80fc09.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a8f604f816ac4f4fb2161aa00.png"
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
      "parent_id": 5,
      "product_type": "configurable",
      "cashback": 1,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "Cashback upto  \u20b94,000.00* HDFC Bank cards",
      "cashback_price": 4000,
      "blinkit_price": 0,
      "reorder_level": 0,
      "cashback_amt": 0,
      "category_name": "iPhone 15 Plus",
      "category_slug": "iphone-15-plus2",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 1979,
      "sku": "AWS9PACWLPS4GL11",
      "name": "Apple Watch Series 9 Pink Aluminium Case with Light Pink Sport 45mm GPS Loop",
      "slug": "apple-watch-series-9-pink-aluminium-case-with-light-pink-sport-45mm-gps-loop",
      "route_id": 4696,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
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
          "filename": "4f6ea4314b6b990910c44f0fc.jpeg"
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
      "parent_id": 86,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "Cashback up to INR 2500 on HDFC Bank Cards*",
      "cashback_price": 2500,
      "blinkit_price": null,
      "reorder_level": null,
      "cashback_amt": null,
      "category_name": "Apple Watch Series 9",
      "category_slug": "apple-watch-series-91",
      "parent_category_slug": "watch1"
    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "AirPods with Charging Case",
      "slug": "airpods-with-charging-case1",
      "route_id": "3349",
      "description": "",
      "excerpt": "",
      "price": "12900.00",
      "saleprice": "12900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "99",
      "related_products": "[]",
      "images": [
        {
          "alt": "AirPods with Charging Case | Unicorn Store",
          "caption": "AirPods with Charging Case | Unicorn Store",
          "sequence": 1,
          "filename": "922b205e126b8e1ffe8f54f519972d13.jpeg",
          "primary": true
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "84",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": null
    }
  ];

  searchbar_popular = [
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "iPhone 15 blue",
      "slug": "iphone-15-blue-128-gb",

    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "iPhone 15 Pro ",
      "slug": "iphone-15-pro-512-gb-black-titanium",

    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "iPad 10th Generation Pink",
      "slug": "ipad-10th-generation-pink-64-gb-wi-fi",

    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "Homepod mini yellow",
      "slug": "homepod-mini-yellow1",

    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "AirPods with Charging Case",
      "slug": "airpods-with-charging-case1",

    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "Apple Watch Series 9",
      "slug": "apple-watch-series-9-starlight-aluminium-case-with-starlight-sport-45mm-gps-loop",

    }
  ];

  isLoginWithOtpForm = false;
  isForgotPasswordForm = false;
  isOtp = false;
  isOtpValue!: number;
  otpExpires = 30;
  forgotPasswordForm: FormGroup;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };
  headerData = {
    ipflStatus: 0,
    maintenanceMode: 0,
    maintenanceTitle: '',
    maintenanceDescription: '',
    noticeBarEnabled: 0,
    noticeBarDescription: '',
    noticeBarClosable: 0,
  };
  dataForgot: any;
  iPhoneLive: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    public cartService: CartService,
    private location: Location,
    private fb: FormBuilder,
    private el: ElementRef,
    private messageService: MessageService,
    private renderer: Renderer2,
    private dummyService: DummyDataService,
    public loaderService: LoaderService,
    private platform: Platform,
  ) {
    this.forgotPasswordForm = this.fb.group({
      forgotEmail: ['', [Validators.required, Validators.email]]
    });
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  onDeviceReady() {
    // if (this.openLink) {
    //   this.openLink.nativeElement.addEventListener('click', this.showBrowser.bind(this));
    // }

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/m-login']);
    }

  }

  get getLoginControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  get getRegisterControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get getCartItemsCount() {
    const cartItems = sessionStorage.getItem('total-cart-items');
    const count = cartItems ? +cartItems : 0;
    return isNaN(count) ? 0 : count;
  }

  get isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get mobile() {
    let mobileNumber = JSON.parse(localStorage.getItem('mobile')!);
    if (mobileNumber) {
      return mobileNumber
    }
    return null;
  }


  // onClickGoogleLogin(): void {
  //   let headers = new HttpHeaders({
  //     'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
  //   });

  //   if (environment.customerIdAllowed) {
  //     headers = headers.append('customer-id', `${environment.customerId}`);
  //   }

  //   const options = {
  //     headers: headers
  //   };
  //   this.http.get(`${environment.socialLoginUrl}/google-login`, options).subscribe((response) => {
  //     console.log('Google Login Response : ', response);
  //   });
  //   // window.open(`${this.socialLoginUrl}/social-login/google-login`, '_self');
  // }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.getAllCategory();
    // this.commonService.getRequest('get_all_afls').subscribe((result) => {
    //   this.iPhoneLive = result.data; 
    // });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'conf_password'),
    };

    this.registerForm = this.fb.group(
      {
        company: [''],
        firstname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
        lastname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
        email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        countryCode: ['+91', [Validators.maxLength(3), Validators.pattern(/^\+\d{1,3}$/)]],
        gst: ['', [Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
        email_subscribe: [false], // Default value set to false
        TandC: ['', [Validators.required]], // Default value set to false
        password: ['', [Validators.required]],
        conf_password: ['', [Validators.required]],
      },
      formOptions
    );

    this.getBaseUrls();

    localStorage.setItem('exchange-enabled', 'Y');
    // this.navigationSubscription = this.commonService.getData('category_navbar').subscribe((result) => {
    //   this.categoryHolder = result;
    // });

    this.searchSubscription = this.searchSubject.pipe(debounceTime(1000), distinctUntilChanged(), switchMap((term) => this.commonService.getData(`search?s=${term}`))).subscribe((searchResp) => {
      this.searchResultHolder = [];
      if (searchResp.status) {
        this.searchResultHolder = searchResp.data;
        this.endTime = performance.now();
        this.searchTime =
          'Time Taken in Search : ' +
          Math.round(this.endTime - this.startTime) / 1000 +
          's';
      } else {
        this.searchResultHolder = [];
        this.searchError = {
          status: true,
          text: searchResp.message,
        };
      }
    });

    this.commonService.loginPopupToggle$.subscribe((response: boolean) => {
      this.openLoginSidebar();
    });

    this.commonService.headerData$.subscribe((headerDataObj) => {
      if (Object.keys(headerDataObj).length > 0) {
        this.headerData = headerDataObj;
      } else {
        this.headerData = {
          ipflStatus: 0,
          maintenanceMode: 0,
          maintenanceTitle: '',
          maintenanceDescription: '',
          noticeBarEnabled: 0,
          noticeBarDescription: '',
          noticeBarClosable: 0,
        }
      }
    });
  }

  /**
   * OTP Functions Start Here
   */
  onClickOtpLogin(): void {
    this.isLoginWithOtpForm = true;
  }

  loginWithEmail(): void {
    this.isLoginWithOtpForm = false;
    this.isForgotPasswordForm = false;
  }

  verifyMobile(phone: any) {
    console.log('Mobile No : ', phone);
    localStorage.setItem('mobile', phone);

    this.commonService.getData(`login_with_otp?phone=${phone}`).subscribe((resp) => {
      console.log('Login With OTP Resp : ', resp);
      if (resp.status) {
        this.isOtp = true;
        setInterval(() => {
          if (this.otpExpires > 0) {
            this.otpExpires = --this.otpExpires;
          } else {
            // clearInterval();
          }
        }, 1000)
      } else {
        if (resp.Error) {
          this.messageService.add({ severity: 'error', detail: resp.Error });
        }
        if (resp.response) {
          this.messageService.add({ severity: 'warning', detail: resp.response });
        }
      }
    })
  }

  validateOtp() {
    let otpData = {
      phone: localStorage.getItem('mobile'),
      otp: this.isOtpValue
    };
    this.commonService.postRequest('verify_login_otp', otpData).subscribe((resp) => {
      console.log('OTP Validate Resp : ', resp);
      if (resp && resp.status) {
        localStorage.removeItem('mobile');
        localStorage.setItem('customer_data', JSON.stringify(resp.data));
        localStorage.setItem('customer_token', resp.data.token);
        this.hideSidebar();
        this.isLoginWithOtpForm = false;
        this.isForgotPasswordForm = false;
        this.isOtp = false;
        this.router.navigate(['/account'])
      } else {
        this.messageService.add({ severity: 'error', detail: resp.Error });
      }
    })
  }

  handleOtpChange(value: string[]): void {
    // console.log(value);
  }

  handleFillEvent(otp: string): void {
    this.isOtpValue = +otp;
    console.log('Filled OTP : ', this.isOtpValue);
  }

  resendOtp() {
    console.log('Resend Otp : ', localStorage.getItem('mobile'));
  }
  // OTP Functions End Here

  navigateToHomePod() {
    this.megaDropDowns.nativeElement.style.display = 'none';
    setTimeout(() => {
      this.megaDropDowns.nativeElement.style.display = 'block';
    }, 100);
    this.router.navigate(['category/watch1']);
  }

  hideSideCartDetails() {
    document.getElementById('view-cart')!.style.display = 'none';
  }

  showSideCartDetails() {
    document.getElementById('view-cart')!.style.display = 'block';
  }

  /**
   * Opens the login sidebar and performs necessary initialization.
   */
  openLoginSidebar() {

    this.registerSidebar = false;
    this.registerSubmitted = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.registerForm.reset();
    this.renderer.removeClass(document.body, 'body-overflow-auto');
    this.renderer.addClass(document.body, 'body-overflow-hidden');
    setTimeout(() => {
      this.loginSidebar = true;
      console.log('Login Sidebar Opened: ', this.loginSidebar);
    });


    // setTimeout(() => {
    //   google.accounts.id.initialize({
    //     client_id: '788527991465-41ce4m06tfe1lkns1ukrggob357j4q3m.apps.googleusercontent.com',
    //     callback: (resp: any) => this.handleLogin(resp)

    //   });
    //   google.accounts.id.renderButton(document.getElementById("google-btns"), {
    //     theme: 'filled_blue',
    //     size: 'large',
    //     shape: 'rectangle',
    //     width: 50,
    //   })
    // }, 1000);
  }

  // private decodeToken(token: string) {
  //   return JSON.parse(atob(token.split(".")[1]))
  // }
  // handleLogin(response: any) {
  //   if (response) {
  //     const payload = this.decodeToken(response.credential)
  //     console.log("j", payload)
  //     sessionStorage.setItem("loggedInUser", JSON.stringify(payload))
  //   }
  // }

  // register sidebar
  openRegisterSidebar() {
    this.registerSidebar = true; //open register sidebar
    this.loginSidebar = false; //close login sidebar
    this.loginSubmitted = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.loginForm.reset();
    this.renderer.removeClass(document.body, 'body-overflow-auto');
    this.renderer.addClass(document.body, 'body-overflow-hidden');
  }

  hideSidebar() {
    this.loginSidebar = false;
    this.registerSidebar = false;
    this.registerForm.reset();
    this.registerSubmitted = false;
    this.loginSubmitted = false;
    this.loginForm.reset();
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.renderer.removeClass(document.body, 'body-overflow-hidden');
    this.renderer.addClass(document.body, 'body-overflow-auto');
    this.dealsHotVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.hideSidebar();
      // Add any additional logic you need when the sidebar is closed 
    }
  }

  // show password
  showUserPassword(event: Event) {
    event.stopPropagation(); // Stop event propagation to prevent the sidebar from closing
    this.showPassword = !this.showPassword; // Your existing code for toggling password visibility
  }

  // show confirm password
  showUserConfirmPassword(event: Event) {
    event.stopPropagation(); // Stop event propagation to prevent the sidebar from closing
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  //  on focus and blur input border-black by onclick
  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onConfirmPasswordFocus() {
    this.isConfirmPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
  }

  onConfirmPasswordBlur() {
    this.isConfirmPasswordFocused = false;
  }

  toggleLoginSidebar() {
    this.registerSidebar = !this.registerSidebar;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.showCloseIcon = this.screenWidth <= 425;
  }

  onSidebarCloseOnPhone() {
    document.body.style.overflow = 'auto';
  }

  toggle_Deals_Hot_Modal() {
    this.dealsHotVisible = !this.dealsHotVisible;
  }

  customSwiperOptions: SwiperOptions = {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      425: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1028: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  };

  ngAfterViewInit() {
    // this.commonService.getData('get_theme/customer_area').subscribe((result) => {
    this.dummyService.getStyles().subscribe((result) => {
      // Default colors in case properties are missing or undefined in the API response
      const defaultTopNavBgColor = '#000';
      const defaultTopNavLinkColor = '#fff';
      const defaultBottomNavBgColor = '#fff';
      const defaultBottomNavLinkColor = '#333';
      const defaultPrimaryColor = '#0076ff';
      const defaultSecondaryColor = '#8c8c8c';

      // Set Top Navbar Styles Here
      document.documentElement.style.setProperty('--navbar-first-bg-color', result.topNavBgColor || defaultTopNavBgColor);
      document.documentElement.style.setProperty('--navbar-first-color', result.topNavLinkColor || defaultTopNavLinkColor);

      // Set Bottom Navbar Styles Here
      document.documentElement.style.setProperty('--navbar-second-bg-color', result.bottomNavBgColor || defaultBottomNavBgColor);
      document.documentElement.style.setProperty('--navbar-second-color', result.bottomNavLinkColor || defaultBottomNavLinkColor);

      // Set Primary and Secondary Color
      document.documentElement.style.setProperty(
        '--primary-color',
        result.primaryColor || defaultPrimaryColor
      );
      document.documentElement.style.setProperty(
        '--secondary-color',
        result.secondaryColor || defaultSecondaryColor
      );

      // Set Footer Styles Here
      document.documentElement.style.setProperty(
        '--footer-top-bg-color',
        result.topFooterBgColor || '#161616'
      );
      document.documentElement.style.setProperty(
        '--footer-top-text-color',
        result.topFooterTextColor || '#fff'
      );
      document.documentElement.style.setProperty(
        '--footer-middle-bg-color',
        result.middleFooterBgColor || '#171717'
      );
      document.documentElement.style.setProperty(
        '--footer-middle-text-color',
        result.middleFooterTextColor || '#fff'
      );
      document.documentElement.style.setProperty(
        '--footer-bottom-bg-color',
        result.bottomFooterBgColor || '#121212'
      );
      document.documentElement.style.setProperty(
        '--footer-bottom-text-color',
        result.bottomFooterTextColor || '#fff'
      );

      // Set Primary Button Styles
      document.documentElement.style.setProperty(
        '--button-primary-bg-color',
        result.primaryButtonBgColor || defaultPrimaryColor
      );
      document.documentElement.style.setProperty(
        '--button-primary-text-color',
        result.primaryButtonTextColor || '#fff'
      );

      // Set Success Button Styles
      document.documentElement.style.setProperty(
        '--button-success-bg-color',
        result.successButtonBgColor || '#0f0'
      );
      document.documentElement.style.setProperty(
        '--button-success-text-color',
        result.successButtonTextColor || '#fff'
      );

      // Set Danger Button Styles
      document.documentElement.style.setProperty(
        '--button-danger-bg-color',
        result.dangerBtnBgColor || '#f00'
      );
      document.documentElement.style.setProperty(
        '--button-danger-text-color',
        result.dangerButtonTextColor || '#fff'
      );

      // Set Info Button Styles
      document.documentElement.style.setProperty(
        '--button-info-bg-color',
        result.infoButtonBgColor || '#008fad'
      );
      document.documentElement.style.setProperty(
        '--button-info-text-color',
        result.infoButtonTextColor || '#fff'
      );
    });
  }

  openSidebarCart() {
    this.commonService.sidebarCartToggle$.next(true)
    this.renderer.addClass(document.body, 'body-overflow-hidden');
  }

  // openSidebarCartsMobile() {
  //   this.commonService.sidebarCartMobile$.next(true)
  //   // this.renderer.addClass(document.body, 'body-overflow-hidden');
  // }
  // onLoginFormSubmit() {
  //   this.loginSubmitted = true;

  //   this.authService
  //     .login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe((resp) => {
  //       if (resp && resp.status === true) {
  //         this.loginSidebar = false;
  //         this.showPassword = false;
  //         this.showConfirmPassword = false;
  //         this.messageService.add({
  //           severity: 'success',
  //           detail: 'Login successful',
  //         });
  //         this.router.navigate(['/account']);
  //       } else {
  //         this.messageService.add({
  //           severity: 'error',
  //           detail: resp.message || 'Login failed',
  //         });
  //       }
  //     });
  // }

  async onLoginFormSubmit() {
    console.log('Login Form : ', this.loginForm.value);
    this.loginSubmitted = true;

    // Check if there are any items in the guest cart
    const guestCartItems = JSON.parse(sessionStorage.getItem('guest-cart-items') || '[]');
    if (guestCartItems.length > 0) {
      // Show sweet alert warning the user that their guest cart items will be removed
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Guest Cart Items',
        text: 'Your guest cart items will be removed after login.',
        showCancelButton: true,
        confirmButtonText: 'Proceed with Login',
        cancelButtonText: 'Cancel Login'
      });

      if (!result.isConfirmed) {
        // If the user clicked 'Cancel', close the login popup and return
        this.loginSidebar = false;
        return;
      }
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((resp) => {
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
        this.router.navigate(['/']);

        // Call the API to get the guest is allowed to checkout or not
        // this.commonService.getRequest('guest_checkout_status').subscribe((resp) => {
        this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
          if (+resp.data === 1) {
            localStorage.setItem('guest', 'not-allowed');
          } else {
            localStorage.setItem('guest', 'allowed');
          }
        });

        // Commented the below code reason: After Login, PineLabs detect the guest cart items price
        // this.commonService.crt.next(true)
        // const cartItemsJson = sessionStorage.getItem('guest-cart-items');
        // const cartItems = JSON.parse(cartItemsJson!);
        // if (Array.isArray(cartItems) && cartItems.length > 0) {
        //   cartItems.forEach((selectedProduct) => {
        //     const payload = {
        //       product_id: selectedProduct.id,
        //       quantity: selectedProduct.item_quantity
        //     };
        //     this.cartService.addToCart(payload).subscribe();
        //   });
        // }
      }
      else {
        this.messageService.add({ severity: 'error', detail: resp.message || 'Login failed' });
      }
    });
  }



  getAllCategory() {
    // this.commonService.getData('get_categories').subscribe((result) => {
    this.dummyService.getCategoryList().subscribe((result) => {
      this.newCategoryHolder = result;
      this.newCategoryHolder.forEach((item: any) => {
        item.childrens.sort((a: any, b: any) => {
          // Convert sequences to numbers
          const aSeq = +a.sequence;
          const bSeq = +b.sequence;

          // If both sequences are 0, they are equal
          if (aSeq === 0 && bSeq === 0) {
            return 0;
          }

          // If a's sequence is 0, a is larger (push to end)
          if (aSeq === 0) {
            return 1;
          }

          // If b's sequence is 0, b is larger (push to end)
          if (bSeq === 0) {
            return -1;
          }

          // Otherwise, sort normally
          return aSeq - bSeq;
        });
      });
    });
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
    this.loginSidebar = false;

  }
  // submitForgot(){

  //   console.log('Email:', this.forgotEmail);
  //   // this.displayBasic2 = false;
  // }
  submitForgot() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.forgotEmail;
      this.commonService.getData(`forgot_password?email=${email}`).subscribe(
        (resp) => {
          // Handle the response
          console.log('Response:', resp);
          this.dataForgot = resp.data;
          // Optionally close the dialog
          Swal.fire({ icon: this.dataForgot.status, title: this.dataForgot.status, text: this.dataForgot.message });

          // if (['success', 'info'].includes(resp.status)) {
          //   Swal.fire({ icon: this.dataForgot.status, title: this.dataForgot.status, text: this.dataForgot.message });
          // }
          this.displayBasic2 = false;
        },
        (error) => {
          // Handle the error
          console.error('Error:', error);
        }
      );
    } else {
      this.forgotPasswordForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  closeForgot() {
    this.displayBasic2 = false;
  }
  onRegisterFormSubmit(): void {
    this.registerSubmitted = true;
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.commonService.postRequest('register', this.registerForm.value).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe((resp) => {
      if (['success', 'info'].includes(resp.status)) {
        this.registerSubmitted = false;
        this.showPassword = false;
        this.showConfirmPassword = false;
        this.registerForm.reset();
        Swal.fire({ icon: resp.status, title: resp.status, text: resp.message });
        this.loginSubmitted = true;
      } else if (resp.status === false) {
        this.messageService.add({ severity: 'error', detail: resp.message });

      }
      else if (['error', 'warning'].includes(resp.status)) {
        this.messageService.add({ severity: resp.status, detail: resp.message });
      }
    });
  }

  getBaseUrls() {
    // this.commonService.getRequest('image_setting').subscribe((res: any) => {
    this.dummyService.getImageSettings().subscribe((res: any) => {
      if (res?.status === true) {
        this.commonService.baseUrls$.next(res.data);
        this.cartService.checkoutBaseUrl$.next(
          res?.data.checkout_url?.checkout_url
        );
      }
      this.handleGuestAndLoggedInUserCartDetails();
    }, () => {
      this.handleGuestAndLoggedInUserCartDetails();
    });
  }

  getCartItemsCounts() {
    this.cartService.getCartItemsCount().subscribe((result) => {
      if (result.status) {
        sessionStorage.setItem(
          'total-cart-items',
          JSON.stringify(result.message)
        );
      } else {
        sessionStorage.removeItem('total-cart-items');
      }
    });
  }

  handleGuestAndLoggedInUserCartDetails() {
    if (this.authService.isLoggedIn) {
      this.getCartItemsCounts();
      this.cartService.onCartItemsChanged().subscribe((resp) => {
        if (resp) {
          this.getCartItems();
        } else {
          this.cartHolder = [];
        }
      });
    } else {
      /* Guest Checkout Status */
      // this.commonService.getData('guest_checkout_status').subscribe((resp) => {
      this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
        if (+resp.data === 1) {
          localStorage.setItem('guest', 'not-allowed');
        } else {
          localStorage.setItem('guest', 'allowed');
        }
      });

      /* Get Total Cart Items When User Not Logged In & Save in total-cart-items LocalStorage */
      this.cartService.getTotalGuestCartItemsSubject.subscribe((resp) => {
        if (
          resp &&
          JSON.parse(sessionStorage.getItem('guest-cart-items')!).length > 0
        ) {
          sessionStorage.setItem(
            'total-cart-items',
            String(
              JSON.parse(sessionStorage.getItem('guest-cart-items')!).length
            )
          );
        } else {
          sessionStorage.removeItem('total-cart-items');
        }
      });
    }
  }

  // onSearch(event: any) {
  //   let term = event.target.value;
  //   this.searchResultHolder = [];
  //   this.searchError = {
  //     status: false,
  //     text: '',
  //   };
  //   this.searchTime = '';
  //   this.startTime = performance.now();
  //   this.searchSubject.next(term?.trim());
  //   console.time('db');
  // }

  onSearch(event: any) {
    let term = event.target.value;
    this.searchResultHolder = [];
    this.searchError = {
      status: false,
      text: ''
    };
    // console.log('Term : ', term);
    this.searchTime = '';
    this.startTime = performance.now();
    this.searchSubject.next(term?.trim());
    console.time('db');
  }

  // Clear the input field value
  clearInputField(inputField: HTMLInputElement) {

    inputField.value = '';
    this.searchResultHolder = []
  }

  closeModal(): void {
    // Close the modal by triggering the click event of the close button
    this.modalClose.nativeElement.click();
  }

  /* Get Cart Summary Details like: Total Price, GST Details, Coupon Details */
  getCartSummary() {
    this.cartService.getRequestWithToken('cart_summary').subscribe((result) => {
      if (result.status && result.data) {
        this.cartSummaryHolder = {
          subtotal: result.data.subtotal,
          gst_percent: result.data.gst_percent,
          total: result.data.total,
          status: result.data.status,
          coupon_discount: result.data.coupon_discount,
          customer_id: result.data.customer_id,
        };
        localStorage.setItem(
          'cart-summary',
          JSON.stringify(this.cartSummaryHolder)
        );
      } else {
        localStorage.removeItem('cart-summary');
      }
    });
  }

  changeURL(page: string, slug: string) {
    this.location.replaceState(`/${page}/` + slug);
  }

  // TODO: Research on ViewCart Call in Header one extra api call
  getCartItems() {
    this.cartSubscription = this.cartService.getAllCartItems().subscribe((result) => {
      this.cartHolder = [];
      if (result.length > 0) {
        this.cartHolder = result;
        if (!localStorage.getItem('coupon-details')) {
          this.getCartSummary();
        }
      } else {
        localStorage.removeItem('is-billing-editable');
        localStorage.removeItem('is-shipping-editable');
        localStorage.removeItem('is-payment-editable');
        localStorage.removeItem('billing-details');
        localStorage.removeItem('shipping-details');
        localStorage.removeItem('payment-details');
        localStorage.removeItem('pin-code');
        localStorage.removeItem('coupon-details');
        localStorage.removeItem('search-term');
        localStorage.removeItem('cart-summary');
        localStorage.removeItem('order-id');
        localStorage.removeItem('order-confirm');
      }
    });
    this.cartService.getCartItemsCount().subscribe((result) => {
      if (result.status) {
        if (!this.authService.isLoggedIn) {
          this.cartHolder = JSON.parse(
            sessionStorage.getItem('guest-cart-items')!
          );
          sessionStorage.setItem(
            'total-cart-items',
            String(this.cartHolder.length)
          );
        } else {
          sessionStorage.setItem(
            'total-cart-items',
            JSON.stringify(result.message)
          );
        }
      } else {
        localStorage.removeItem('total-cart-items');
      }
    });
  }

  goToCart() {
    this.router.navigate(['/view-cart'], { replaceUrl: true });
  }

  onChangeCurrency(e: any) {
    localStorage.setItem('currency', e.target.value);
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  checkSelectedCurrency() {
    return localStorage.getItem('currency');
  }

  /**
   * Handles the click event to hide the mega menu.
   */
  onClickHideMegaMenu(item: any) {
    this.megaDropDownMenu.nativeElement.style.display = 'none';
    setTimeout(() => {
      this.megaDropDownMenu.nativeElement.style.display = 'block';
    }, 100);

    console.log('Item : ', item);
    localStorage.setItem('category-meta-data', JSON.stringify({ meta: item.meta, seo_title: item.seo_title }));

  }

  /**
   * Handles the click event to hide the deals of the day mega menus.
   */
  onClickHideMegaMenus() {
    this.megaDropDowns.nativeElement.style.display = 'none';
    setTimeout(() => {
      this.megaDropDowns.nativeElement.style.display = 'block';
    }, 100);
  }

  /**
   * Handles the click event for the logout button.
   * Updates the cart change detection subject to false,
   * logs out the user, and resets the loginSubmitted flag.
   */
  onClickLogout() {
    this.cartService.cartChangeDetectionSubject.next(false);
    this.authService.logout();
    this.loginSubmitted = false;
    this.commonService.sidebarCartLogout.next(false)
    if (this.platform.ANDROID) {
      this.router.navigate(['/m-login']);
    }
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * It unsubscribes from any subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    // this.navigationSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  close() {
    this.isDeliveryQuotesShow = false;
  }

}
