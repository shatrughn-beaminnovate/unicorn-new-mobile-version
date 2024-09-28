import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddressFormComponent } from "./address-form/address-form.component";
import { CommonService } from "../../core/services/common.service";
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { MustMatch } from "../../core/helper/must-match-validators";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../../core/shared/confirm-dialog/confirm-dialog.component";
import { AlertService } from "../../core/shared/alert";
import { Router } from "@angular/router";
import { CartService } from 'src/app/core/services/cart.service';
import { environment } from "../../../environments/environment";
import Swal from "sweetalert2";
import { MessageService } from "primeng/api";
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Title } from '@angular/platform-browser';
import { PaymentService } from 'src/app/core/services/payment.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { PaymentDetails } from '../checkout/checkout.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})


export class AccountComponent implements OnInit {
  imgUrl = environment.imgUrl;
  frontImgUrl = environment.apiUrl;
  isLoading = false;
  isFormSubmitted = false;
  customer!: any;
  customerForm!: FormGroup;
  customerAddress: ICustomerAddress[] = [];
  wishlistHolder: any[] = [];
  btsWishlistHolder: any = {};
  profilePicFile!: File;
  isReviewModalShow = false;
  rating!: number | null;
  ngxStarRatingId = 0;
  orderHistoryHolder: any[] = [];
  defaultPaginateEvent!: { first: number, rows: number, sortField: string | undefined, sortOrder: number | undefined };
  sortOptions!: any[];
  sortKey!: string;
  sortField!: string;
  sortOrder!: number;
  totalRecords!: number;
  filterOderHistory: any[] = [];
  isProductActiveForReview: number = 0;
  orderId!: number | null;
  productId!: number | null;
  reviewText!: string;
  reviewImage: string[] = [];
  productImage!: File;
  isProfilePicShow = true;
  ratingId!: any;
  selectedImageUrl!: string;

  deliveryAssociate = false;
  packaging = false;
  others = false;
  isPoliteBehavior = false;
  isSturdyPackaging = false;
  isRecyclingPackaging = false;
  isAppropriatePackaging = false;
  loginSubmitted: boolean = false;
  wishlistHolderBts: any;

