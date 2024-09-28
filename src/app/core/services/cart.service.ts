import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static getSessionCartItems: any;
  static sessionStorage: any;
  cartItemsCountHolder = new BehaviorSubject<number>(0);
  cartChangeDetectionSubject = new Subject<boolean>(); // Subject is used to share cart items with all components
  getTotalGuestCartItemsSubject = new Subject<boolean>();
  checkoutBaseUrl$ = new BehaviorSubject<any>('');
  private cartUrl = environment.cartUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  get getSessionCartItems(): any {
    return JSON.parse(sessionStorage.getItem('guest-cart-items')!);
  }

  /**
   * Post Request with token and customer-id header if environment.customerIdAllowed is true in environment.ts file
   * @param ApiUrlEndPoint
   * @param payload
   * @returns {Observable<any>}
   */
  postRequestWithToken(ApiUrlEndPoint: string, payload: object): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.post<any>(`${checkoutURL}/${ApiUrlEndPoint}`, payload, options);
  }


  /**
   * @desc Get all cart items count from server
   * @returns Observable< {"status":boolean, "message": string | number} >
   * */
  getCartItemsCount(): Observable<{ "status": boolean, "message": string | number }> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/total_cart_items`, options);
  }

  /**
   * @desc HTTP GET Request with token
   * @param ApiUrlEndPoint
   * @returns {Observable<any>}
   * */
  getRequestWithToken(ApiUrlEndPoint: string): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/${ApiUrlEndPoint}`, options);
  }


  /**
   * @desc HTTP PATCH Request with token
   * @param ApiUrlEndPoint
   * @param payload
   * @returns {Observable<any>}
   * */
  patchRequestWithToken(ApiUrlEndPoint: string, payload: object): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.patch<any>(`${checkoutURL}/${ApiUrlEndPoint}`, payload, options);
  }

  /**
   * @desc View Cart Items from server
   * @returns Observable array of cart items
   * */
  getAllCartItems(): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/view_cart`, options);
  }

  /**
   * @deprecated No longer used
   * */
  applyCouponCode(couponCode: string): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/view_cart?cc=${couponCode}`, options);
  }

  /**
   * @desc Apply coupon code to cart
   * */
  applyCoupon(couponCode: string): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/apply_coupon?coupon_code=${couponCode}&apply_coupon_code=true`, options);
  }

  /**
   * @dec Add to Cart
   * @param payload
   * @return Observable
   * */
  addToCart(payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.post<any>(`${checkoutURL}/cart/add_product`, payload, options).pipe(map((resp) => {
      this.cartChangeDetectionSubject.next(true);
      this.getCartItemsCount().subscribe((result) => {
        if (result.status) {
          sessionStorage.setItem('total-cart-items', JSON.stringify(result.message));
        } else {
          sessionStorage.removeItem('total-cart-items');
        }
      });
      if (resp.status === 'info' && resp.status_code === 'customer_not_found') {
        Swal.fire({
          title: 'Error!',
          text: 'Your session has been expired. Please login again to continue.',
          icon: 'error',
        }).then(() => {
          this.authService.logout();
        });
        // return throwError({
        //   status: 'error',
        //   code: 401,
        //   status_code: 'customer_not_found',
        //   message: 'Your session has been expired. Please login again to continue.'
        // });
      }
      return resp;
    }));
  }

  /**
   * @dec Add to Cart
   * @param payload
   * @return Observable
   * */
  addToCartBundle(payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.post<any>(`${checkoutURL}/cart/add_bundle_product`, payload, options).pipe(map((resp) => {
      this.cartChangeDetectionSubject.next(true);
      this.getCartItemsCount().subscribe((result) => {
        if (result.status) {
          sessionStorage.setItem('total-cart-items', JSON.stringify(result.message));
        } else {
          sessionStorage.removeItem('total-cart-items');
        }
      });
      if (resp.status === 'info' && resp.status_code === 'customer_not_found') {
        Swal.fire({
          title: 'Error!',
          text: 'Your session has been expired. Please login again to continue.',
          icon: 'error',
        }).then(() => {
          this.authService.logout();
        });
        // return throwError({
        //   status: 'error',
        //   code: 401,
        //   status_code: 'customer_not_found',
        //   message: 'Your session has been expired. Please login again to continue.'
        // });
      }
      return resp;
    }));
  }

  onCartItemsChanged() {
    return this.cartChangeDetectionSubject.asObservable();
  }

  updateCart(payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.post<any>(`${checkoutURL}/cart/update_cart`, payload, options);
  }

  /**
   * Removes an item from the cart.
   *
   * @param cartItemId - The ID of the item to be removed from the cart.
   * @returns An Observable that emits the result of the removal operation.
   */
  removeFromCart(cartItemId: number): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/remove-item/${cartItemId}`, options);
  }

  emptyCart(): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.delete<any>(`${checkoutURL}/empty`, options);
  }


  async clearCartAsync(): Promise<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return await this.http.delete<any>(`${checkoutURL}/empty`, options).toPromise();
  }


  moveToWishlist(cartItemId: number): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/move-to-wishlist/${cartItemId}`, options);
  }

  removeCoupon(): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/remove_coupon`, options);
  }

  checkPinCode(pin: number): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.get<any>(`${checkoutURL}/check_pincode/${pin}`);
  }

  putRequest(cartApiEndPoint: string, payload: object = {}): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfbmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MTU3NjIwLjAsIm5iZiI6MTY5NDE1NzYyMSwiZXhwIjoxNjk0NDE2ODIxfQ.qem0n81kBluklK1e4Uqi5nzZGBvHRh0tDX_kSWdmDPI`
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };

    let checkoutURL = environment.isCheckoutUrlStatic ? this.cartUrl : this.checkoutBaseUrl$.getValue() ? this.checkoutBaseUrl$.getValue() : this.cartUrl;
    return this.http.put<any>(`${checkoutURL}/${cartApiEndPoint}`, payload, options);
  }
}
