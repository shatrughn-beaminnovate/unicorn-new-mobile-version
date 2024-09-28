import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private paymentApiUrl = environment.paymentApiUrl;

  constructor(private http: HttpClient, private cartService: CartService) {

  }

  /**
   * @desc Get All payment modules from server
   * @returns {Observable<any>}
   * */
  getPaymentModules(pincode?: number): Observable<any> {
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

    let paymentURL = environment.isCheckoutUrlStatic ? this.paymentApiUrl : this.cartService.checkoutBaseUrl$.getValue() ? this.cartService.checkoutBaseUrl$.getValue() + '/public/api/v1/transactions' : this.paymentApiUrl;
    console.log('paymentURL : ', environment.isCheckoutUrlStatic, ':, ', paymentURL);
    if(pincode) {
      return this.http.get<any>(`${paymentURL}/get_payment_modules?pincode=${pincode}`, options)
    }
    return this.http.get<any>(`${paymentURL}/get_payment_modules`, options)
  }

  /**
   * @desc Process payment
   * @param payload
   * @returns {Observable<any>}
   * */
  processPayment(payload: object = {}): Observable<any> {
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
    let paymentURL = environment.isCheckoutUrlStatic ? this.paymentApiUrl :  this.cartService.checkoutBaseUrl$.getValue() ? this.cartService.checkoutBaseUrl$.getValue() + '/public/api/v1/transactions' : this.paymentApiUrl;
    return this.http.post<any>(`${paymentURL}/process_payment`, payload, options)
  }

  /**
   * @desc Check payment status
   * @param orderId
   * @returns {Observable<any>}
   * */
  checkPaymentStatus(orderId: number): Observable<any> {
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

    let paymentURL = environment.isCheckoutUrlStatic ? this.paymentApiUrl :  this.cartService.checkoutBaseUrl$.getValue() ? this.cartService.checkoutBaseUrl$.getValue() + '/public/api/v1/transactions' : this.paymentApiUrl;
    return this.http.get<any>(`${paymentURL}/check_payment_status?order_id=${orderId}`, options)
  }

  /**
   * @desc Make payment
   * @param paymentURL
   * @param payload
   * @param headers
   * @param method
   * @returns {Observable<any>}
   * */
  makePayment(paymentURL: string, payload: object = {}, headers: any, method: string): Observable<any> {
    // if (paymentURL && this.isValidURL(paymentURL)) {
    //   Swal.fire({
    //     title: 'Error!',
    //     text: 'Invalid URL',
    //     icon: 'error',
    //     confirmButtonText: 'Ok'
    //   });
    // }
    console.log('Headers Before : ', headers);
    const options = {
      headers: new HttpHeaders({
        'customer-id': `${environment.customerId}`,
        ...headers
      })
    };
    let paymentBaseURL = environment.isCheckoutUrlStatic ? this.paymentApiUrl :  this.cartService.checkoutBaseUrl$.getValue() ? this.cartService.checkoutBaseUrl$.getValue() + '/public/api/v1/transactions' : this.paymentApiUrl;
    return this.http.post<any>(`${paymentBaseURL}`, payload, options)
  }

  // check if is it a valid url
  isValidURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

}