  isBTSWishlistProductAddedToCart: boolean = false;
  prebookProductsHolder!: any;
  paymentModuleHolder: any[] = [];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private cartService: CartService,
    private messageService: MessageService,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {
    if (!localStorage.getItem('customer_data') && !localStorage.getItem('customer_token')) {
      this.router.navigate(['/login']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  get profilePic() {
    return this.customer;
  }

  ngOnInit(): void {
    this.titleService.setTitle('My Account | Unicornstore');
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.getCustomerDetails();
    this.getCustomerAddress();
    this.getWishlist();
    // this.guestCartAndCartMerge();
    const options: AbstractControlOptions = {
      validators: MustMatch('password', 'confirm_psw')
    };
    this.customerForm = this.fb.group({
      id: [null],
      firstname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      email_subscribe: [true],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [''],
      confirm_psw: [''],
      default_billing_address: ['0'],
      default_shipping_address: ['0'],
      ship_to_bill_address: [true],
      company: [''],
      gst: ['', [Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      gender: ['Male', [Validators.required]],
    }, options);

    this.getPrebookedOrders();


  }

  /**
   * @desc Get All Payment Modules and Store in Payment Module Holder
   * @return void
   * */
  getPaymentModules(pin: number): void {
    this.paymentService.getPaymentModules(pin).subscribe((result) => {
      if (result.status) {
        this.paymentModuleHolder = result.data;
      }
    });
  }


  // Proceed to Payment Start Here
  proceedToPayment(paymentDetails: PaymentDetails) {
    let payload = {
      guest_order_number: localStorage.getItem('order_number'),
      ...paymentDetails,
      prebook: true
    };
    this.paymentService.processPayment(payload).subscribe((resp) => {
      if (resp && resp.status === true) {
        if (resp && resp.order_summary && resp.order_summary.payment_info) {
          localStorage.setItem('is-billing-editable', '0');
          localStorage.setItem('is-shipping-editable', '0');
          localStorage.setItem('is-payment-editable', '0');
          localStorage.setItem('order-confirm', JSON.stringify(resp.order_summary));
          if (resp?.order_summary?.payment_info === 'cod') {
            // this.emptyCartItems();
            this.router.navigate(['/checkout/place-order'], { queryParams: { order_number: resp.order_summary.order_number } });
          }
        }
        if (resp.data?.payment_link) {
          window.open(resp.data.payment_link, '_self');
        }
      }
    });
  }

  getPrebookedOrders() {
    this.commonService.getRequestWithToken('get_prebook_product').subscribe((response) => {
      if (response.status === 'success') {
        this.prebookProductsHolder = response.data;
        this.getPaymentModules(response.data.ship_zip);
      } else {
        this.prebookProductsHolder = null;
      }
    });
  }

  /**
     * Empties the cart items for the logged in user or guest user.
     * If the user is logged in, the cart items are emptied from the server and local storage.
     * If the user is a guest, the cart items are emptied from the session storage.
     */
  // emptyCartItems() {
  //   // Remove Local Storage Items
  //   localStorage.removeItem('is-billing-editable'); // Remove Billing Editable
  //   localStorage.removeItem('is-shipping-editable'); // Remove Shipping Editable
  //   localStorage.removeItem('is-payment-editable'); // Remove Payment Editable
  //   localStorage.removeItem('order_number'); // Remove Order Number
  //   localStorage.removeItem('coupon-details'); // Remove Coupon Details
  //   localStorage.removeItem('pin-code'); // Remove Pin Code
  //   localStorage.removeItem('billing-details'); // Remove Billing Details
  //   localStorage.removeItem('shipping-details'); // Remove Shipping Details
  //   localStorage.removeItem('cart-summary'); // Remove Cart Summary

  //   // Remove Cart Items from Session Storage
  //   sessionStorage.removeItem('total-cart-items'); // Remove Total Cart Items
  //   sessionStorage.removeItem('guest-cart-items'); // Remove Guest Cart Items
  //   if (this.authService.isLoggedIn) {
  //     this.cartService.emptyCart().subscribe((resp) => {
  //       this.cartService.cartChangeDetectionSubject.next(true);
  //       if (resp.status) {
  //         this.getCartItems();
  //       }
  //     })
  //   } else {
  //     this.cartService.cartItemsCountHolder.next(0);
  //   }
  // }



  // guestCartAndCartMerge(){
  //   let guestCartItems = JSON.parse(localStorage.getItem('guest_cart_items') || '[]');
  //   if (guestCartItems) {
  //     this.commonService.getRequestWithToken(`merge_cart?guest_cart_id=${localStorage.getItem('guest_cart_id')}`).subscribe((resp) => {
  //       // console.log('Merge Cart Resp : ', resp);
  //       if (resp.status) {
  //         localStorage.removeItem('guest_cart_id');
  //         this.cartService.cartChangeDetectionSubject.next(true);
  //       }
  //     })
  //   }
  // }

  loadData(event: any) {
    this.defaultPaginateEvent = event;
    let convertedEvent: any = {
      limit_per_page: event.rows,
      order_by: event.sortField,
      skip: event.first,
      sort: event.sortOrder,
      filter_text: ""
    };

    this.commonService.postRequestWithToken('get_order_history', convertedEvent).subscribe((result) => {
      console.log('get_order_history_data : ', result);
      if (result.status) {
        this.orderHistoryHolder = result.data;
        this.totalRecords = result.total_count;
      }
      console.log('orderHistoryHolder : ', this.orderHistoryHolder);
    });

  }

  handleChange(e: any) {
    var index = e.index;
    console.log('Tab Index : ', index);
    // if (+index === 3) {
    //   this.loadData({
    //     limit_per_page: 10,
    //     skip: 0,
    //     filter_text: ""
    //   });
    // }
  }

  onProfilePicSelected(event: any) {
    // console.log('File : ', event.target.files);
    this.profilePicFile = event.target.files[0];
    let fileSize = Math.round(this.profilePicFile.size / 1024);
    if (fileSize <= 2000) {
      // console.log('You Can Upload : ', this.profilePicFile.name, fileSize + 'KB');
    } else {
      // console.log('You Can not Upload : ', this.profilePicFile.name, fileSize + 'KB');
      Swal.fire({
        title: 'Error!',
        text: `File Size to Large`,
        icon: 'error',
        confirmButtonText: 'Got it'
      });
    }
  }

  uploadProfilePic() {
    if (this.profilePicFile) {
      let fd = new FormData();
      fd.append('image', this.profilePicFile, this.profilePicFile.name);
      this.commonService.postRequestWithToken('upload_profile_image', fd).subscribe((resp) => {
        // console.log('Upload Resp : ', resp);
        if (resp.status) {
          Swal.fire({
            title: 'Success',
            text: `${resp.message}`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.isProfilePicShow = true;
            this.getCustomerDetails();
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: `${resp.message}`,
            icon: 'error',
            confirmButtonText: 'Got it'
          });
        }
      })
    }
  }

  removeProfilePic() {
    this.commonService.postRequestWithToken('upload_profile_image', { remove_image: true }).subscribe((resp) => {
      // console.log('Upload Resp : ', resp);
      if (resp.status) {
        this.onSuccess('Deleted Successfully');
        this.getCustomerDetails();
      } else {
        Swal.fire({
          title: 'Error!',
          text: `${resp.message}`,
          icon: 'error',
          confirmButtonText: 'Got it'
        });
      }
    })
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.customerForm.invalid) return;
    let formData = {
      ...this.customerForm.value,
      email_subscribe: (this.customerForm.value.email_subscribe) ? 1 : 0
    };
    delete formData.confirm_psw;
    // console.log('Form Data : ', formData);
    this.isLoading = true;
    this.commonService.postRequestWithToken('update_account_info', formData).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe((resp) => {
      // console.log('Account Info Updated : ', resp);
      if (resp.data) {
        this.alertService.success('Account Info Updated Successfully');
        this.getCustomerDetails();
      }
    })
  }

  createAddress() {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('Address Add dialog was closed', result);
      if (result) {
        this.alertService.success('Address Created Successfully');
        this.getCustomerAddress();
      }
    })
  }

  editAddress(Id: any) {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '650px',
      data: { id: Id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('Address Edit dialog was closed', result);
      if (result) {
        this.alertService.success('Address Updated Successfully');
        this.getCustomerAddress();
      }
    })
  }

  deleteAddress(Id: any) {
    // console.log('Address Delete Clicked : ', Id);
    this.confirmDialog(Id);
  }

  getCustomerDetails() {
    this.commonService.getRequestWithToken('account_info').subscribe((result) => {

      (window as any).dataLayer.push({ "ecommerce": null }); // Clear the previous ecommerce object.
      // Check if this.customer is truthy, if not use an empty object
      const customerData = this.customer || {};
      this.customer = result.data;
      // console.log('Customer Details : ', this.customer);
      this.customerForm.patchValue({
        id: this.customer.id,
        firstname: this.customer.firstname,
        lastname: this.customer.lastname,
        email: this.customer.email,
        email_subscribe: this.customer.email_subscribe === 1,
        phone: this.customer.phone,
        company: this.customer.company,
        gst: this.customer.gst,
        gender: this.customer.gender,
      })

      console.log('Customer Form : ', this.customerForm.value);

    })
  }

  getAllCartItems() {
    this.cartService.getAllCartItems().subscribe((resp) => {
      if (resp && resp.status === true && resp.cart_items && resp.cart_items.length > 0) {
        const isMatchedItem = resp.cart_items.some((cItem: any) => cItem.id === this.btsWishlistHolder.product_details.id);
        if (isMatchedItem) {
          this.isBTSWishlistProductAddedToCart = true;
        }
      }
    });
  }

  getWishlist() {
    this.commonService.getRequestWithToken('wishlist').subscribe((result) => {
      if (result.status === true) {
        if (result.bts_wishlist && result.bts_wishlist.product_details) {
          this.btsWishlistHolder = result.bts_wishlist;
          this.getAllCartItems(); // Get All Cart Items to check BTS Wishlist Item
        }
        if (result.wishlist && result.wishlist.length > 0) {
          this.wishlistHolder = result.wishlist;
          this.handleWishlistListGTM(this.wishlistHolder); // GTM
        }
      } else {
        this.wishlistHolder = [];
        this.btsWishlistHolder = {};
      }
    })
  }

  handleWishlistListGTM(data: any[]) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        items: data.map((wishlistItem: any, index: any) => ({
          item_id: wishlistItem.id,
          item_name: wishlistItem.product_details.name, // Use product_details.name
          index: index,
          item_category: wishlistItem.product_details.name, // Add your actual property from item
          price: wishlistItem.product_details.price,
        })),
      },
    });
    // console.log("Wishlist Items GA dataLayer: view_item_list :", (window as any).dataLayer);
  }

  goToCart() {
    this.commonService.sidebarCartToggle$.next(true)
  }

  async addToCart(productDetails: any): Promise<void> {
    console.log('Product Details : ', productDetails);
    let payload = {
      product_id: productDetails.id,
      quantity: 1,
    };

    try {
      const addToCartResp = await this.cartService.addToCart(payload).toPromise();
      if (addToCartResp.status === true) {
        this.messageService.add({ severity: 'success', detail: addToCartResp.message });
        if (productDetails.code && productDetails.code.slice(0, 3) === 'BTS') {
          await this.applyCoupon(productDetails);
          this.getAllCartItems(); // Get All Cart Items to check BTS Wishlist Item
        }
      } else {
        this.messageService.add({ severity: 'error', detail: addToCartResp.message });
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        this.commonService.loginPopupToggle$.next(true);  //here open LoginSidebar 
      }
      this.cartService.cartChangeDetectionSubject.next(true);
    } catch (error) {
      this.messageService.add({ severity: 'error', detail: 'Something went wrong! please try again later' });
    }

    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        item_list_id: "add_to_cart",
        item_list_name: "Wishlist Add to Cart",
        item_id: productDetails.product_id,
        item_name: productDetails.name,
      },
    });
  }

  async applyCoupon(productDetails: any) {
    let couponCode = productDetails.code;
    if (!couponCode) {
      return;
    }
    try {
      const resp = await this.cartService.applyCoupon(couponCode).toPromise();
      if (resp.status) {
        this.messageService.add({ severity: 'success', detail: resp.message });
        localStorage.setItem('coupon-discount', JSON.stringify(resp.coupon_discount));
        let crtCouponDetails = {
          coupon_code: couponCode,
          coupon_discount: resp.coupon_discount,
          product_id: productDetails.id,
          product_name: productDetails.name
        }
        localStorage.setItem('crt-applied-coupon-details', JSON.stringify(crtCouponDetails));
      } else {
        this.messageService.add({ severity: 'error', detail: resp.message });
        localStorage.removeItem('coupon-discount');
        localStorage.removeItem('crt-applied-coupon-details');
      }
    } catch (error) {
      this.messageService.add({ severity: 'error', detail: 'Something went wrong! please try again later' });
    }
  }

  removeWishlist(productId: number, productName: String) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "remove_wishlist",
      ecommerce: {
        item_id: productId,
        item_name: productName,
      },
    });

    const message = `Are you sure? You want to Remove this Wishlist Item.`;
    const dialogData = new ConfirmDialogModel("Confirmation", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${productId}`).subscribe(async (resp) => {
          if (resp?.status) {
            this.getWishlist();
          } else {
            this.messageService.add({ severity: 'error', detail: resp.message });
          }
        })
      }
    });
  }

  getCustomerAddress() {
    this.commonService.getRequestWithToken('address_bank').subscribe((result) => {
      if (result.status) {
        this.customerAddress = result.data;
      } else {
        this.customerAddress = [];
      }
    })
  }

  setDefaultAddress(addressId: number, addressType: string) {
    let formData = {
      address_id: addressId,
      address_type: addressType
    };
    this.commonService.postRequestWithToken('set_default_address', formData).subscribe((resp) => {
      if (resp) {
        this.getCustomerAddress();
      }
    })
  }

  confirmDialog(Id: number): void {
    const message = `Are you sure? You want to Delete this address.`;
    const dialogData = new ConfirmDialogModel("Confirm Delete Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      // console.log('Confirm Dialog After Closed : ', dialogResult);
      if (dialogResult) {
        this.commonService.getRequestWithToken(`delete_address_bank/${Id}`).subscribe((resp) => {
          // console.log('Address Deleted Resp : ', resp);
          if (resp) {
            this.alertService.success('Address Deleted Successfully');
            this.getCustomerAddress();
          }
        })
      }
    });
  }
  // here i changes
  addTsoCart(productId: number, productName: String): void {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        item_list_id: "add_to_cart",
        item_list_name: "Wishlist Add to Cart",
        item_id: productId,
        item_name: productName,
      },
    });

    let payload = {
      product_id: productId,
      quantity: 1,
    };
    this.cartService.addToCart(payload).subscribe((resp) => {
      // console.log('Add to Cart Resp : ', resp);
      if (!resp.status) {
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        this.commonService.loginPopupToggle$.next(true);
      }
      this.cartService.cartChangeDetectionSubject.next(true);
    })
  }

  wishlistTrack(id: number, item: any) {
    return item.id;
  }

  rateAndReviewModalShow(orderId: number, i: number) {
    console.clear();
    this.orderId = orderId;
    this.filterOderHistory = [];
    this.isProductActiveForReview = 0;
    this.isReviewModalShow = true;
    this.orderHistoryHolder.filter((item) => {
      if (item.id === this.orderId) {
        this.filterOderHistory = item.product;
        this.productId = item.product[0].id;
      }
    });
    console.log('Order Id and Product id : ', this.orderId, this.productId);
    this.getReview().then(() => {
      console.log('Order Id and Product id : ', this.orderId, this.productId);
    });
  }

  onReviewProductPhoto(event: any) {
    this.productImage = event.target.files[0];
    this.getBase64(this.productImage).then((result: string) => {
      this.selectedImageUrl = result;
    });
  }

  getBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


  onClickRateProduct(i: number, productId: number) {
    this.isProductActiveForReview = i;
    this.productId = productId;
    this.getReview();
  }

  async getReview() {
    let payload = {
      order_id: this.orderId,
      product_id: this.productId
    };
    const result = await this.commonService.postRequestWithToken('get_reviews', payload).toPromise();
    console.log('Get Reviews : ', result);

    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "get_review", // Replace with your desired event name
      ecommerce: {
        ratingId: result.data.id,
        orderId: result.data.order_id,
        productId: result.data.product_id,
        rating: Math.floor(result.data.rating_star),
        reviewText: result.data.review,
        reviewImage: result.data.file_name,
      }
    });

    console.log("(window as any).dataLayer get_review :", (window as any).dataLayer);

    if (result && result.status) {
      this.ratingId = result.data.id;

      // this.orderId = result.data.order_id;
      // this.productId = result.data.product_id;
      this.rating = Math.floor(result.data.rating_star);
      this.reviewText = result.data.review;
      this.reviewImage = result.data.file_name;

      if (result.data && result.data.heading && result.data.heading.length > 0) {
        this.deliveryAssociate = result.data.heading[0].delivery_associate === 'Y';
        this.isPoliteBehavior = result.data.heading[0].is_polite_behavior === 'Y';
        this.packaging = result.data.heading[1].packaging === 'Y';
        this.isSturdyPackaging = result.data.heading[1].is_sturdy_packaging === 'Y';
        this.isRecyclingPackaging = result.data.heading[1].is_recycling_packaging === 'Y';
        this.isAppropriatePackaging = result.data.heading[1].is_appropriate_packaging === 'Y';
        this.others = result.data.heading[2].others === 'Y';
      }
    }
  }

  onSubmitRatingAndReview() {
    console.log('Order Id and Product id : ', this.orderId, this.productId);
    if (!this.rating) {
      this.messageService.add({ severity: 'error', detail: 'Rating is Required' });
      return;
    }
    if (!this.reviewText && this.others) {
      this.messageService.add({ severity: 'error', detail: 'Review is Required' });
      return;
    }

    if (!this.others) {
      this.reviewText = '';
    }

    let data = [];
    data.push({
      delivery_associate: this.deliveryAssociate ? 'Y' : 'N',
      is_polite_behavior: this.isPoliteBehavior ? 'Y' : 'N'
    });

    data.push({
      packaging: this.packaging ? 'Y' : 'N',
      is_sturdy_packaging: this.isSturdyPackaging ? 'Y' : 'N',
      is_recycling_packaging: this.isRecyclingPackaging ? 'Y' : 'N',
      is_appropriate_packaging: this.isAppropriatePackaging ? 'Y' : 'N',
    });
    data.push({
      others: this.others ? 'Y' : 'N',
    });

    console.log('Data : ', data);

    let fd = new FormData();
    fd.append('order_id', String(this.orderId));
    fd.append('product_id', String(this.productId));
    fd.append('shipping_id', '');
    fd.append('rating_star', String(this.rating));
    fd.append('heading', JSON.stringify(data));
    fd.append('review', this.reviewText);

    if (this.productImage) {
      fd.append('image', this.productImage, this.productImage.name);
    }

    if (this.ratingId) {
      fd.append('id', this.ratingId);
      this.commonService.postRequestWithToken('update_ratings', fd).subscribe((resp) => {
        if (resp.status) {
          this.messageService.add({ severity: 'success', detail: resp.message });
          this.isReviewModalShow = false;
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
      })
    } else {
      this.commonService.postRequestWithToken('create_ratings', fd).subscribe((resp) => {

        // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
        this.dataLayerService.push({
          event: "review_and_rating_event", // Replace with your desired event name
          ecommerce: {
            ratingId: this.orderId,
            orderId: this.orderId,
            productId: this.productId,
            rating: this.rating,
            reviewText: this.reviewText,
            reviewImage: this.productImage.name,
          }
        });

        console.log("(window as any).dataLayer review_and_rating_event :", (window as any).dataLayer);

        if (resp.status) {
          this.messageService.add({ severity: 'success', detail: resp.message });
          this.isReviewModalShow = false;
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
      })
    }
  }

  clearData() {
    this.orderId = null;
    this.productId = null;
    this.rating = null;
    this.reviewText = '';
    this.deliveryAssociate = false;
    this.isPoliteBehavior = false;
    this.packaging = false;
    this.isSturdyPackaging = false;
    this.isRecyclingPackaging = false;
    this.isAppropriatePackaging = false;
  }

  onSuccess(text: string) {
    this.alertService.success(text);
  }

}


export interface ICustomer {
  company: string;
  default_billing_address: number;
  default_shipping_address: number;
  email: string
  email_subscribe: number;
  firstname: string
  gender: string
  gst: number;
  id: number;
  lastname: string;
  orders: IOrders[];
  phone: number;
  ship_to_bill_address: string;
}

export interface IOrders {
  affordability: number;
  bill_address1: string;
  bill_address2: string;
  bill_city: string;
  bill_company: string;
  bill_country: string;
  bill_country_code: string;
  bill_country_id: number;
  bill_email: string;
  bill_firstname: string;
  bill_lastname: string;
  bill_phone: number;
  bill_zip: number;
  bill_zone: string;
  bill_zone_id: number;
  company: string;
  coupon_discount: number;
  customer_id: number;
  device_token: null
  email: string;
  etd: number;
  fast_shipping: number;
  firstname: string;
  gift_card_discount: number;
  gst: number;
  id: number;
  is_home: number;
  lastname: string;
  notes: null
  order_number: number;
  order_type: number;
  ordered_on: string;
  other_details: null
  payment_checksum: number;
  payment_id: object;
  payment_info: string;
  phone: number;
  pincode: number;
  referral: number;
  review_given: number;
  ship_address1: string;
  ship_address2: string;
  ship_city: string;
  ship_company: null
  ship_country: string;
  ship_country_code: null
  ship_country_id: number;
  ship_email: string;
  ship_firstname: string;
  ship_lastname: string;
  ship_phone: number;
  ship_zip: number;
  ship_zone: string;
  ship_zone_id: number;
  shipped_on: string;
  shipping: number;
  shipping_class: string;
  shipping_method: number;
  shipping_notes: number;
  source: string;
  status: string;
  store_id: number;
  store_pickup: number;
  subtotal: number;
  tax: number;
  total: number;
  tracking_ids: number;
}

export interface ICustomerAddress {
  address(address: any): unknown;
  city(city: any): unknown;
  state(state: any): unknown;
  country(country: any): unknown;
  customer_id: number;
  default_billing_address: number;
  default_shipping_address: number;
  field_data: IFieldData;
  id: number;
}

export interface IFieldData {
  address1: string;
  address2: string;
  city: string;
  country: string;
  country_code: string;
  country_id: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: number;
  zip: number;
  zone: string;
  zone_id: number;
}
