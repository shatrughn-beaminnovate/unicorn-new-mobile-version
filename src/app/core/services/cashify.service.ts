import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashifyService {

  //  Dummy config by cashify
  private token = "6f9e8cf77a2eb73ee242e50700e67dd7_359";
  private base_url = "https://allbb01.api.beta.cashify.in:8443/";

  // production config by cashify DO NOT CREATE PICKUP ORDER WITH THIS!!!!!!!!
  // private token = "6f9e8cf77a2eb73ee242e50700e67dd7_381";
  // private base_url = "https://allbb01.api.cashify.in/";

  constructor(private http: HttpClient) { }

  /**
   * @desc Get All Pincode List from cashify server
   * @returns Observable<any>
   */
  getAllPincodeList(): Observable<any> {
    console.log('Get All Pincode List : ');
    const options = {
      headers: new HttpHeaders({
        'X-BUYBACK-AUTH': this.token
      })
    };
    return this.http.get<any>(`${this.base_url}v1/get-all-pincodes`, options);
  }

  /**
   * @desc Get Tier List from cashify server
   * @returns Observable<any>
   * @example getTierList()
   */
  getTierList(): Observable<any> {
    console.log('Get Tier List : ');
    return this.http.get<any>(`${this.base_url}v1/tier`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Brand List from cashify server by pincode
   * @param pincode
   * @param tier
   * @returns Observable<any>
   * @example getBrandListByPincode(110001)
   */
  getBrandListByPincode(pincode: string, tier: string): Observable<any> {
    console.log('Get Brand List By Pincode, Tier : ', pincode, tier);
    return this.http.get<any>(`${this.base_url}v1/brand?pincode=${pincode}&tier=tier_${tier}`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Product List from cashify server by pincode and brand id, tier
   * @param pincode
   * @param brandId
   * @param tier
   * @returns Observable<any>
   */
  getProductList(pincode: string, brandId: number, tier: string): Observable<any> {
    console.log('Get Model List By Pincode And Brand Id : ', pincode, brandId, tier);
    return this.http.get<any>(`${this.base_url}v1/product?pincode=${pincode}&brandId=${brandId}&tier=tier_${tier}`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Variant List from cashify server by pincode, product id
   * @param pincode
   * @param productId
   * @returns Observable of Variant List
   */
  getVariantList(pincode: string, productId: number): Observable<any> {
    console.log('Get Variant List By Pincode And Product Id : ', pincode, productId);
    return this.http.get<any>(`${this.base_url}v1/get-variants?pid=${productId}&pincode=${pincode}&pln=mobile-phone`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Device Details from cashify server by pincode, IMEI
   * @param pincode
   * @param imei
   * @returns Observable<any>
   * @example getDeviceDetails(110001, 123456789012345)
   */
  getDeviceDetails(pincode: string, imei: string): Observable<any> {
    console.log('Get Device Details By Pincode And Imei : ', pincode, imei);
    return this.http.get<any>(`${this.base_url}v1/get-device-details?imei=${imei}&pin=${pincode}&pln=mobile-phone`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Question List from cashify server
   * @returns Observable<any>
   * @example getQuestionList()
   */
  getQuestionList(data: any): Observable<any> {
    console.log('Get Question List : ');
    return this.http.post<any>(`${this.base_url}v1/qoute`, data, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Get Order by qoute from cashify server
   * @param data
   * @returns Observable<any>
   */
  getOrder(data: any): Observable<any> {
    console.log('Get Order : ', data);
    return this.http.get<any>(`${this.base_url}v1/get-order?quoteId=${data}`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }

  /**
   * @desc Apply Coupon Code from cashify server by coupon code
   * @param couponCode
   * @returns Observable<any>
   */
  applyCashifyCoupon(couponCode: string): Observable<any> {
    console.log('Apply Coupon Code : ', couponCode);
    return this.http.get<any>(`${this.base_url}v1/coupon/apply?coupon=${couponCode}`, { headers: { 'X-BUYBACK-AUTH': this.token } });
  }
}
