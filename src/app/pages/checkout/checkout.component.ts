import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonService } from "../../core/services/common.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ICountry, IStates } from "../account/address-form/address-form.component";
import { CartService } from "../../core/services/cart.service";
import { debounceTime, finalize, map } from "rxjs/operators";
import { fromEvent, Subject, Subscription } from "rxjs";
import { PaymentService } from "../../core/services/payment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../core/services/auth.service";
import { MessageService } from 'primeng/api';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { StorageService } from 'src/app/core/services/storage.service';
import { DummyDataService } from 'src/app/core/services/dummy-data.service';
import { Platform } from '@angular/cdk/platform';
declare var cordova: any;
// custom.d.ts
interface Window {
  loadBillDeskSdk: () => void;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('billingBox') billingBox!: ElementRef;
  @ViewChild('shippingBox') shippingBox!: ElementRef;
  @ViewChild('paymentBox') paymentBox!: ElementRef;
  imgUrl = environment.imgUrl;
  cartSubscription: Subscription = new Subscription();
  cartItemsHolder: any[] = [];
  cart_summary: any;
  isBillingLoading = false;
  isBillingFormSubmitted = false;
  billingForm!: FormGroup;
  shippingForm!: FormGroup;
  isShippingFormSubmitted = false;
  isShippingLoading = false;
  shippingDetails!: any;
  isLoggedIn: boolean = false;
  currentNumber = 1;
  cartItemsHolder_session: any[] = []
  countryHolder!: ICountry[];
  stateHolder!: IStates[];
  storeHolder: any[] = [];
  billing = true;
  isShipToNewAddress = false;
  isShipToBilling = true;
  isShipToNearestStore = false;
  searchTerms = new Subject<string>();
  selectedStoreId!: number;
  paymentModuleHolder: any[] = [];
  cartSummaryHolder!: { subtotal: number, total: number, gst_percent: number, status: boolean, coupon_discount: number, customer_id: number, };
  paymentStatus!: string;
  paymentLink!: string;
  paymentFailedHolder: {
    show_msg: boolean,
    payment_failure_type: 'code' | 'message';
    payment_failure_code: string;
    order_number: string;
  } = {
    show_msg: false,
  } as never;

  paymentCodeHolder: any[] = []
  item_quantity: any;
  isQuantity: any;
  cart_summarys: any;

