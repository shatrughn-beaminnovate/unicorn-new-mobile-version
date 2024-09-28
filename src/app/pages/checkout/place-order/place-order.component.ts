import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../core/services/common.service";
import { environment } from "../../../../environments/environment";
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { MessageService } from 'primeng/api';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  imgUrl = environment.imgUrl;
  orderSummaryHolder!: any;
  products: any[] = [];
  isGuestOrderSuccess: boolean = false;
  orderNumberForGuestOrder!: number;
  prebook: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private cartService: CartService,
    private messageService: MessageService,
    private dataLayerService: DataLayerService,
    private titleService: Title
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Order Placed | Unicornstore');
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    let orderNumber = this.route.snapshot.queryParams.order_number;
    if (this.authService.isLoggedIn) {
      this.isGuestOrderSuccess = false;
      if (orderNumber) {
        this.getOrderSummary(orderNumber)
      } else {
        this.commonService.getRequestWithToken('ordered_items_history').subscribe((result) => {
          this.getOrderSummary(result.data.at(-1).order_number);
        }, () => {
          this.messageService.add({ severity: 'error', detail: 'Something went wrong' });
        });
      }
    } else {
      this.isGuestOrderSuccess = true;
      this.orderNumberForGuestOrder = orderNumber;
      this.getCartSummary(orderNumber); // Commented this line for now as it is guest user not a customer
    }

    this.commonService.getData(`send_order_confirmation/${orderNumber}`).subscribe((resp: any) => {
      console.log('Order Summary : ', resp);
    })
  }

  getOrderSummary(orderNumber: number) {
    this.commonService.getRequestWithTokenAndId('order_summary', orderNumber).subscribe((result) => {
      console.log('Order Summary : ', result.data);
      if (result.status) {
        this.orderSummaryHolder = result.data;
        this.products = result.products;
        this.prebook = this.orderSummaryHolder.status === 'prebook'; 
        let gtmArray: any[] = [];
        if (this.orderSummaryHolder && Array.isArray(this.products) && this.products.length > 0) {
          console.log('this.products : ', this.products, Array.isArray(this.products));
          this.products.forEach((item: any) => {
            gtmArray.push({
              item_id: item.sku,
              item_name: item.name,
              quantity: item.quantity,
              price: item.saleprice,
              coupon: this.orderSummaryHolder?.coupon_code || '',
              discount: this.orderSummaryHolder?.coupon_discount || 0
            })
          });
          this.fireGA4EventOnOrderSuccess(gtmArray, this.orderSummaryHolder.payment_info);
        }
      } else {
        this.messageService.add({ severity: 'info', detail: result.message });
      }
    }, () => {
      this.messageService.add({ severity: 'error', detail: 'Something went wrong' });
    })
  }

  // This method use only for guest user order summary data
  getCartSummary(orderNumber: number) {
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

    this.cartService.getRequestWithToken(`cart_summary?Order_number=${orderNumber}`).subscribe((result) => {

      if (result.status) {
        this.orderSummaryHolder = result.data;
        this.products = result.products;
        let gtmArray: any[] = [];
        this.products.forEach((item: any) => {
          gtmArray.push({
            item_id: item.sku,
            item_name: item.name,
            quantity: item.quantity,
            price: item.saleprice,
            coupon: this.orderSummaryHolder?.coupon_code || '',
            discount: this.orderSummaryHolder?.coupon_discount || 0
          })
        });

        this.fireGA4EventOnOrderSuccess(gtmArray, this.orderSummaryHolder.payment_info);
      } else {
        // this.messageService.add({ severity: 'info', detail: result.message });
        console.log('cart_summary : ', result.message);
      }
    }, () => {
      // this.messageService.add({ severity: 'error', detail: 'Something went wrong' });
      console.log('cart_summary: Something went wrong');
    });
  }

  fireGA4EventOnOrderSuccess(gtmArray: any[], paymentInfo: string) {
    this.dataLayerService.push({
      event: "purchase",
      ecommerce: {
        transaction_id: this.orderSummaryHolder?.transaction_id ? this.orderSummaryHolder?.transaction_id : paymentInfo === 'cod' ? 'cod_' + this.orderSummaryHolder?.order_number : this.orderSummaryHolder?.order_number,
        order_no: this.orderSummaryHolder?.order_number,
        currency: "INR",
        value: this.orderSummaryHolder?.total,
        coupon: this.orderSummaryHolder?.coupon_code || '',
        items: gtmArray || []
      }
    });
  }
}

