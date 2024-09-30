import { Component, OnInit, AfterViewChecked, ViewChild, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { OwlOptions } from "ngx-owl-carousel-o";
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { SubscriptionHandler } from '../subscription-handler/subscription-handler';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from "rxjs/operators";
import Swal from 'sweetalert2';
import { DataLayerService } from '../../services/data-layer.service';
import { StorageService } from '../../services/storage.service';
import { FormControl } from '@angular/forms';
import { DummyDataService } from '../../services/dummy-data.service';

@Component({
  selector: 'app-sidebarcart',
  templateUrl: './sidebarcart.component.html',
  styleUrls: ['./sidebarcart.component.scss']
})
export class SidebarcartComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('pin') pin!: ElementRef;
  isPin = false;
  isPinCheckingLoader: boolean = false;
  @ViewChild('agreeCheckbox') agreeCheckbox!: ElementRef<HTMLInputElement>;
  cartRuleJson: any[] = [
    {
      attribute: "cart_item|base_price",
      operator: ">=",
      attribute_type: "price",
      value: "499"
    }
  ];
  quantity: number = 1;
  rating: number = 3;
  isCartOpen: boolean = false;
  agreeWithTerms: boolean = false;
  imgUrl = environment.imgUrl;
  private updateSubscription!: Subscription;
  cartSubscription: Subscription = new Subscription();
  subscriptionHandler = new SubscriptionHandler();
  retrievedData: any[] = [];
  priceDetailsHolder!: any;
  grandTotal = 0.00;
  showErrorMessage: boolean = false;
  isChecked: boolean = false;
  recommendedProductHolder: any[] = [];
  guestCheckoutStatus = false;
  customOptions: OwlOptions = {
    loop: true,
    margin: 15,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    stagePadding: 30,
    dots: true,
    navSpeed: 1000,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
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
        items: 3,
        nav: true,
      }
    },
    nav: true,
  };
  dataSharingService: any;
  pinResponseHolder: any;
  isQuantity: any;
  isCouponApplyingLoader: boolean = false;
  Recommended_Accessories = [
    {
      "id": "663",
      "sku": "MPTM3ZM\/A",
      "name": "iPhone 14 Pro Silicone Case with MagSafe - Sunglow",
      "slug": "iphone-14-pro-silicone-case-with-magsafe-sunglow1",
      "route_id": "3331",
      "description": "<p><font color=\"#212529\">Designed by Apple to complement iPhone 14 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 14 Pro, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process. So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4410.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "0",
      "related_products": "[]",
      "images": [
        {
          "alt": "iPhone 14 Pro Silicone Case with MagSafe - Sunglow | Unicorn Store",
          "caption": "iPhone 14 Pro Silicone Case with MagSafe - Sunglow | Unicorn Store",
          "sequence": 1,
          "filename": "c5b6814c2c95abc79e5ac66e6753fbe4.jpeg",
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
      "parent_id": "49",
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
    },
    {
      "id": "664",
      "sku": "MPTL3ZM\/A",
      "name": "iPhone 14 Pro Silicone Case with MagSafe - Succulent",
      "slug": "iphone-14-pro-silicone-case-with-magsafe-succulent1",
      "route_id": "3332",
      "description": "<p><font color=\"#212529\">Designed by Apple to complement iPhone 14 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 14 Pro, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process. So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4410.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "11",
      "related_products": "[]",
      "images": [
        {
          "alt": "iPhone 14 Pro Silicone Case with MagSafe - Succulent | Unicorn Store",
          "caption": "iPhone 14 Pro Silicone Case with MagSafe - Succulent | Unicorn Store",
          "sequence": 1,
          "filename": "8fa641f7f9db152276bcabcd90cd5a06.jpeg",
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
      "parent_id": "49",
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
    },
    {
      "id": "665",
      "sku": "MPTK3ZM\/A",
      "name": "iPhone 14 Pro Silicone Case with MagSafe - Elderberry",
      "slug": "iphone-14-pro-silicone-case-with-magsafe-elderberry1",
      "route_id": "3333",
      "description": "<p><font color=\"#212529\">Designed by Apple to complement iPhone 14 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 14 Pro, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process. So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4100.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "0",
      "related_products": "[]",
      "images": [
        {
          "alt": "iPhone 14 Pro Silicone Case with MagSafe - Elderberry | Unicorn Store",
          "caption": "iPhone 14 Pro Silicone Case with MagSafe - Elderberry | Unicorn Store",
          "sequence": 1,
          "filename": "6730a0f80c60016713e01d0404ca4760.jpeg",
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
      "parent_id": "49",
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
    },
    {
      "id": "666",
      "sku": "MPTJ3ZM\/A",
      "name": "iPhone 14 Pro Silicone Case with MagSafe - Lilac",
      "slug": "iphone-14-pro-silicone-case-with-magsafe-lilac1",
      "route_id": "3334",
      "description": "",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4410.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "8",
      "related_products": "[]",
      "images": [
        {
          "alt": "iPhone 14 Pro Silicone Case with MagSafe - Lilac | Unicorn Store",
          "caption": "iPhone 14 Pro Silicone Case with MagSafe - Lilac | Unicorn Store",
          "sequence": 1,
          "filename": "9db5394219c8e0c6c7cfca11c02bceb6.jpeg",
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
      "parent_id": "49",
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
    },
  ]
  bestSellerProducts: any[] = [];
  isCartVisible = false;
  isCrtAlreadyRegistered: boolean = false;
  isCartModalShow = false // For showing the cart modal on the product page
  pinControl = new FormControl('');
  isModalCartShow = false;
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router, private renderer: Renderer2,
    private dataLayerService: DataLayerService,
    private storageService: StorageService,
    private dummyService: DummyDataService
  ) {
  }

  /**
   * Gets a boolean value indicating whether the customer is logged in or not.
   * @returns {boolean} True if the customer is logged in, false otherwise.
   */
  get isCustomerLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    // this.commonService.getData('guest_checkout_status').subscribe((resp) => {
    this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
      this.guestCheckoutStatus = +resp.data === 1;
    });

    this.getCartItems();

    this.commonService.sidebarCartLogout.subscribe((response: boolean) => {
      localStorage.clear();
      sessionStorage.clear();
      this.retrievedData = [];
      this.getCartItems();
    });

    this.commonService.sidebarCartToggle$.subscribe((response: boolean) => {
      this.isCartOpen = response;
      if (JSON.parse(sessionStorage.getItem('guest-cart-items')!)) {
        this.retrievedData = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
      }
      this.getCartItems(response); // Get the cart items when the sidebar cart is opened
    });

    // this.commonService.sidebarCartMobile$.subscribe((response: boolean) => {
    //   this.isCartOpen = response;
    //   const dataFromSession = sessionStorage.getItem('guest-cart-items');
    //   if (dataFromSession) {
    //     this.retrievedData = JSON.parse(dataFromSession);
    //   }
    //   this.getCartItems();
    // });

    if (this.pinAvailability()?.status) {
      this.pinControl.setValue(JSON.parse(localStorage.getItem('pin-code')!).pin);
    }

    this.pinControl.valueChanges.pipe(
      debounceTime(1000) // delay of 1 second
    ).subscribe(value => {
      this.checkPin(value.toString(), false)
    });

    // if (this.pin) {
    //   fromEvent(this.pin.nativeElement, 'keyup').pipe(map((event: any) => {
    //     return event.target.value;
    //   }), debounceTime(1000)).subscribe((pin) => {
    //     if (pin) {
    //       this.checkPin(pin.toString())
    //     }
    //   })
    // }
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  closeSidebarCart() {
    if (this.isCartOpen) {
      this.isCartOpen = false;
      this.renderer.removeClass(document.body, 'body-overflow-hidden');
    }
  }

  handleRemoveFromCartGA4(item: any) {
    this.dataLayerService.push({
      event: "remove_from_cart",
      ecommerce: {
        item_list_id: "remove_from_cart",
        item_list_name: "Remove From Cart",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          price: item.saleprice,
        }],
      },
    });
  }

  /**
   * Retrieves the cart items and performs necessary operations based on the user's authentication status.
   * 
   * @param isSidebarCartOpen - A boolean indicating whether the sidebar cart is open or not. Default value is false.
   */
  getCartItems(isSidebarCartOpen: boolean = false) {
    this.retrievedData = [];
    if (this.authService.isLoggedIn) {
      this.subscriptionHandler.add(this.cartService.getAllCartItems().subscribe((result) => {
        if (result && result.status) {
          if (result.status === 'info' && result.status_code === 'customer_not_found') {
            Swal.fire({
              title: 'Error!',
              text: 'Your session has been expired. Please login again to continue.',
              icon: 'error',
            }).then(() => {
              this.authService.logout();
            });
          }
          this.retrievedData = result.cart_items;
          if (isSidebarCartOpen) {
            this.fireGA4EventOnViewCartLoad(this.retrievedData);
          }
          if (this.retrievedData && this.retrievedData.length > 0) {
            if (result.cart_summary) {
              this.priceDetailsHolder = {
                subtotal: result.cart_summary.subtotal,
                gst_percent: result.cart_summary.gst_percent,
                total: result.cart_summary.total,
                status: result.cart_summary.status,
                coupon_discount: result.cart_summary.coupon_discount,
                customer_id: result.cart_summary.customer_id,
              };
              localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));

              // Remove the coupon code from the local storage if the coupon discount is 0
              if (+result.cart_summary.coupon_discount === 0) {
                this.storageService.removeLocalStorageData('coupon-discount');
              }
            } else {
              localStorage.removeItem('cart-summary');
            }
            let productIds = this.retrievedData.map((item) => item.id);
            this.getRecommendedProductByCartItems(productIds);
          } else {
            this.storageService.clearLocalStorageExcept(['customer_data', 'customer_token', 'pin-code', 'category-meta-data', 'meta-data', 'guest', 'isResult']);
          }
          this.cartService.getCartItemsCount().subscribe((result) => {
            if (result.status) {
              sessionStorage.setItem('total-cart-items', JSON.stringify(result.message));
            } else {
              sessionStorage.removeItem('total-cart-items');
            }
          })
        }
        else if (result.status === 'info' && result.status_code === 'customer_not_found') {
          Swal.fire({
            title: 'Error!',
            text: 'Your session has been expired. Please login again to continue.',
            icon: 'error',
          }).then(() => {
            this.authService.logout();
          });
        }
      }));
    } else {
      this.retrievedData = this.cartService.getSessionCartItems || [];

      this.retrievedData.forEach((item, index) => {
        if (item.item_quantity < 1) {
          this.retrievedData[index].item_quantity = 1;
          sessionStorage.setItem('guest-cart-items', JSON.stringify(this.retrievedData));
        }
      });

      if (this.retrievedData && this.retrievedData.length > 0) {
        if (isSidebarCartOpen) {
          this.fireGA4EventOnViewCartLoad(this.retrievedData);
        }
        sessionStorage.setItem('total-cart-items', String(this.retrievedData.length));
        let total = 0;
        this.retrievedData.forEach((item) => {
          this.isQuantity = item;
          this.commonService.updateIsQuantity(this.isQuantity);

          console.log('item.bundle : ', item.bundle);

          // Note: 0 is the value for Main Product ( Non Bundle Product)
          if (+item.bundle === 0) {
            total += (+item.saleprice * +item.item_quantity);
          }

          // Note: 2 is the value for Bundle Main Product
          if (+item.bundle === 2) {
            total += +item.product_value;
          }

          // Note: 1 is the value for Bundle Product Accessories
          if (+item.bundle === 1) {
            total += +item.accessory_value;
          }

        });

        this.priceDetailsHolder = { total: total };

        localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
        let productIds = this.retrievedData.map((item) => item.id);
        this.getRecommendedProductByCartItems(productIds);
      } else {
        this.storageService.clearLocalStorageExcept(['guest', 'category-meta-data', 'pin-code', 'meta-data', 'isResult']);
        this.storageService.clearSessionStorage();
      }
    }
    setTimeout(() => {
      if (this.retrievedData && this.retrievedData.length > 0) {
        this.grandTotal = 0;

        this.retrievedData.forEach((item) => {
          this.grandTotal += item.price * item.item_quantity;
        });
      }
    }, 500);
  }

  /**
   * Retrieves recommended products based on the given cart item IDs.
   * @param productIds - An array of product IDs.
   * @returns A promise that resolves to the recommended products.
   */
  getRecommendedProductByCartItems(productIds: string[] | number[]) {
    const payload = {
      product_id: productIds,
      flag: true
    };
    this.commonService.postRequest('cart_related_products', payload).subscribe((response) => {
      if (response.status === 'success') {
        if (response.data.length > 0) {
          this.recommendedProductHolder = response.data;
          this.bestSellerProducts = response.data;
        } else {
          this.recommendedProductHolder = [];
          this.bestSellerProducts = [];
        }
      }
    });
  }

  /**
   * Handles the view cart event for Google Tag Manager (GTM).
   * @param data - The data containing the cart items.
   */
  fireGA4EventOnViewCartLoad(data: any) {
    let items: any = [];
    let totalValue = 0;
    data.forEach((item: any, index: number) => {
      totalValue += item.saleprice * item.item_quantity;
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_variant: item.name,
        price: item.saleprice, // TODO: item.saleprice * item.item_quantity
        quantity: item.item_quantity || 1,
      });
    });
    this.dataLayerService.push({
      event: "view_cart_list",
      ecommerce: {
        item_list_id: "view_cart",
        item_list_name: "View Cart",
        value: totalValue,
        currency: "INR",
        items: items,
      },
    });
  }

  /* Get Cart Summary Details like: Total Price, GST Details, Coupon Details */
  getCartSummary() {
    this.cartService.getRequestWithToken('cart_summary').subscribe((result) => {
      if (result.status && result.data) {
        this.priceDetailsHolder = {
          subtotal: result.data.subtotal,
          gst_percent: result.data.gst_percent,
          total: result.data.total,
          status: result.data.status,
          coupon_discount: result.data.coupon_discount,
          customer_id: result.data.customer_id,
        };
        localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
      } else {
        localStorage.removeItem('cart-summary');
      }
    });
  }

  /* Update Cart Items : Product Quantity, Coupon Details */
  updateCartItem(productId: number, qtyVal: any) {
    let qty = +qtyVal;
    if (qty >= 1) {
      let payload = {
        cart_item_id: productId,
        quantity: qtyVal
      };
      this.cartService.updateCart(payload).subscribe((resp) => {
        this.commonService.total.next(resp);

        if (resp.status) {
          this.messageService.add({ severity: 'success', detail: 'Cart Updated Successfully' });
          this.getCartItems();
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
      })
    }
  }

  swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
      380: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      },
      425: {
        slidesPerView: 1.5,
        spaceBetween: 30,
        navigator: true
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 30,
        navigator: false
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        navigator: true
      },
      1024: {
        slidesPerView: 1.5,
        spaceBetween: 0,
        navigator: true

      },
      1030: {
        slidesPerView: 1.2,
        spaceBetween: 30,
        navigator: true

      }

    }
  }

  swiperConfigs = {
    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
      380: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      },
      425: {
        slidesPerView: 1.5,
        spaceBetween: 30,
        navigator: true
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 30,
        navigator: false
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigator: true
      },
      508: {
        slidesPerView: 1,
        spaceBetween: 5,
        navigator: false
      },
      1024: {
        slidesPerView: 2.5,
        navigator: true

      },
      1030: {
        slidesPerView: 2.5,
        navigator: true,


      }

    }
  }

  // mobile swiper here 
  swiperConfigs_recently = {
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
        spaceBetween: 0,
        navigator: false
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: true

      },
      1030: {
        slidesPerView: 3,
        spaceBetween: 0,
        navigator: true

      }

    }
  }

  incrementQty(productId: number, qty: any) {
    if (this.authService.isLoggedIn) {
      qty++;
      this.updateCartItem(productId, +qty);
      // this.commonService.total.next(true)
    } else {
      let existing: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
      let index = existing.findIndex((item: any) => item.id === productId && +item.bundle === 0);
      if (index > -1) {
        existing[index] = {
          ...existing[index],
          item_quantity: existing[index].item_quantity + 1
        };
      }
      sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
      this.getCartItems();
    }
  }

  handleImageError(event: any, item: any) {
    event.target.src = this.imgUrl + '/medium/' + item?.image;
  }

  decrementQty(cartItemId: number, qty: any, item: any) {
    if (qty > 1) {
      // this.commonService.total.next(true)
      if (this.authService.isLoggedIn) {
        qty--;
        this.updateCartItem(cartItemId, +qty);
      } else {
        if (sessionStorage.getItem('guest-cart-items')) {
          // Get the existing data
          let existing: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
          let index = existing.findIndex((item: any) => item.id === cartItemId && +item.bundle === 0);
          if (index > -1) {
            existing[index] = {
              ...existing[index],
              item_quantity: existing[index].item_quantity - 1
            };
          }
          sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
          this.getCartItems();
        }
      }
    } else {
      this.removeItem(item);
    }
  }

  checkPin(pin: string, next: boolean = false) {
    if (pin && pin.length === 6) {
      this.isPinCheckingLoader = true;
      this.cartService.checkPinCode(+pin).subscribe((resp) => {
        this.isPinCheckingLoader = false;
        this.pinResponseHolder = resp;
        this.commonService.updateIsResult(this.pinResponseHolder);
        this.isPin = false;
        if (resp.status && pin.length === 6) {
          localStorage.setItem('pin-code', JSON.stringify({ ...resp, pin: pin }));
          this.getCartItems();
          if (next === true) {
            this.router.navigate(['/checkout'], { replaceUrl: true });
            this.closeSidebarCart();
          }
        } else {
          localStorage.setItem('pin-code', JSON.stringify({ ...resp, pin: pin }));
        }
      }, () => {
        this.isPinCheckingLoader = false;
        this.pinResponseHolder = {
          status: false,
          message: 'Invalid Pincode',
        };
      })
    } else {
      localStorage.removeItem('pin-code');
      this.isPin = true;
    }
  }

  updateResult(data: any) {
    this.commonService.updateIsResult(data);
  }

  pinAvailability() {
    if (localStorage.getItem('pin-code')) {
      return JSON.parse(localStorage.getItem('pin-code')!)
    }
  }

  getRecommendedProduct(productId: number) {
    this.commonService.getData(`recommended_products/${productId}`).subscribe((result) => {
      if (result.status) {
        this.recommendedProductHolder = result.data;
      } else {
        this.recommendedProductHolder = [];
      }
    }, () => {
      this.recommendedProductHolder = [];
    });
  }

  userRating: number = 0; // Initialize to a default value

  setRating(rating: number): void {
    this.userRating = rating;
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.retrievedData) {
      total += item.saleprice * item.item_quantity;
    }

    return total;
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.cartSubscription?.unsubscribe();
    this.subscriptionHandler.unsubscribe();
  }

  cartTrackByFn(index: number, item: any) {
    return index;
  }

  applyCoupon(code: string) {
    if (!this.authService.isLoggedIn) {
      this.messageService.add({ severity: 'error', detail: 'Coupon code is applicable for logged in user only.' });
      return;
    }
    if (!code) {
      this.messageService.add({ severity: 'error', detail: 'Please enter coupon code.' });
      localStorage.removeItem('coupon-discount');
      return;
    }
    this.isCouponApplyingLoader = true;
    this.cartService.applyCoupon(code).subscribe((result) => {
      this.isCouponApplyingLoader = false;
      if (result.status) {
        this.messageService.add({ severity: 'success', detail: 'Coupon successfully applied' });
        this.priceDetailsHolder.total = this.priceDetailsHolder.total - result.coupon_discount;
        this.priceDetailsHolder.coupon_discount = result.coupon_discount;
        localStorage.setItem('coupon-discount', JSON.stringify(result.coupon_discount));
      } else {
        this.messageService.add({ severity: 'error', detail: result.message });
        localStorage.removeItem('coupon-discount');
      }
    }, () => {
      this.isCouponApplyingLoader = false;
    })
  }

  proceedToCheckout() {
    // this.showErrorMessage = !this.isChecked;
    // if (!this.isChecked) return;

    this.isPin = false;

    if (this.pinAvailability()?.status) {

      // if (this.guestCheckoutStatus || !this.authService.isLoggedIn) {
      this.router.navigate(['/checkout'], { replaceUrl: true });
      // }

      setTimeout(() => {
        const couponDetails = localStorage.getItem('coupon-details');
        if (couponDetails) {
          this.applyCoupon(JSON.parse(couponDetails).coupon);
        }
      }, 2000);

      // Close the sidebar cart after proceeding to checkout
      this.closeSidebarCart();

      return;
    }

    // Assuming checkPin is an async function
    this.checkPin(this.pinControl.value, true);

    if (this.pinAvailability()?.status) {
      // Close the sidebar cart after proceeding to checkout
      this.closeSidebarCart();
    }
  }

  /**
   * Checks if a coupon discount is applied.
   * @returns {boolean} True if a coupon discount is applied, false otherwise.
   */
  get isCouponApplied(): boolean {
    return !!this.storageService.getLocalStorageData('coupon-discount');
  }

  // get isCouponApplied() {
  //   return !!JSON.parse(localStorage.getItem('coupon-discount')!);
  // }

  // removeCoupon() {
  //   this.cartService.removeCoupon().subscribe((resp) => {
  //     if (resp.status) {
  //       localStorage.removeItem('coupon-details');
  //       this.getCartSummary();
  //     }
  //   })
  // }
  removeCoupon() {
    this.cartService.removeCoupon().subscribe((resp) => {
      if (resp.status) {
        localStorage.removeItem('coupon-discount');
        this.getCartItems();
      }
    })
  }

  // confirmRemove(event: Event) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to remove this item?',
  //     accept: () => {
  //       this.removeItem();
  //     },
  //     reject: () => {

  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Operation Cancelled',
  //         detail: 'Item removal was cancelled by the user.',
  //       });
  //     },
  //   });
  // }

  removeItem(item: any, bundle: any = 0) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this item from cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.authService.isLoggedIn) {
          // User is logged in, remove the item directly
          this.cartService.removeFromCart(item.cart_item_id).subscribe((resp) => {
            this.handleRemoveFromCartGA4(item);
            this.commonService.totalPrice.next(resp)
            this.getCartItems();
            if (resp.success) {
              this.messageService.add({
                severity: 'success',
                detail: 'The item has been successfully removed from the cart.',
              });
            } else {
              this.messageService.add({
                severity: 'error',
                detail: 'An error occurred while removing the item from the cart.',
              });
            }
          });
        } else {
          const existingData = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
          if (existingData) {
            if (+bundle === 2) {
              let index = existingData.findIndex((eItem: any) => +eItem.id === +item.id && +eItem.bundle === 2);
              this.commonService.totalsession.next(index)
              // Check If the item is belong to bundle product then remove all the items of that bundle product
              let bundleItems = existingData.filter((eItem: any) => +eItem.main_product_id === +item.id);
              if (bundleItems && bundleItems.length > 0) {
                bundleItems.forEach((bItem: any) => {
                  let bIndex = existingData.findIndex((eItem: any) => +eItem.id === +bItem.id && (+eItem.bundle === 2 || +eItem.bundle === 1));
                  if (bIndex > -1) {
                    existingData.splice(bIndex, 1);
                  }
                });
              }
              if (index > -1) {
                existingData.splice(index, 1);
                sessionStorage.setItem('guest-cart-items', JSON.stringify(existingData));
                this.getCartItems();
              }
            }

            if (+bundle === 0) {
              let index = existingData.findIndex((eItem: any) => +eItem.id === +item.id && +eItem.bundle === 0);
              this.commonService.totalsession.next(index)
              if (index > -1) {
                existingData.splice(index, 1);
                sessionStorage.setItem('guest-cart-items', JSON.stringify(existingData));
                this.getCartItems();
              }
            }
            this.handleRemoveFromCartGA4(item);
          }
        }
      }
    })
  }

  addToCart(productId: number): void {
    let payload = {
      product_id: productId,
      quantity: 1,
    };
    this.cartService.addToCart(payload).subscribe((resp) => {
      if (!resp.status) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      } else {
        // Update retrievedData with the new item or update existing item
        const newItem = resp.data; // Assuming 'resp.data' contains the updated item
        const existingItemIndex = this.retrievedData.findIndex(item => item.id === newItem.id);

        if (existingItemIndex !== -1) {
          // Update existing item
          this.retrievedData[existingItemIndex] = newItem;
        } else {
          // Add new item to the array
          this.retrievedData.push(newItem);
        }
      }
    });
  }

  getFirstImageFileName(images: any) {
    if (!images) return;
    return this.imgUrl + '/medium/' + images[0]?.filename;
  }

  setFallbackImage(event: any) {
    event.target.src = 'assets/img/not-found/no-image-found.png';
  }
}