  gstValidationText = 'Please enter valid GST Number';
  gstValidationStatus = false;
  gst = '';
  // Login Properties
  isLoading = false;
  isLoginLoading = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginSubmitted = false;
  registerSubmitted = false;
  isLoginWithOtpForm = false;
  isForgotPasswordForm = false;
  isOtp = false;
  isOtpValue!: number;
  otpExpires = 30;
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
  isFetchingNearestStores: boolean = false;
  @ViewChild('billingPin') billingPin!: ElementRef;
  isBillingPin = false;
  isPinCheckingLoader: boolean = false;
  pinResponseHolder: any;
  isPaymentProcessing: boolean[] = [];
  cityOptions: any[] = [];
  isSearchTerm = false;
  gstData: any;
  @ViewChildren('openLink') openLink!: QueryList<ElementRef>;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private cartService: CartService,
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private cd: ChangeDetectorRef,
    private storageService: StorageService,
    private dummyService: DummyDataService,
    private platform: Platform
  ) {
    // Reload the page after navigating to '/checkout' route only once
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  onDeviceReady() {
    // if (this.openLink) {
    //   this.openLink.forEach((element: ElementRef) => {
    //     element.nativeElement.addEventListener('click', this.showBrowser.bind(this));
    //   });
    // }
  }



  get billingFormControl(): { [key: string]: AbstractControl } {
    return this.billingForm.controls;
  }

  get shippingFormControl(): { [key: string]: AbstractControl } {
    return this.shippingForm.controls;
  }

  get orderSummary(): any {
    return this.storageService.getLocalStorageData('cart-summary');
  }

  ngOnInit(): void {

    localStorage.setItem('is-billing-editable', '1');
    localStorage.setItem('is-shipping-editable', '0');
    localStorage.removeItem('shipping-details');
    localStorage.setItem('is-payment-editable', '0');

    this.titleService.setTitle('Checkout | Unicornstore');
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    // this.getCartItems();
    this.commonService.total.subscribe((response: boolean) => {
      this.getCartItems();
    });


    if (this.authService.isLoggedIn) {
      this.getGstDetails();
    }

    this.commonService.totalPrice.subscribe((response: boolean) => {
      this.getCartItems();
      this.cart_summary = "";
      // this.router.navigate(['/']);
      this.getTotalItemCart();

    });

    this.commonService.totalsession.subscribe((response: boolean) => {
      this.getCartItems();
      this.cartItemsHolder = [];
      this.getTotalItemCart();
    });

    this.commonService.sidebarCartToggle$.subscribe((response: boolean) => {
      this.getCartItems(true);
    });

    this.commonService.isQuantity$.subscribe(result => {
      this.isQuantity = result;
      this.getCartItems(true);
    });


    // let isCheckoutPageReloaded = localStorage.getItem('is-checkout-page-reloaded');
    // if (isCheckoutPageReloaded !== 'Y') {
    //   localStorage.setItem('is-checkout-page-reloaded', 'Y');
    //   window.location.reload();
    // }

    this.titleService.setTitle('Checkout | UnicornStore');
    this.paymentFailedHolder.show_msg = false;

    this.billingAddressFormInit();


    this.getCountry();
    this.searchTerms.pipe(debounceTime(1500)).subscribe(term => {
      if (term) {
        localStorage.setItem('search-term', term);
        this.isSearchTerm = true;
        let payload = {
          city: term
        };
        this.commonService.postRequest('get_store_by_city ', payload).subscribe((result) => {
          this.isFetchingNearestStores = false;
          this.storeHolder = [];
          this.isShipToNearestStore = true;
          localStorage.removeItem('selected-pickup-store');
          // let data = this.getNearestStoreAddress();
          // data.store_id = null;
          // localStorage.setItem('selected-pickup-store', JSON.stringify(data))
          if (result.status === true) {
            this.storeHolder = result.data;
          } else {
            this.storeHolder = [];
          }
        });
      } else {
        this.isSearchTerm = false;
        this.isFetchingNearestStores = false;
        this.storeHolder = [];
        localStorage.removeItem('search-term');
        localStorage.removeItem('selected-pickup-store');
      }
    });

    if (this.authService.isLoggedIn) {
      this.getCustomerDefaultBillingAddress();
      // this.updateOrderValue(); // Get Updated Grand Total Value
    }
    // Handle Success Payment Status
    console.log('Return URL : ', this.route.snapshot.queryParams);
    if (this.route.snapshot.queryParams.payment_status === 'true' || this.route.snapshot.queryParams.payment_status === true) {
      //  && (this.route.snapshot.queryParams.mode === 'pinelabs' || this.route.snapshot.queryParams.mode === 'billdesk')
      let order_number = this.route.snapshot.queryParams.order_number;
      this.emptyCartItems();
      this.router.navigate(['/checkout/place-order'], { queryParams: { order_number: order_number } });
    }
    // Handle Failure and Cancel Payment Status
    if (this.route.snapshot.queryParams.payment_status === 'false' || this.route.snapshot.queryParams.payment_status === false) {
      // || this.route.snapshot.queryParams.payment_status === 'false' && (this.route.snapshot.queryParams.mode === 'pinelabs' || this.route.snapshot.queryParams.mode === 'billdesk')
      localStorage.setItem('is-billing-editable', '1');
      localStorage.setItem('is-shipping-editable', '0');
      localStorage.removeItem('shipping-details');
      localStorage.setItem('is-payment-editable', '0');
      // this.router.navigate(['/checkout']);
      this.paymentFailedHolder = {
        show_msg: true,
        payment_failure_type: 'code', // code, message
        payment_failure_code: this.route.snapshot.queryParams.txn_fail_code,
        order_number: this.route.snapshot.queryParams.order_number,
      };
    }
    // For Cashfree Payment
    if (!this.route.snapshot.queryParams.mode && this.route.snapshot.queryParams.order_id) {
      this.paymentService.checkPaymentStatus(this.route.snapshot.queryParams.order_id).subscribe((resp) => {
        // if (resp.status) {
        if (resp && resp.order_status === 'PAID') {
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '0');
          localStorage.setItem('is-payment-editable', '0');
          this.emptyCartItems();
          this.router.navigate(['/checkout/place-order']);
        } else if (resp && resp.order_status === 'ACTIVE') {
          this.paymentStatus = resp.order_status;
          this.paymentLink = resp.payment_link;
        }
        localStorage.setItem('order-confirm', JSON.stringify(resp.data))
        // } else {
        //   localStorage.removeItem('order-confirm');
        // }
      })
    }

    setTimeout(() => {
      fromEvent(this.billingBox.nativeElement, 'click').subscribe(() => {
        let classListArray = this.billingBox.nativeElement.classList;
        if (classListArray.contains('completed')) {
          this.editBill()
        }
      });
      fromEvent(this.shippingBox.nativeElement, 'click').subscribe(() => {
        let classListArray = this.billingBox.nativeElement.classList;
        if (classListArray.contains('completed')) {
          this.editShip()
        }
      });
    }, 1000);

    if (localStorage.getItem('pin-code')) {
      let pinDetails = this.storageService.getLocalStorageData('pin-code');
      this.billingForm.patchValue({
        zip: pinDetails?.pin
      });
      setTimeout(() => {
        this.getDetailsByPin(+pinDetails?.pin, 'billing');
      }, 1000)
    }
    this.getPaymentModules();
    this.getCityOptions();
  } // end of onInit

  // This is GST data fetch and display on input field
  getGstDetails() {
    this.commonService.getData('get_customer_gst_no').subscribe((resp: any) => {
      if (resp.status) {
        this.gst = resp.gst;
      }
    });
  }

  getCityOptions() {
    this.cityOptions = [
      {
        label: 'Mumbai',
        value: 'Mumbai'
      },
      {
        label: 'Pune',
        value: 'Pune'
      },
      {
        label: 'Palghar',
        value: 'Palghar'
      },
      {
        label: 'Ichalkaranji',
        value: 'Ichalkaranji'
      },
      {
        label: 'Nashik',
        value: 'Nashik'
      },
      {
        label: 'Ahmednagar',
        value: 'Ahmednagar'
      },
      {
        label: 'Jalna',
        value: 'Jalna'
      },
      {
        label: 'Navi Mumbai',
        value: 'Navi Mumbai'
      },
      {
        label: 'New Delhi',
        value: 'New Delhi'
      },
      {
        label: 'Gurugram',
        value: 'Gurugram'
      },
      {
        label: 'Faridabad',
        value: 'Faridabad'
      },
      {
        label: 'Kaithal',
        value: 'Kaithal'
      },
      {
        label: 'Lucknow',
        value: 'Lucknow'
      },
      {
        label: 'Noida',
        value: 'Noida'
      },
      {
        label: 'Agra',
        value: 'Agra'
      },
      {
        label: 'Varanasi',
        value: 'Varanasi'
      },
      {
        label: 'Ghaziabad',
        value: 'Ghaziabad'
      },
      {
        label: 'Gorakhpur',
        value: 'Gorakhpur'
      },
      {
        label: 'Raebareli',
        value: 'Raebareli'
      },
      {
        label: 'Patiala',
        value: 'Patiala'
      },
      {
        label: 'Chandigarh',
        value: 'Chandigarh'
      },
      {
        label: 'Mohali',
        value: 'Mohali'
      },
      {
        label: 'Ahmedabad',
        value: 'Ahmedabad'
      },
      {
        label: 'Vadodara',
        value: 'Vadodara'
      },
      {
        label: 'Rajkot',
        value: 'Rajkot'
      },
      {
        label: 'Junagadh',
        value: 'Junagadh'
      },
      {
        label: 'Gandhinagar',
        value: 'Gandhinagar'
      },
      {
        label: 'Bhuj',
        value: 'Bhuj'
      },
      {
        label: 'Roorkee',
        value: 'Roorkee'
      },
      {
        label: 'Margao',
        value: 'Margao'
      }
    ]
  }

  ngAfterViewInit() {
    this.cd.detectChanges();

    if (this.billingForm.value.zip && this.billingForm.value.zip === 6) {
      this.getDetailsByPin(this.billingForm.value.zip, 'billing');
    }
  }

  async checkPin(pin: string, form: string = 'billing'): Promise<boolean> {
    let isPinServiceable = false;
    if (pin && pin.length === 6) {
      try {
        const resp = await this.cartService.checkPinCode(+pin).toPromise();
        this.pinResponseHolder = resp;
        this.commonService.updateIsResult(this.pinResponseHolder);
        this.isBillingPin = false;
        if (form === 'billing') {
          this.storageService.setLocalStorageData('pin-code', { ...resp, pin: pin });
        }
        if (form === 'shipping') {
          this.isPinCheckingLoader = false;
          this.storageService.setLocalStorageData('shipping-pin-code', { ...resp, pin: pin });
        }

        if (resp.status) {
          this.getCartItems();
          isPinServiceable = true;
        } else {
          isPinServiceable = false;
        }
      } catch (error) {
        this.isPinCheckingLoader = false;
        this.pinResponseHolder = {
          status: false,
          message: 'Invalid Pincode',
        };
        isPinServiceable = false;
      }
    } else {
      localStorage.removeItem('pin-code');
      this.isBillingPin = true;
      isPinServiceable = false;
    }
    return isPinServiceable;
  }

  get pinAvailability() {
    if (localStorage.getItem('pin-code')) {
      return this.storageService.getLocalStorageData('pin-code');
    }
  }
  get pinAvailabilityForShipping() {
    if (localStorage.getItem('shipping-pin-code')) {
      return this.storageService.getLocalStorageData('shipping-pin-code');
    }
  }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    localStorage.removeItem('is-checkout-page-reloaded');
  }

  /**
   * Empties the cart items for the logged in user or guest user.
   * If the user is logged in, the cart items are emptied from the server and local storage.
   * If the user is a guest, the cart items are emptied from the session storage.
   */
  emptyCartItems() {
    // Remove Local Storage Items
    localStorage.removeItem('is-billing-editable'); // Remove Billing Editable
    localStorage.removeItem('is-shipping-editable'); // Remove Shipping Editable
    localStorage.removeItem('is-payment-editable'); // Remove Payment Editable
    localStorage.removeItem('order_number'); // Remove Order Number
    localStorage.removeItem('coupon-details'); // Remove Coupon Details
    localStorage.removeItem('pin-code'); // Remove Pin Code
    localStorage.removeItem('billing-details'); // Remove Billing Details
    localStorage.removeItem('shipping-details'); // Remove Shipping Details
    localStorage.removeItem('cart-summary'); // Remove Cart Summary

    // Remove Cart Items from Session Storage
    sessionStorage.removeItem('total-cart-items'); // Remove Total Cart Items
    sessionStorage.removeItem('guest-cart-items'); // Remove Guest Cart Items
    if (this.authService.isLoggedIn) {
      this.cartService.emptyCart().subscribe((resp) => {
        this.cartService.cartChangeDetectionSubject.next(true);
        if (resp.status) {
          this.getCartItems();
        }
      })
    } else {
      this.cartService.cartItemsCountHolder.next(0);
    }
  }

  placeOrder() {
    if (this.getPaymentStatus()?.order_status === 'PAID' || this.getPaymentStatus()?.payment_info) {
      this.emptyCartItems();
      this.router.navigate(['/checkout/place-order']);
    }
  }

  /**
   * Initializes the billing address form with the necessary form controls and validators.
   * If billing details are available, it populates the form with the saved details.
   */
  billingAddressFormInit() {
    this.billingForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country_id: ['99', [Validators.required]],
      zone_id: ['', [Validators.required]],
      country: [''],
      country_code: [''],
      zone: [''],
    });

    if (this.getBillingDetails()) {
      this.billingForm.patchValue(this.getBillingDetails());
    }

    if (localStorage.getItem('pin')) {
      this.billingForm.patchValue({
        zip: localStorage.getItem('pin')
      });
    }
  }

  /**
   * Handles the submission of the billing form.
   * Sets the `isBillingFormSubmitted` flag to true and saves the billing address in the database.
   * If the user is logged in, the billing address is saved in the database.
   * If the user is a guest, the billing address is saved in the local storage.
   * After Billing Form Submitted Successfully Go To Checkout Step 2 Shipping Details
   * @returns void
   */
  async onBillingFormSubmit() {
    this.isBillingFormSubmitted = true;
    // check pin code is serviceable or not
    this.isPinCheckingLoader = true;
    const isPinServiceable = await this.checkPin(this.billingForm.value.zip.toString(), 'billing');
    if (!isPinServiceable) {
      this.isPinCheckingLoader = false;
      return;
    }


    this.gstValidationText = '';
    this.gstValidationStatus = false;
    // const isGstBlacklisted = await this.checkBlackListedGST(this.gst);
    // console.log('isGstBlacklisted: ', isGstBlacklisted);
    // if (isGstBlacklisted) {
    //   return; // Stop the execution of the function if the GST is blacklisted
    // }
    if (this.gst) {
      const isGstBlacklisted = await this.checkBlackListedGST(this.gst);
      console.log('isGstBlacklisted: ', isGstBlacklisted);
      if (isGstBlacklisted) {
        return; // Stop the execution if GST is blacklisted
      }
    }
    if (this.billingForm.invalid) return; // If the form is invalid, stop the execution of the function.

    this.isBillingLoading = true;
    if (this.authService.isLoggedIn) {
      let payload: any = {
        ...this.billingForm.value,
        product_ids: [],
        address_type: 'billing',
      };

      if (!this.gst) {
        payload.gst = this.gst;
      }

      this.cartService.putRequest('save-billing-address', payload).subscribe((resp: any) => {
        if (resp.status) {
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '1');
          localStorage.setItem('is-payment-editable', '0');
          localStorage.setItem('billing-details', JSON.stringify(payload));
          this.fireAddBillingInfoGAEvent(this.cartItemsHolder);
        }
      });
    } else {
      // Handle Guest User Billing Address Here: Save Guest Billing Address in local storage
      let payload: any = {
        bill_company: "",
        bill_firstname: this.billingForm.value.firstname,
        bill_lastname: this.billingForm.value.lastname,
        bill_email: this.billingForm.value.email,
        bill_phone: this.billingForm.value.phone,
        bill_address1: this.billingForm.value.address1,
        bill_address2: this.billingForm.value.address2,
        bill_city: this.billingForm.value.city,
        bill_zip: this.billingForm.value.zip,
        bill_zone: this.billingForm.value.zone,
        bill_zone_id: this.billingForm.value.zone_id,
        bill_country: this.billingForm.value.country,
        bill_country_code: this.billingForm.value.country_code,
        bill_country_id: this.billingForm.value.country_id,
        address_type: 'billing',
        product_ids: [],
      };

      let guestCartItems = JSON.parse(sessionStorage.getItem('guest-cart-items')!);

      if (guestCartItems && guestCartItems.length > 0) {
        guestCartItems.forEach((item: any, index: number) => {
          let itemQuantity = +item.item_quantity < 1 ? 1 : +item.item_quantity;
          if (+item.bundle === 2) {
            itemQuantity = 1;
          }
          if (+item.bundle === 1) {
            itemQuantity = 1;
          }
          payload.product_ids.push({
            product_id: item.id,
            quantity: itemQuantity,
            ipfl: item.ipfl,
            bundle: item.bundle
          } as never);

          console.log('itemQuantity: ', guestCartItems[index]);
          guestCartItems[index].item_quantity = itemQuantity;
        });
        sessionStorage.setItem('guest-cart-items', JSON.stringify(guestCartItems));
      }
      if (!this.gst) {
        payload.gst = this.gst;
      }
      // Save Guest Billing Address in database for temporary
      this.cartService.putRequest('save-guest-details', payload).subscribe((resp: any) => {
        if (resp.status === true) {
          localStorage.setItem('order_number', resp.order_number);
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '1');
          localStorage.setItem('is-payment-editable', '0');
          localStorage.setItem('billing-details', JSON.stringify(this.billingForm.value));
          this.fireAddBillingInfoGAEvent(this.cartItemsHolder_session);
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
      }, () => {
        this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
      });
    }
  }

  fireAddBillingInfoGAEvent(cartItems: any) {
    let items: any[] = [];
    let totalValue = 0;
    cartItems.forEach((item: any) => {
      totalValue += item.saleprice * item.item_quantity;
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_price: item.saleprice,
        item_quantity: item.item_quantity,
        item_variant: item.name,
        coupon: '', // TODO: Add coupon code here
      });
    });
    this.dataLayerService.push({
      event: "add_billing_info",
      ecommerce: {
        currency: "INR",
        value: totalValue,
        coupon: '', // TODO: Add coupon code here
        items: items
      }
    });
  }

  fireAddShippingInfoGAEvent(cartItems: any) {
    let items: any[] = [];
    let totalValue = 0;
    let couponCode = '';
    cartItems.forEach((item: any) => {
      totalValue += item.saleprice * item.item_quantity;
      couponCode = item?.coupon_code || '';
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_price: item.saleprice,
        item_quantity: item.item_quantity,
        item_variant: item.name,
        coupon: item?.coupon_code || '',
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_shipping_info",
      ecommerce: {
        currency: "INR",
        value: totalValue,
        coupon: couponCode,
        items: items
      }
    });
  }

  fireAddPickupFromStoreInfoGAEvent(cartItems: any) {
    let items: any[] = [];
    let totalValue = 0;
    let couponCode = '';
    cartItems.forEach((item: any) => {
      totalValue += item.saleprice * item.item_quantity;
      couponCode = item?.coupon_code || '';
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_price: item.saleprice,
        item_quantity: item.quantity,
        item_variant: item.name,
        coupon: item?.coupon_code || ''
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_pickup_from_store_info",
      ecommerce: {
        currency: "INR",
        value: totalValue,
        coupon: couponCode,
        items: items
      }
    });
  }

  // async checkBlackListedGST(gst: string): Promise<boolean> {
  //   if (gst) {
  //     const gstRegex = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  //     if (!gstRegex.test(gst)) {
  //       this.gstValidationText = 'Please enter valid GST Number';
  //       this.gstValidationStatus = true;
  //       return true; // GST is invalid
  //     }
  //     try {
  //       const resp = await this.commonService.postRequest('checkBlackListed_gst', { custgstin: gst }).toPromise();
  //       if (resp && resp.status === 'success' && resp.status_code === 201) {
  //         this.gstValidationText = resp.message;
  //         this.gstValidationStatus = true;
  //         return true; // GST is blacklisted
  //       }
  //     } catch (error) {
  //       Swal.fire({
  //         title: 'Error!',
  //         text: 'Something went wrong. Please try again later.',
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //       return true;
  //     }
  //   }
  //   return false; // GST is not blacklisted or an error occurred
  // }
  async checkBlackListedGST(gst: string | string[]): Promise<boolean> {
    // Handle empty GST case
    if (!gst || (Array.isArray(gst) && gst.length === 0)) {
      this.gstValidationText = '';
      this.gstValidationStatus = false;
      return false;
    }

    // Convert GST to string if it's an array
    const gstValue = Array.isArray(gst) ? gst.join('') : gst;

    // Validate GST format
    const gstRegex = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    if (!gstRegex.test(gstValue)) {
      this.gstValidationText = 'Please enter a valid GST Number';
      this.gstValidationStatus = true;
      return true; // GST is invalid
    }

    // Check if GST is blacklisted
    try {
      const resp = await this.commonService.postRequest('checkBlackListed_gst', { custgstin: gstValue }).toPromise();
      if (resp && resp.status === 'success' && resp.status_code === 201) {
        this.gstValidationText = resp.message;
        this.gstValidationStatus = true;
        return true; // GST is blacklisted
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return true; // Indicate that an error occurred
    }

    // GST is not blacklisted
    this.gstValidationText = '';
    this.gstValidationStatus = false;
    return false;
  }
  // TODO: Remove this method if not required in future
  updateOrderValue() {
    setTimeout(() => {
      this.cartService.getRequestWithToken('checkout/update-order-value').subscribe((resp) => {
        if (resp && resp.status === true) {
          // Update Cart Summary total value in local storage 
          let cartSummary = JSON.parse(localStorage.getItem('cart-summary')!);
          cartSummary.total = resp.order_value;
          localStorage.setItem('cart-summary', JSON.stringify(cartSummary));
        }
      })
    }, 1000)
  }

  getBillingDetails() {
    if (localStorage.getItem('billing-details')) {
      return JSON.parse(localStorage.getItem('billing-details')!)
    }
    return false;
  }

  /**
   * Initializes the shipping address form.
   * @returns void
   */
  shippingAddressFormInit() {
    this.shippingForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country_id: ['99', [Validators.required]],
      zone_id: ['', [Validators.required]],
      country: [''],
      country_code: [''],
      zone: [''],
    })

    if (this.shippingForm.value.zip && this.shippingForm.value.zip === 6) {
      this.getDetailsByPin(this.shippingForm.value.zip, 'shipping');
    }
    if (localStorage.getItem('shipping-pin-code')) {
      let pinDetails = this.storageService.getLocalStorageData('shipping-pin-code');
      this.shippingForm.patchValue({
        zip: pinDetails?.pin
      });
      setTimeout(() => {
        this.getDetailsByPin(+pinDetails?.pin, 'shipping');
      }, 1000)
    }
  }

  /**
   * Handles the submission of the shipping form.
   * Sets the `isShippingFormSubmitted` flag to true and submits the form if it's valid.
   * If the user is logged in, sends a PUT request to save the shipping address.
   * If the user is a guest, sends a PUT request to save the guest details.
   * Sets various items in the local storage based on the response status.
   */
  async onShippingFormSubmit() {
    this.isShippingFormSubmitted = true; // Set the isShippingFormSubmitted flag to true.
    const isPinServiceable = await this.checkPin(this.shippingForm.value.zip.toString(), 'shipping');
    if (!isPinServiceable) {
      return;
    }
    if (this.shippingForm.invalid) return; // If the form is invalid, stop the execution of the function.



    this.isShippingLoading = true; // Set the isShippingLoading flag to true.
    if (this.authService.isLoggedIn) {
      this.cartService.putRequest('save-shipping-address', this.shippingForm.value).subscribe((resp: any) => {
        if (resp.status) {
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '0');
          localStorage.setItem('is-payment-editable', '1');
          localStorage.setItem('shipping-details', JSON.stringify(this.shippingForm.value));
          this.fireAddShippingInfoGAEvent(this.cartItemsHolder);
        }
      });
    } else {
      let billing = JSON.parse(localStorage.getItem('billing-details')!);
      let payload = {
        bill_company: "",
        bill_firstname: billing.firstname,
        bill_lastname: billing.lastname,
        bill_email: billing.email,
        bill_phone: billing.phone,
        bill_address1: billing.address1,
        bill_address2: billing.address2,
        bill_city: billing.city,
        bill_zip: billing.zip,
        bill_zone: billing.zone,
        bill_zone_id: billing.zone_id,
        bill_country: billing.country,
        bill_country_code: billing.country_code,
        bill_country_id: billing.country_id,
        ship_company: "",
        ship_firstname: this.shippingForm.value.firstname,
        ship_lastname: this.shippingForm.value.lastname,
        ship_email: this.shippingForm.value.email,
        ship_phone: this.shippingForm.value.phone,
        ship_address1: this.shippingForm.value.address1,
        ship_address2: this.shippingForm.value.address2,
        ship_city: this.shippingForm.value.city,
        ship_zip: this.shippingForm.value.zip,
        ship_zone: this.shippingForm.value.zone,
        ship_zone_id: this.shippingForm.value.zone_id,
        ship_country: this.shippingForm.value.country,
        ship_country_code: this.shippingForm.value.country_code,
        ship_country_id: this.shippingForm.value.country_id,
        address_type: 'shipping',
        guest_order_number: localStorage.getItem('order_number')
      };
      this.cartService.putRequest('save-guest-details', payload).subscribe((resp: any) => {
        if (resp.status) {
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '0');
          localStorage.setItem('is-payment-editable', '1');
          localStorage.setItem('shipping-details', JSON.stringify(this.shippingForm.value));
          this.fireAddShippingInfoGAEvent(this.cartItemsHolder_session);
        }
      });
    }
    this.getPaymentModules();
  }

  getShippingDetails() {
    if (localStorage.getItem('shipping-details')) {
      return JSON.parse(localStorage.getItem('shipping-details')!)
    }
    return false;
  }

  /**
   * Retrieves the payment status from local storage.
   * @returns The payment status as a boolean value.
   */
  getPaymentStatus() {
    if (localStorage.getItem('order-confirm')) {
      return JSON.parse(localStorage.getItem('order-confirm')!)
    }
    return false;
  }

  /**
   * Retrieves the default billing address of the customer and populates the billing form with the address details.
   */
  getCustomerDefaultBillingAddress() {
    this.commonService.getRequestWithToken('get_customer_default_address').subscribe((result) => {
      if (result.status) {
        this.getStates(result.data.default_billing_address.field_data.country_id);
        this.billingForm.patchValue({
          address1: result.data.default_billing_address.field_data.address1,
          address2: result.data.default_billing_address.field_data.address2,
          city: result.data.default_billing_address.field_data.city,
          company: result.data.default_billing_address.field_data.company,
          country: result.data.default_billing_address.field_data.country,
          country_code: result.data.default_billing_address.field_data.country_code,
          country_id: result.data.default_billing_address.field_data.country_id,
          email: result.data.default_billing_address.field_data.email,
          firstname: result.data.default_billing_address.field_data.firstname,
          lastname: result.data.default_billing_address.field_data.lastname,
          phone: result.data.default_billing_address.field_data.phone,
          zip: result.data.default_billing_address.field_data.zip,
          zone: result.data.default_billing_address.field_data.zone,
          zone_id: result.data.default_billing_address.field_data.zone_id,
        })
      } else {
        // this.messageService.add({ severity: 'error', detail: result.message });
        console.warn(result.message);
      }
    }, () => {
      this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
    });
  }

  onClickContinueShipping() {
    // Check the checkbox is checked for ship to billing address or not
    if (this.isShipToBilling) {
      // If the checkbox is checked then save the billing address as shipping address
      if (this.authService.isLoggedIn) {
        this.shippingDetails = this.billingForm.value;
        this.cartService.putRequest('save-shipping-address', this.billingForm.value).subscribe((resp: any) => {
          if (resp.status === true) {
            localStorage.setItem('is-billing-editable', '0');
            localStorage.setItem('is-shipping-editable', '0');
            localStorage.setItem('is-payment-editable', '1');
            localStorage.setItem('shipping-details', JSON.stringify(this.billingForm.value));
            this.fireAddShippingInfoGAEvent(this.cartItemsHolder);
          } else {
            this.messageService.add({ severity: 'error', detail: resp.message });
          }
        }, () => {
          this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
        });
      } else {
        this.shippingDetails = this.getBillingDetails();

        this.fireAddShippingInfoGAEvent(this.cartItemsHolder_session);
        let billing = JSON.parse(localStorage.getItem('billing-details')!);

        let formData = {
          bill_company: "",
          bill_firstname: billing.firstname,
          bill_lastname: billing.lastname,
          bill_email: billing.email,
          bill_phone: billing.phone,
          bill_address1: billing.address1,
          bill_address2: billing.address2,
          bill_city: billing.city,
          bill_zip: billing.zip,
          bill_zone: billing.zone,
          bill_zone_id: billing.zone_id,
          bill_country: billing.country,
          bill_country_code: billing.country_code,
          bill_country_id: billing.country_id,
          ship_company: "",
          ship_firstname: this.shippingDetails.firstname,
          ship_lastname: this.shippingDetails.lastname,
          ship_email: this.shippingDetails.email,
          ship_phone: this.shippingDetails.phone,
          ship_address1: this.shippingDetails.address1,
          ship_address2: this.shippingDetails.address2,
          ship_city: this.shippingDetails.city,
          ship_zip: this.shippingDetails.zip,
          ship_zone: this.shippingDetails.zone,
          ship_zone_id: this.shippingDetails.zone_id,
          ship_country: this.shippingDetails.country,
          ship_country_code: this.shippingDetails.country_code,
          ship_country_id: this.shippingDetails.country_id,
          address_type: 'shipping',
          guest_order_number: localStorage.getItem('order_number')
        };
        this.cartService.putRequest('save-guest-details', formData).subscribe((resp: any) => {
          if (resp.status === true) {
            localStorage.setItem('is-billing-editable', '0');
            localStorage.setItem('is-shipping-editable', '0');
            localStorage.setItem('is-payment-editable', '1');
            localStorage.setItem('shipping-details', JSON.stringify(this.getBillingDetails()));
          } else {
            this.messageService.add({ severity: 'error', detail: resp.message });
          }
        }, () => {
          this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
        });
      }
    } else if (this.isShipToNearestStore) {
      // Handle Ship to Nearest Store After checked the checkbox is checked
      if (localStorage.getItem('selected-pickup-store')) {
        if (this.authService.isLoggedIn) {
          let payload = {
            address_type: 'billing',
            product_ids: [],
            store_id: this.getNearestStoreAddress()?.store_id,
          };
          this.cartService.putRequest('ship-to-store', payload).subscribe((resp) => {
            if (resp.status) {
              localStorage.setItem('is-billing-editable', '0');
              localStorage.setItem('is-shipping-editable', '0');
              localStorage.setItem('is-payment-editable', '1');
              this.fireAddPickupFromStoreInfoGAEvent(this.cartItemsHolder);
            } else {
              this.messageService.add({ severity: 'error', detail: resp.message });
            }
          }, () => {
            this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
          })
        } else {

          let billing = JSON.parse(localStorage.getItem('billing-details')!);
          let payload = {
            bill_company: "",
            bill_firstname: billing.firstname,
            bill_lastname: billing.lastname,
            bill_email: billing.email,
            bill_phone: billing.phone,
            bill_address1: billing.address1,
            bill_address2: billing.address2,
            bill_city: billing.city,
            bill_zip: billing.zip,
            bill_zone: billing.zone,
            bill_zone_id: billing.zone_id,
            bill_country: billing.country,
            bill_country_code: billing.country_code,
            bill_country_id: billing.country_id,
            store_id: this.getNearestStoreAddress()?.store_id,
            address_type: "pickup-from-store",
            guest_order_number: localStorage.getItem('order_number')
          };
          this.cartService.putRequest('save-guest-details?save-pickup-store=true', payload).subscribe((resp: any) => {
            if (resp.status) {
              localStorage.setItem('is-billing-editable', '0');
              localStorage.setItem('is-shipping-editable', '0');
              localStorage.setItem('is-payment-editable', '1');
              this.fireAddPickupFromStoreInfoGAEvent(this.cartItemsHolder_session);
            } else {
              this.messageService.add({ severity: 'error', detail: resp.message });
            }
          }, () => {
            this.messageService.add({ severity: 'error', detail: 'Oops! Something went wrong.' });
          })
        }
      }
    }
    this.getPaymentModules();
  }

  findNearestStores(event: any) {
    console.log('Event : ', event.value);
    this.isFetchingNearestStores = true;
    this.searchTerms.next(event.value);
  }

  onClearCityDropdown() {
    this.storeHolder = [];
    this.isSearchTerm = false;
    this.isFetchingNearestStores = false;
    localStorage.removeItem('search-term');
    localStorage.removeItem('selected-pickup-store');
  }

  onSelectedNearestStore(store: any) {
    this.selectedStoreId = store.store_id;
    let selectedStoreData = {
      store_id: store.store_id,
      zip: store.pin_code,
      address: store.store_address,
      searchTerm: localStorage.getItem('search-term'),
      isShipToNearestStore: true
    };
    localStorage.setItem('selected-pickup-store', JSON.stringify(selectedStoreData));
  }

  getNearestStoreAddress() {
    if (localStorage.getItem('selected-pickup-store')) {
      this.isShipToBilling = false;
      return JSON.parse(localStorage.getItem('selected-pickup-store')!);
    }
    return
  }

  clickOnShipBack() {
    localStorage.setItem('is-billing-editable', '1');
    localStorage.setItem('is-shipping-editable', '0');
    localStorage.setItem('is-payment-editable', '0');
  }

  editBill() {
    localStorage.setItem('is-billing-editable', '1');
    localStorage.setItem('is-shipping-editable', '0');
    localStorage.setItem('is-payment-editable', '0');
  }

  isBillingEditable() {
    if (localStorage.getItem('is-billing-editable')) {
      return +localStorage.getItem('is-billing-editable')!;
    }
    return true;
  }

  editShip() {
    if (localStorage.getItem('selected-pickup-store')) {
      this.isShipToBilling = false;
      this.isShipToNearestStore = true;
      let payload = {
        city: localStorage.getItem('search-term')
      };

      this.isFetchingNearestStores = true;
      this.commonService.postRequest('get_store_by_city ', payload).subscribe((result) => {
        this.isFetchingNearestStores = false;
        this.storeHolder = [];
        if (result.status) {
          this.storeHolder = result.data
        } else {
          this.storeHolder = [];
        }
      });
    }
    localStorage.setItem('is-billing-editable', '0');
    localStorage.setItem('is-shipping-editable', '1');
    localStorage.setItem('is-payment-editable', '0');
  }

  isShippingEditable() {
    if (localStorage.getItem('is-shipping-editable')) {
      return +localStorage.getItem('is-shipping-editable')!;
    }
    return true;
  }

  isPaymentEditable() {
    return !!+localStorage.getItem('is-payment-editable')!;
  }

  shipToBilling() {
    this.storeHolder = [];
    localStorage.removeItem('selected-pickup-store');
    this.isShipToBilling = true;
    this.isShipToNearestStore = false;
    this.isShipToNewAddress = false;
    this.getStates(this.getBillingDetails()?.country_id);
  }

  shipToNearestStore() {
    this.storeHolder = [];
    localStorage.removeItem('shipping-details');
    localStorage.removeItem('search-term');
    this.isShipToBilling = false;
    this.isShipToNearestStore = true;
    this.isShipToNewAddress = false;
  }

  // Payment Start
  shipToNewAddress() {
    this.stateHolder = [];
    this.getStates(99);
    localStorage.removeItem('selected-pickup-store');
    this.isShipToBilling = false;
    this.isShipToNearestStore = false;
    this.isShipToNewAddress = true;
    this.shippingAddressFormInit();
    if (this.authService.isLoggedIn) {
      this.commonService.getRequestWithToken('get_customer_default_address').subscribe((result) => {
        if (result.status) {
          this.getStates(result.data.default_shipping_address.field_data.country_id);
          this.shippingForm.patchValue({
            address1: result.data.default_shipping_address.field_data.address1,
            address2: result.data.default_shipping_address.field_data.address2,
            city: result.data.default_shipping_address.field_data.city,
            company: result.data.default_shipping_address.field_data.company,
            country: result.data.default_shipping_address.field_data.country,
            country_code: result.data.default_shipping_address.field_data.country_code,
            country_id: result.data.default_shipping_address.field_data.country_id,
            email: result.data.default_shipping_address.field_data.email,
            firstname: result.data.default_shipping_address.field_data.firstname,
            lastname: result.data.default_shipping_address.field_data.lastname,
            phone: result.data.default_shipping_address.field_data.phone,
            zip: result.data.default_shipping_address.field_data.zip,
            zone: result.data.default_shipping_address.field_data.zone,
            zone_id: result.data.default_shipping_address.field_data.zone_id,
          })
        }
      })
    }
  }

  /**
   * @desc Get All Payment Modules and Store in Payment Module Holder
   * @return void
   * */
  getPaymentModules(): void {
    let pin: number | undefined;
    if (this.isShipToBilling) {
      pin = this.getBillingDetails()?.zip;
    } else if (this.isShipToNewAddress) {
      pin = this.shippingForm.get('zip')?.value;
    } else if (this.isShipToNearestStore) {
      pin = JSON.parse(localStorage.getItem('selected-pickup-store')!)?.zip;
    } else {
      pin = this.getShippingDetails()?.zip;
    }

    if (pin) {
      this.paymentService.getPaymentModules(pin).subscribe((result) => {
        if (result.status) {
          this.paymentModuleHolder = result.data;
          // fill isPaymentProcessing array with false values
          this.isPaymentProcessing = Array(this.paymentModuleHolder.length).fill(false);
        }
      });
    } else {
      console.log('Pin code is not defined');
    }
  }

  /**
   * Proceeds to payment with the provided payment details.
   * 
   * @param paymentDetails - The payment details.
   * @param i - The index.
   */
  proceedToPayment(paymentDetails: PaymentDetails, i: number) {
    let payload = {
      guest_order_number: localStorage.getItem('order_number'),
      ...paymentDetails
    };
    console.log('Payment Details : ', payload);

    if (payload.pg_name === 'cod') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to place the order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Place Order',
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.isPaymentProcessing[i] = true;
          this.paymentService.processPayment(payload).subscribe((resp) => {
            this.isPaymentProcessing[i] = false;
            if (resp && resp.status === true) {
              if (resp && resp.order_summary && resp.order_summary.payment_info) {
                localStorage.setItem('is-billing-editable', '0');
                localStorage.setItem('is-shipping-editable', '0');
                localStorage.setItem('is-payment-editable', '0');
                localStorage.setItem('order-confirm', JSON.stringify(resp.order_summary));
                if (resp?.order_summary?.payment_info === 'cod') {
                  this.emptyCartItems();
                  this.router.navigate(['/checkout/place-order'], { queryParams: { order_number: resp.order_summary.order_number } });
                }
              }

              // if (resp.data?.payment_link) {
              //   window.open(resp.data.payment_link, '_self');
              //   this.showBrowser(resp.data.payment_link);
              // }

              if (resp.data?.payment_link) {
                if (this.platform.ANDROID) {
                  // If the device is Android
                  this.showBrowser(resp.data.payment_link);
                } else {
                  // If it's a browser
                  window.open(resp.data.payment_link, '_self');
                }
              }

            }
          });
          this.fireGA4EventOnChoosePayment(paymentDetails);
        }
      });
    } else {
      this.isPaymentProcessing[i] = true;
      this.paymentService.processPayment(payload).pipe(finalize(() => {
        this.isPaymentProcessing[i] = false;
      })).subscribe((resp) => {
        if (resp && resp.status === true) {
          if (resp && resp.order_summary && resp.order_summary.payment_info) {
            localStorage.setItem('is-billing-editable', '0');
            localStorage.setItem('is-shipping-editable', '0');
            localStorage.setItem('is-payment-editable', '0');
            localStorage.setItem('order-confirm', JSON.stringify(resp.order_summary));
            if (resp?.order_summary?.payment_info === 'cod') {
              this.emptyCartItems();
              this.router.navigate(['/checkout/place-order'], { queryParams: { order_number: resp.order_summary.order_number } });
            }
          }

          // if (resp.data?.payment_link) {
          //   window.open(resp.data.payment_link, '_self');
          //   this.showBrowser(resp.data.payment_link);
          // }

          if (resp.data?.payment_link) {
            if (this.platform.ANDROID) {
              // If the device is Android
              this.showBrowser(resp.data.payment_link);
            } else {
              // If it's a browser
              window.open(resp.data.payment_link, '_self');
            }
          }


          // For Billdesk payment gateway only
          if (resp?.pg === 'billdesk') {
            this.isPaymentProcessing[i] = false;
            const config = {
              responseHandler: (txn: any) => {
                if (txn.response) {
                  console.log("Callback received status: " + txn.status);
                  console.log("Callback received response: " + txn.response);
                }
              },
              merchantLogo: "https://s3.ap-south-1.amazonaws.com/shop.unicorn/logo/client_logo.png",
              flowConfig: resp?.data,
              flowType: "payments"
            };
            (window as any).loadBillDeskSdk(config)
          }
        } else {
          this.messageService.add({ severity: 'info', detail: resp.message });
        }
      });
      this.fireGA4EventOnChoosePayment(paymentDetails);
    }
  }

  showBrowser(url: string) {
    const target = '_blank';

    if (cordova && cordova.InAppBrowser) {
      const browser = cordova.InAppBrowser.open(url, target, 'location=no');

      browser.addEventListener('loadstart', (event: any) => {
        const paymentStatus = new URL(event.url).searchParams.get('payment_status');
        const orderNumber = new URL(event.url).searchParams.get('order_number');
        const txnFailCode = new URL(event.url).searchParams.get('txn_fail_code');

        // Handle Success Payment Status
        if (paymentStatus === 'true') {
          this.emptyCartItems();  // Same logic as in Angular for emptying the cart
          // Navigate to the success page or handle the next step in the payment process
          this.router.navigate(['/checkout/place-order'], { queryParams: { order_number: orderNumber } });
          browser.close();  // Close the InAppBrowser
        }

        // Handle Failure and Cancel Payment Status
        if (paymentStatus === 'false') {
          localStorage.setItem('is-billing-editable', '1');
          localStorage.setItem('is-shipping-editable', '0');
          localStorage.removeItem('shipping-details');
          localStorage.setItem('is-payment-editable', '0');

          this.paymentFailedHolder = {
            show_msg: true,
            payment_failure_type: 'code',  // or 'message'
            payment_failure_code: txnFailCode ? txnFailCode : '',  // Retrieve the transaction failure code from the URL
            order_number: orderNumber ? orderNumber : '',  // Retrieve the order number from the URL
          };
          // Navigate to the failure or cancel page
          this.cd.detectChanges();
          browser.close();  // Close the InAppBrowser
        }
      });

      browser.addEventListener('exit', () => {
        // Handle the case when the browser is closed without completing the payment
        this.cd.detectChanges();
        console.log('Payment process was exited prematurely.');
      });
    } else {
      console.error('InAppBrowser plugin is not available or not initialized.');
    }
  }


  openPaymentGateway(url: string) {
    const target = "_blank"; // Use _blank to open in InAppBrowser
    const options = "location=yes,toolbar=yes,hidden=no"; // Show toolbar and location

    const browser = cordova.InAppBrowser.open(url, target, options);

    // Optional event listeners
    browser.addEventListener('loadstart', (event: any) => {
      console.log('Loading started: ' + event.url);
    });

    browser.addEventListener('loadstop', () => {
      console.log('Loading finished');
    });

    browser.addEventListener('exit', () => {
      console.log('Browser closed');
    });
  }


  fireGA4EventOnChoosePayment(paymentDetails: PaymentDetails) {
    let items: any[] = [];
    let totalValue = 0;
    let couponCode = '';
    if (this.authService.isLoggedIn) {
      totalValue = 0;
      this.cartItemsHolder.forEach((item: any) => {
        totalValue += item.saleprice * item.item_quantity;
        couponCode = item?.coupon_code;
        items.push({
          item_id: item.sku,
          item_name: item.name,
          item_price: item.saleprice,
          item_quantity: item.item_quantity,
          item_variant: item.name,
          coupon: item?.coupon_code,
          discount: item?.discount,
        });
      });
    } else {
      if (this.cartItemsHolder_session.length > 0) {
        totalValue = 0;
        this.cartItemsHolder_session.forEach((item: any) => {
          totalValue += item.saleprice * item.item_quantity;
          couponCode = item?.coupon_code;
          items.push({
            item_id: item.sku,
            item_name: item.name,
            item_price: item.saleprice,
            quantity: item.item_quantity,
            item_variant: item.name,
            coupon: item?.coupon_code,
            discount: item?.discount,
          });
        });
      }
    }

    // // this.dataLayerService.push({ ecommerce: null });
    this.dataLayerService.push({
      event: "add_payment_info",
      ecommerce: {
        currency: "INR",
        payment_type: paymentDetails?.pg_name || 'PineLabs',
        value: totalValue,
        coupon: couponCode,
        items: items
      }
    });
  }

  retryPayment() {
    if (this.paymentLink) {
      window.open(this.paymentLink, '_self');
    }
  }

  getDetailsByPin(pin: number, form: string = 'billing') {

    const payload = {
      pincode: pin
    };
    if (pin.toString().length === 6) {
      this.commonService.postRequest(`getDetails_by_pincode`, payload).subscribe((result) => {
        if (result && result.length > 0 && this.stateHolder && this.stateHolder.length > 0) {
          const stateId = this.stateHolder.find((item) => item.name.toLowerCase() === result[0].statename.toLowerCase())?.id;
          // Set Division Name and State Name in respective form control
          setTimeout(() => {
            if (form === 'billing') {
              this.billingForm.patchValue({
                city: result[0].divisionname,
                zone_id: stateId
              });
            }
            if (form === 'shipping') {
              this.shippingForm.patchValue({
                city: result[0].divisionname,
                zone_id: stateId
              });
            }
          }, 500);
        }
      });
      this.checkPin(pin.toString(), form);
    }
  }

  getCountry() {
    // this.commonService.getData('master_country').subscribe((result) => {
    this.dummyService.getMasterCountryList().subscribe((result) => {
      this.countryHolder = result.data;
      this.getStates(99);
    })
  }

  onChangeCountry(event: any) {
    this.getStates(event.target.value);
    if (event.target.options[event.target.options.selectedIndex].text) {
      this.billingForm.patchValue({
        country: event.target.options[event.target.options.selectedIndex].text
      });
    }
    this.countryHolder.find((item) => {
      if (+item.id === +event.target.value) {
        this.billingForm.patchValue({
          country_code: item.iso_code_2
        });
      }
    })
  }

  onChangeState(event: any) {
    this.billingForm.patchValue({
      zone: event.target.options[event.target.options.selectedIndex].text
    });
  }

  getStates(id: number) {
    this.commonService.getData(`master_state/${id}`).subscribe((result) => {
      this.stateHolder = result.data;
    })
  }

  nearestStoreTrackBy(index: number, item: any) {
    return item.store_id;
  }

  trackBy(index: number, item: any): number {
    return item.id;
  }

  /**
   * Retrieves the cart items summary from the server and stores it in the local storage.
   */
  getCartItemsSummary(): void {
    this.cartService.getRequestWithToken('view_cart').subscribe((result) => {
      if (result.status === true && result.cart_summary) {
        const { subtotal, gst_percent, total, status, coupon_discount, customer_id } = result.cart_summary;
        this.cartSummaryHolder = { subtotal, gst_percent, total, status, coupon_discount, customer_id };
        localStorage.setItem('cart-summary', JSON.stringify(this.cartSummaryHolder));
      } else {
        localStorage.removeItem('cart-summary');
      }
    });
  }

  getTotalItemCart() {
    // this.router.navigate(['/']);
  }

  getCartItems(isSidebarOpen: boolean = false) {
    // TODO check Guest or Logged In User
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;
      this.cartSubscription = this.cartService.getAllCartItems().subscribe((result) => {
        this.cartItemsHolder = [];
        if (result && result.status && result.cart_items.length > 0) {
          this.cartItemsHolder = result.cart_items;
          this.cart_summary = result.cart_summary;
          // let cartHolderArray: any[] = [];
          // if (this.cartItemsHolder.length > 0) {
          //   this.cartItemsHolder.forEach((item) => {
          //     cartHolderArray.push({
          //       item_id: item.sku,
          //       item_name: item.name,
          //       item_price: item.price,
          //       item_quantity: item.item_quantity,
          //       item_variant: item.name,
          //       index: cartHolderArray.length - 1,
          //     })
          //   });
          // }

          if (result.status && result.cart_summary) {
            const { subtotal, gst_percent, total, status, coupon_discount, customer_id } = result.cart_summary;
            this.cartSummaryHolder = { subtotal, gst_percent, total, status, coupon_discount, customer_id };
            this.storageService.setLocalStorageData('cart-summary', this.cartSummaryHolder);
            // localStorage.setItem('cart-summary', JSON.stringify(this.cartSummaryHolder));
          } else {
            localStorage.removeItem('cart-summary');
          }
          // if (!localStorage.getItem('coupon-details')) {
          //   this.getCartItemsSummary();
          // }
          if (!isSidebarOpen) {
            this.fireGA4EventOnBeginCheckout(this.cartItemsHolder); // Handle Begin Checkout google analytics 4
          }
        } else {
          this.cartItemsHolder = [];
          localStorage.removeItem('cart-summary');
          // this.router.navigate(['/']); // Redirect to Home Page if no cart items found in the cart
        }
      });
    } else {
      this.cartItemsHolder_session = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
      this.cartItemsHolder_session.forEach((item, index) => {
        if (item.item_quantity < 1 && +item.bundle === 0) {
          this.cartItemsHolder_session[index].item_quantity = 1;
        }
        if (+item.bundle === 1 || +item.bundle === 2) {
          this.cartItemsHolder_session[index].item_quantity = 1;
        }
        sessionStorage.setItem('guest-cart-items', JSON.stringify(this.cartItemsHolder_session));
      });
      if (this.cartItemsHolder_session.length > 0) {
        this.cartItemsHolder = this.cartItemsHolder_session;
        if (!isSidebarOpen) {
          this.fireGA4EventOnBeginCheckout(this.cartItemsHolder);
        }
        sessionStorage.setItem('total-cart-items', String(this.cartItemsHolder.length));
        let total = 0;
        this.cartItemsHolder.forEach((item, index) => {
          if (item.item_quantity < 1) {
            this.cartItemsHolder[index].item_quantity = 1;
            sessionStorage.setItem('guest-cart-items', JSON.stringify(this.cartItemsHolder));
          }

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
          // total += (item.saleprice * item.item_quantity);
        });
        let cartSummaryHolder = { total: total };
        // localStorage.setItem('cart-summary', JSON.stringify(cartSummaryHolder));
        this.storageService.setLocalStorageData('cart-summary', cartSummaryHolder);
      } else {
        // this.router.navigate(['/']);
      }
    }
  }



  isCouponApplied() {
    if (localStorage.getItem('coupon-details')) {
      return JSON.parse(localStorage.getItem('coupon-details')!);
    }
  }

  /**
   * Handles the begin checkout event for Google Analytics 4.
   *
   * @param cartHolderArray - An array containing cart items.
   */
  fireGA4EventOnBeginCheckout(cartHolderArray: any) {
    let items: any[] = [];
    let totalValue = 0;
    let couponCode = '';
    cartHolderArray.forEach((item: any) => {
      totalValue += item.saleprice * item.item_quantity;
      couponCode = item?.coupon_code;
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_price: item.saleprice, // TODO: item.saleprice * item.item_quantity
        item_quantity: item.item_quantity,
        item_variant: item.name,
        coupon: item?.coupon_code || '',
        discount: item?.coupon_discount || 0,
      });
    });
    // // this.dataLayerService.push({ ecommerce: null });
    this.dataLayerService.push({
      event: "begin_checkout",
      ecommerce: {
        value: totalValue,
        coupon: couponCode || '',
        currency: "INR",
        items: items
      }
    });
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: ['', [Validators.required]],
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

