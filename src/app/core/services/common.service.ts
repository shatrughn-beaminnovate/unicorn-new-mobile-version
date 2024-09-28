import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiBaseUrl = environment.apiUrl;
  isCashifyAllowed = new BehaviorSubject<number>(0);
  isCRTAllowed = new BehaviorSubject<number>(0);
  baseUrls$ = new BehaviorSubject<any>({}); // like: {apiBaseUrl: '', webBaseUrl: ''}
  static postRequest: any;
  sidebarCartToggle$ = new Subject<boolean>();
  total = new Subject<boolean>();
  crt = new Subject<boolean>();
  // private bestsellersHolderSubject = new Subject<any>();
  totalPrice = new Subject<boolean>();
  totalsession = new Subject<boolean>();

  sidebarCartMobile$ = new Subject<boolean>();
  sidebarCartLogout = new Subject<boolean>();
  loginPopupToggle$ = new Subject<boolean>();
  CheckPincode$ = new Subject<boolean>();
  private _tatData: any;
  Tata_data: any;

  private isResultSubject = new BehaviorSubject<any>(null);
  isResult$ = this.isResultSubject.asObservable();

  private isQuantitySubject = new BehaviorSubject<any>(null);
  isQuantity$ = this.isQuantitySubject.asObservable();

  headerData = new BehaviorSubject<any>({});
  headerData$ = this.headerData.asObservable();

  isMobileUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('isResult');
    if (storedData) {
      this.isResultSubject.next(JSON.parse(storedData));
    }
  }

  /**
   * @description This method is used to get data from api with token
   * @param ApiUrlEndPoint
   * @returns observable of any type
   */
  getRequest(ApiUrlEndPoint: string): Observable<any> {
    let headers = new HttpHeaders();
    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }
    const options = {
      headers: headers
    };
    // TODO: put 'customer-id' options in
    return this.http.get(this.apiBaseUrl + '/' + ApiUrlEndPoint, options);
  }
  updateIsResult(data: any) {
    this.isResultSubject.next(data);
    localStorage.setItem('isResult', JSON.stringify(data));

  }
  updateIsQuantity(data: any) {
    this.isQuantitySubject.next(data);
    sessionStorage.getItem(JSON.stringify(data));
  }
  // setTATData(data: any) {
  //   this._tatData = data;
  // }
  // getTATData() {
  //   return this._tatData;
  // }
  getRequestWithSlug(slug: string): Observable<any> {
    let headers = new HttpHeaders();
    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }
    const options = {
      headers: headers
    };
    // TODO: put 'customer-id' options in
    return this.http.get(this.apiBaseUrl + '/' + slug, options);
  }


  // This is the method that is being called from the component:
  getData(ApiUrlEndPoint: string): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });
    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }
    const options = {
      headers: headers
    };
    return this.http.get(this.apiBaseUrl + '/' + ApiUrlEndPoint, options);
  }

  getRequestWithToken(ApiUrlEndPoint: string): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    return this.http.get(this.apiBaseUrl + '/' + ApiUrlEndPoint, options);
  }

  getRequestWithTokenAndId(ApiUrlEndPoint: string, id: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    return this.http.get(this.apiBaseUrl + '/' + ApiUrlEndPoint + '/' + id, options);
  }

  postRequest(ApiUrlEndPoint: string, payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    return this.http.post(this.apiBaseUrl + '/' + ApiUrlEndPoint, payload, options);
  }

  postRequestWithSlug(slug: string, payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    return this.http.post(this.apiBaseUrl + '/' + slug, payload, options);
  }

  postRequestWithToken(ApiUrlEndPoint: string, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'X-Auth-Token': `${localStorage.getItem('customer_token')}`,
    });

    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }

    const options = {
      headers: headers
    };
    return this.http.post(this.apiBaseUrl + '/' + ApiUrlEndPoint, data, options);
  }
}
