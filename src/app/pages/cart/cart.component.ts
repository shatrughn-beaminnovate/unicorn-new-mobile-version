import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CartService } from "../../core/services/cart.service";
import { debounceTime, map } from "rxjs/operators";
import { fromEvent, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CommonService } from "../../core/services/common.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../core/services/auth.service";
import { SubscriptionHandler } from "../../core/shared/subscription-handler/subscription-handler";
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Meta, Title } from '@angular/platform-browser';
import { DummyDataService } from 'src/app/core/services/dummy-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('pin') pin!: ElementRef;
  cartRuleJson: any[] = [
    {
      attribute: "cart_item|base_price",
      operator: ">=",
      attribute_type: "price",
      value: "499"
    }
  ];
  imgUrl = environment.imgUrl;
  cartSubscription: Subscription = new Subscription();
  cartItemsHolder: any[] = [];
  grandTotal = 0.00;
  recommendedProductHolder: any[] = [];
  customOptions: OwlOptions = {};
  isPin = false;
  priceDetailsHolder!: any;
  guestCheckoutStatus = false;
  subscriptionHandler = new SubscriptionHandler();

  constructor(
    private cartService: CartService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private dummyService: DummyDataService
  ) {
  }

  get isCouponApplied() {
    return !!JSON.parse(localStorage.getItem('coupon-discount')!);
  }

  ngOnInit(): void {

    // Dynamic Image Url Change In Cart Page
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    // Page Title
    this.titleService.setTitle('View Cart | UnicornStore');

    this.getCartItems();

    // this.commonService.getData('guest_checkout_status').subscribe((resp) => {
    this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
      this.guestCheckoutStatus = +resp.data === 1;
    });

    if (this.pin) {
      fromEvent(this.pin.nativeElement, 'keyup').pipe(map((event: any) => {
        console.log('Check Pin nativeElement : ', event.target.value);
        return event.target.value;
      }), debounceTime(1000)).subscribe((pin) => {
        if (pin) {
          this.checkPin(pin)
        }
      })
    }

    this.customOptions = {
      loop: false,
      margin: 15,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      stagePadding: 5,
      navSpeed: 700,
      navText: ['<', '>'],
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        425: {
          items: 2,
          nav: false,
        },
        768: {
          items: 3,
          nav: false,
        },
        1024: {
          items: 5,
          nav: true,
        },
        1440: {
          items: 6,
          nav: true,
        }
      }
    }
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  /**
   * @decs Get Cart Items
   */

  getCartItems() {
    // Check if the user is logged in
    if (this.authService.isLoggedIn) {
      this.subscriptionHandler.add(this.cartService.getAllCartItems().subscribe((result) => {
        if (result && result.status) {
          this.cartItemsHolder = result.cart_items;

          if (this.cartItemsHolder && this.cartItemsHolder.length > 0) {
            if (result.cart_summary) {
              // Store price details and handle coupon discount if applicable
              this.priceDetailsHolder = {
                subtotal: result.cart_summary.subtotal,
                gst_percent: result.cart_summary.gst_percent,
                total: result.cart_summary.total,
                status: result.cart_summary.status,
                coupon_discount: result.cart_summary.coupon_discount,
                customer_id: result.cart_summary.customer_id,
              };

              const couponDiscount = +localStorage.getItem('coupon-discount')!;
              if (couponDiscount) {
                this.priceDetailsHolder.total -= couponDiscount;
                this.priceDetailsHolder.coupon_discount = couponDiscount;
              }

              localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
            } else {
              localStorage.removeItem('cart-summary');
            }

            this.getRecommendedProduct(this.cartItemsHolder[0].id);
          } else {
            localStorage.removeItem('coupon-discount');
            localStorage.removeItem('pin-code');
          }

          this.updateTotalCartItemsCount();
        }
        this.handleViewCartGTM();
      }))
    } else {
      // User is a guest
      const sessionCartItems = CartService.getSessionCartItems;
      console.log('Session Cart Items : ', sessionCartItems);

      if (sessionCartItems && sessionCartItems.length > 0) {
        // Guest-added cart items found in the session
        if (!this.cartItemsHolder) {
          this.cartItemsHolder = [];
        }

        // Merge guest cart items with any existing cart items
        this.cartItemsHolder = sessionCartItems;
        console.log('Cart Items Holder : ', this.cartItemsHolder);
        // Update the total cart item count in the session
        sessionStorage.setItem('total-cart-items', String(this.cartItemsHolder.length));
        this.handleViewCartGTM();
        // Calculate and update the guest cart summary
        this.calculateGuestCartSummary();
      } else {
        // No guest-added cart items found in the session
        this.cartItemsHolder = [];
        sessionStorage.removeItem('total-cart-items');
        localStorage.removeItem('coupon-discount');
        localStorage.removeItem('pin-code');
        localStorage.removeItem('guest-cart-items');
        this.cartService.cartItemsCountHolder.next(0);
      }
    }

    this.calculateGrandTotal();
  }

  handleViewCartGTM() {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_cart_list",
      ecommerce: {
        item_list_id: "view_cart",
        item_list_name: "View Cart",
        items: this.cartItemsHolder.map((cartItem, index) => ({
          item_id: cartItem.sku,
          item_name: cartItem.name,
          index: index.toString(),
          price: cartItem.saleprice,
          quantity: cartItem.item_quantity || 1, // Add your default values or fetch from item if available
        })),
      },
    });
  }

  calculateGuestCartSummary() {
    let total = 0;
    this.cartItemsHolder.forEach((item) => {
      total += item.saleprice * item.item_quantity;
    });

    this.priceDetailsHolder = {
      total: total,
    };
    localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
  }

  updateTotalCartItemsCount() {
    // Fetch and store the total cart item count from the cart service
    this.cartService.getCartItemsCount().subscribe((result) => {
      if (result.status) {
        sessionStorage.setItem('total-cart-items', JSON.stringify(result.message));
      } else {
        sessionStorage.removeItem('total-cart-items');
      }
    });
  }

  calculateGrandTotal() {
    setTimeout(() => {
      if (this.cartItemsHolder && this.cartItemsHolder.length > 0) {
        this.grandTotal = 0;
        this.cartItemsHolder.forEach((item) => {
          this.grandTotal += item.price * item.item_quantity;
        });
      }
    }, 500);
  }

  // getCartItems() {
  //   if (this.authService.isLoggedIn) {
  //     this.subscriptionHandler.add(this.cartService.getAllCartItems().subscribe((result) => {
  //       console.log('View Cart Data In Cart : ', result);
  //       if (result && result.status) {

  //         // Store Cart Items In Cart Items Holder & Local Storage
  //         this.cartItemsHolder = result.cart_items;

  //         if (this.cartItemsHolder && this.cartItemsHolder.length > 0) {
  //           if (result.cart_summary) {
  //             this.priceDetailsHolder = {
  //               subtotal: result.cart_summary.subtotal,
  //               gst_percent: result.cart_summary.gst_percent,
  //               total: result.cart_summary.total,
  //               status: result.cart_summary.status,
  //               coupon_discount: result.cart_summary.coupon_discount,
  //               customer_id: result.cart_summary.customer_id,
  //             };

  //             if (+localStorage.getItem('coupon-discount')!) {
  //               this.priceDetailsHolder.total = this.priceDetailsHolder.total - +localStorage.getItem('coupon-discount')!;
  //               this.priceDetailsHolder.coupon_discount = +localStorage.getItem('coupon-discount')!;
  //             }

  //             localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
  //           } else {
  //             localStorage.removeItem('cart-summary');
  //           }
  //           this.getRecommendedProduct(this.cartItemsHolder[0].id);
  //         } else {
  //           localStorage.removeItem('coupon-discount');
  //           localStorage.removeItem('pin-code');
  //         }
  //         this.cartService.getCartItemsCount().subscribe((result) => {
  //           if (result.status) {
  //             sessionStorage.setItem('total-cart-items', JSON.stringify(result.message));
  //           } else {
  //             localStorage.removeItem('total-cart-items');
  //           }
  //         })
  //       }
  //     }));

  //   } else {
  //     if (CartService.getSessionCartItems !== null) {
  //       this.cartItemsHolder = CartService.getSessionCartItems;
  //       sessionStorage.setItem('total-cart-items', String(this.cartItemsHolder.length));
  //       console.log('Session Card Items : ', this.cartItemsHolder);
  //       let total = 0;
  //       this.cartItemsHolder.forEach((item) => {
  //         console.log('Cart Item : ', item);
  //         total += (item.saleprice * item.item_quantity);
  //       });
  //       this.priceDetailsHolder = {
  //         total: total,
  //       };
  //       console.log('car : ', this.priceDetailsHolder);
  //       localStorage.setItem('cart-summary', JSON.stringify(this.priceDetailsHolder));
  //     }
  //   }
  //   console.log('Cart Holder In Cart : ', this.cartItemsHolder);
  //   setTimeout(() => {
  //     if (this.cartItemsHolder && this.cartItemsHolder.length > 0) {
  //       this.grandTotal = 0;
  //       this.cartItemsHolder.forEach((item) => {
  //         this.grandTotal += item.price * item.item_quantity;
  //       });
  //     }

  //   }, 500);
  // }

  /* Get Cart Summary Details like: Total Price, GST Details, Coupon Details */
  getCartSummary() {
    console.log('Cart Summary in Cart Page : ', true);
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
      console.log('Update Payload : ', payload);
      this.cartService.updateCart(payload).subscribe((resp) => {
        console.log('Update Cart Item Resp : ', resp);
        if (resp.status) {
          this.getCartItems();
        }
      })
    }
  }


  removeCartItem(event: Event, cartItemId: number) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
        if (this.authService.isLoggedIn) {
          this.cartService.removeFromCart(cartItemId).subscribe((resp) => {
            this.getCartItems();

            if (resp.success) {
              this.messageService.add({ severity: 'success', detail: resp.message });
            } else {
              this.messageService.add({ severity: 'error', detail: resp.message });
            }

            // this.dataLayerService.push({ ecommerce: null });
            this.dataLayerService.push({
              event: "remove_from_cart",
              ecommerce: {
                item_list_id: "remove_from_cart",
                item_list_name: "Remove From Cart",
                items: [{
                  item_id: resp.data.sku,
                  item_name: resp.data.name,
                  price: resp.data.saleprice,
                }],
              },
            });

            console.log("remove_from_cart - dataLayer  :", (window as any).dataLayer);

          })
        } else {
          let existing: any[] = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
          console.log('Existing : ', existing);
          if (existing.length > 0) {
            let matchedIndex = existing.findIndex((item: any) => item.id === cartItemId);
            if (matchedIndex > -1) {
              this.handleRemoveFromCartGA4(existing[matchedIndex]);
              setTimeout(() => {
                existing.splice(matchedIndex, 1);
                sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
                this.getCartItems();
              }, 500);
            }
          } else {

          }
        }
      },
      acceptButtonStyleClass: 'btn btn-danger',
      rejectButtonStyleClass: 'btn btn-primary'
    });
  }

  handleRemoveFromCartGA4(item: any) {
    console.log('Remove From Cart item : ', item);

    // this.dataLayerService.push({ ecommerce: null });
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

    console.log("(window as any).dataLayer remove_from_cart :", (window as any).dataLayer);

  }

  moveToWishlist(cartItemId: number) {

    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "move_to_wishlist",
      ecommerce: {
        items: this.cartItemsHolder.map((cartItem, index) => ({
          item_id: cartItem.id,
          item_name: cartItem.name,
          index: index.toString(),
          item_category: cartItem.name, // Add your actual property from item
          price: cartItem.price,
          quantity: cartItem.item_quantity || 1, // Add your default values or fetch from item if available
        })),
      },
    });

    console.log("(window as any).dataLayer move_to_wishlist :", (window as any).dataLayer);

    // console.log('Cart Item Id : ', cartItemId);
    this.cartService.moveToWishlist(cartItemId).subscribe((resp) => {
      // console.log('Move To Wishlist Resp : ', resp);
      if (resp.success) {
        this.getCartItems();
      }
    })
  }

  /**
   * Updates the quantity of a product in the cart. If user is logged in, the quantity is updated in the server. If user is a guest, the quantity is updated in the session.
   * @param productId - The ID of the product.
   * @param qty - The current quantity of the product.
   * @param increment - Whether to increment or decrement the quantity. Pass True to increment, false to decrement.
   */
  updateQty(productId: number, qty: number, increment: boolean) {
    if (this.authService.isLoggedIn) {
      qty += increment ? 1 : -1;
      if (qty > 0) {
        this.updateCartItem(productId, qty);
      }
    } else {
      let existingGuestCartItems: any[] = JSON.parse(sessionStorage.getItem('guest-cart-items') || '[]');
      let matchedProductIndex = existingGuestCartItems.findIndex((item: any) => item.id === productId);
      if (matchedProductIndex > -1) {
        existingGuestCartItems[matchedProductIndex].item_quantity += increment ? 1 : -1;
        if (existingGuestCartItems[matchedProductIndex].item_quantity < 1) {
          existingGuestCartItems.splice(matchedProductIndex, 1); // remove item if quantity is less than 1
        }
      }
      sessionStorage.setItem('guest-cart-items', JSON.stringify(existingGuestCartItems));
      this.getCartItems();
    }
  }

  checkPin(pin: any, next?: boolean) {
    console.log('Pin Code : ', pin);
    if (pin && pin.length === 6) {
      this.cartService.checkPinCode(+pin).subscribe((resp) => {
        console.log('Pin Code Resp : ', resp);
        this.isPin = false;
        if (resp.status && pin.length === 6) {
          localStorage.setItem('pin-code', JSON.stringify(resp));
          this.getCartItems();
          if (next) {
            this.router.navigate(['/checkout'], { replaceUrl: true });
          }
        } else {
          localStorage.setItem('pin-code', JSON.stringify(resp));
        }
      })
    } else {
      localStorage.removeItem('pin-code');
      this.isPin = true;
      this.pin.nativeElement.focus();
    }
  }

  pinAvailability() {
    if (localStorage.getItem('pin-code')) {
      return JSON.parse(localStorage.getItem('pin-code')!)
    }
  }

  proceedToCheckout() {

    console.log('guestCheckoutStatus : ', this.guestCheckoutStatus);
    this.isPin = false;
    if (this.pinAvailability() && this.pinAvailability()?.status) {
      setTimeout(() => {
        if (localStorage.getItem('coupon-discount')) {
          this.applyCoupon(JSON.parse(localStorage.getItem('coupon-discount')!).coupon);
        }
      }, 2000);

      if (this.guestCheckoutStatus) {
        this.router.navigate(['/checkout'], { replaceUrl: true });
      } else if (this.authService.isLoggedIn) {
        this.router.navigate(['/checkout'], { replaceUrl: true });
      } else if (!this.authService.isLoggedIn) {
        // this.router.navigate(['/login'], { replaceUrl: true })
        this.commonService.loginPopupToggle$.next(true);

      }

      return;
    }
    this.checkPin(this.pin.nativeElement.value, true);
  }

  getRecommendedProduct(productId: number) {
    this.commonService.getData(`recommended_products/${productId}`).subscribe((result) => {
      // console.log('Recommended Product : ', result);
      if (result.status) {
        this.recommendedProductHolder = result.data;
      } else {
        this.recommendedProductHolder = [];
      }
    })
  }

  addToCart(productId: number): void {
    let payload = {
      product_id: productId,
      quantity: 1,
    };
    this.cartService.addToCart(payload).subscribe((resp) => {
      // console.log('Add to Cart In Cart View Page Resp : ', resp);
      if (!resp.status) {
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        this.commonService.loginPopupToggle$.next(true);
      }
      this.getCartItems();
    })
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.subscriptionHandler.unsubscribe();
  }

  cartTrackByFn(index: number, item: any) {
    return index;
  }

  // Coupon Code Section Start Here //
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
    this.cartService.applyCoupon(code).subscribe((result) => {
      if (result.status) {
        this.messageService.add({ severity: 'success', detail: 'Coupon successfully applied' });
        this.priceDetailsHolder.total = this.priceDetailsHolder.total - result.coupon_discount;
        this.priceDetailsHolder.coupon_discount = result.coupon_discount;
        localStorage.setItem('coupon-discount', JSON.stringify(result.coupon_discount));
      } else {
        this.messageService.add({ severity: 'error', detail: result.message });
        localStorage.removeItem('coupon-discount');
      }
    })
  }

  removeCoupon() {
    this.cartService.removeCoupon().subscribe((resp) => {
      if (resp.status) {
        localStorage.removeItem('coupon-discount');
        this.getCartItems();
      }
    })
  }

  // Coupon Code Section End Here //

  /*emptyCartItems() {
    const dialogData: ConfirmDialogModel = {
      title: "Empty Cart Confirmation",
      message: "Do you want to empty cart ?",
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // console.log('Confirm Dialog After Closed : ', dialogResult);
      if (dialogResult) {
        this.cartService.emptyCart().subscribe((resp) => {
          // console.log('Empty Cart Resp : ', resp);
          if (resp.status) {
            this.cartService.cartChangeDetectionSubject.next(true);
            this.getCartItems();
            sessionStorage.removeItem('total-cart-items');
            localStorage.removeItem('coupon-discount');
            localStorage.removeItem('pin-code');
          }
        })
      }
    });
  }*/

  // removeCartItem(cartItemId) {
  //   // console.log('Cart Item Id : ', cartItemId);
  //   const dialogData: ConfirmDialogModel = {
  //     title: "Remove From Cart Confirmation",
  //     message: "Do you want to remove this item from cart ?",
  //   };
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: "400px",
  //     data: dialogData
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     // console.log('Confirm Dialog After Closed : ', dialogResult);
  //     if (dialogResult) {
  //       // if guest data remove from session storage or else not guest data remove from server
  //       if (this.authService.isLoggedIn) {
  //         this.cartService.removeFromCart(cartItemId).subscribe((resp) => {
  //           this.getCartItems();
  //           // @ts-ignore
  //           window.dataLayer.push({"ecommerce": null}); // Clear the previous ecommerce object.
  //           // @ts-ignore
  //           window.dataLayer.push({
  //             event: "remove_from_cart",
  //             ecommerce: {
  //               currency: localStorage.getItem('currency'),
  //               value: 1,
  //               items: [{
  //                 item_id: resp.id,
  //                 item_name: resp.name,
  //                 price: resp.saleprice,
  //                 quantity: resp.quantity,
  //                 item_variant: resp.name,
  //                 index: resp.id,
  //               }]
  //             }
  //           });
  //         })
  //       } else {
  //         let existing: any[] = this.cartService.getSessionCartItems;
  //         if (existing.length > 0) {
  //           let matchedIndex = existing.findIndex((item: any) => item.id === cartItemId);
  //           if (matchedIndex > -1) {
  //             console.log('Remove Cart Data : ', existing);
  //             // @ts-ignore
  //             window.dataLayer.push({"ecommerce": null}); // Clear the previous ecommerce object.
  //             // @ts-ignore
  //             window.dataLayer.push({
  //               event: "remove_from_cart_guest",
  //               ecommerce: {
  //                 currency: localStorage.getItem('currency'),
  //                 value: 1,
  //                 items: [{
  //                   item_id: existing[matchedIndex].id,
  //                   item_name: existing[matchedIndex].name,
  //                   price: existing[matchedIndex].saleprice,
  //                   quantity: existing[matchedIndex].quantity,
  //                   item_variant: existing[matchedIndex].name,
  //                   index: existing[matchedIndex].id,
  //                 }]
  //               }
  //             });
  //
  //             setTimeout(() => {
  //               existing.splice(matchedIndex, 1);
  //               sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
  //               this.getCartItems();
  //             }, 500)
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

}