// Payment Detials Model Class Start Here //
export class PaymentDetails implements IPaymentDetails {
  p_id: number;
  pg_name: string;
  c_id: number;
  client_name: string;

  constructor(p_id: number, pg_name: string, c_id: number, client_name: string) {
    this.p_id = p_id;
    this.pg_name = pg_name;
    this.c_id = c_id;
    this.client_name = client_name;
  }

  getPaymentDetails() {
    return {
      p_id: this.p_id,
      pg_name: this.pg_name,
      c_id: this.c_id,
      client_name: this.client_name
    }
  }

  setPaymentDetails(paymentDetails: {
    "p_id": number,
    "pg_name": string,
    "c_id": number,
    "client_name": string
  }) {
    this.p_id = paymentDetails.p_id;
    this.pg_name = paymentDetails.pg_name;
    this.c_id = paymentDetails.c_id;
    this.client_name = paymentDetails.client_name;
  }

  getPaymentDetailsObject() {
    return {
      p_id: this.p_id,
      pg_name: this.pg_name,
      c_id: this.c_id,
      client_name: this.client_name
    }
  }

  setPaymentDetailsObject(paymentDetails: PaymentDetails) {
    this.p_id = paymentDetails.p_id;
    this.pg_name = paymentDetails.pg_name;
    this.c_id = paymentDetails.c_id;
    this.client_name = paymentDetails.client_name;
  }

  getPaymentDetailsJson() {
    return JSON.stringify({
      p_id: this.p_id,
      pg_name: this.pg_name,
      c_id: this.c_id,
      client_name: this.client_name
    });
  }

  setPaymentDetailsJson(paymentDetails: string) {
    let paymentDetailsObject = JSON.parse(paymentDetails);
    this.p_id = paymentDetailsObject.p_id;
    this.pg_name = paymentDetailsObject.pg_name;
    this.c_id = paymentDetailsObject.c_id;
    this.client_name = paymentDetailsObject.client_name;
  }

  getPaymentDetailsString() {
    return `${this.p_id},${this.pg_name},${this.c_id},${this.client_name}`;
  }

  setPaymentDetailsString(paymentDetails: string) {
    let paymentDetailsArray = paymentDetails.split(',');
    this.p_id = +paymentDetailsArray[0];
    this.pg_name = paymentDetailsArray[1];
    this.c_id = +paymentDetailsArray[2];
    this.client_name = paymentDetailsArray[3];
  }

  getPaymentDetailsArray() {
    return [this.p_id, this.pg_name, this.c_id, this.client_name];
  }

  setPaymentDetailsArray(paymentDetails: any[]) {
    this.p_id = paymentDetails[0];
    this.pg_name = paymentDetails[1];
    this.c_id = paymentDetails[2];
    this.client_name = paymentDetails[3];
  }
}

// Payment Details Interface Start Here
export interface IPaymentDetails {
  p_id: number;
  pg_name: string;
  c_id: number;
  client_name: string;
}

export class PaymentModules implements IPaymentModuels {
  p_id: number;
  pg_name: string;
  c_id: number;
  client_name: string;

  constructor(p_id: number, pg_name: string, c_id: number, client_name: string) {
    this.p_id = p_id;
    this.pg_name = pg_name;
    this.c_id = c_id;
    this.client_name = client_name;
  }

  getPaymentModules() {
    return {
      p_id: this.p_id,
      pg_name: this.pg_name,
      c_id: this.c_id,
      client_name: this.client_name
    }
  }
}

// Payment Modules Interface Start Here //
export interface IPaymentModuels {
  p_id: number;
  pg_name: string;
  c_id: number;
  client_name: string;
}

