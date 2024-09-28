import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { CommonService } from "./common.service";
import { AlertService } from "../shared/alert";
import { DummyDataService } from './dummy-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private dummyService: DummyDataService
  ) {
  }

  get isLoggedIn(): boolean {
    return !!(localStorage.getItem('customer_token') && localStorage.getItem('customer_data'));
  }


  login(email_id: any, password: any): Observable<any> {
    let headers = new HttpHeaders();
    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }
    const options = {
      headers: headers
    };
    // TODO: Put options in login api call when customer id available
    return this.http.post<any>(`${this.apiUrl}/login`, { email_id, password }, options);
  }

  loginForNewUser(email_id: any, password: any, sha = true): Observable<any> {
    let headers = new HttpHeaders();
    if (environment.customerIdAllowed) {
      headers = headers.append('customer-id', `${environment.customerId}`);
    }
    const options = {
      headers: headers
    };
    // TODO: Put options in login api call when customer id available
    return this.http.post<any>(`${this.apiUrl}/login`, { email_id, password, sha }, options);
  }

  logout(): void {
    // remove token from local storage & Database to logout
    this.commonService.getRequestWithToken('logout').subscribe((resp) => {
      console.log('Logout From Database : ', resp);
    });
    localStorage.clear();
    sessionStorage.clear();
    this.commonService.sidebarCartToggle$.next(false);
    this.router.navigate(['/'], { replaceUrl: true }).then(() => {
      // this.commonService.getData('guest_checkout_status').subscribe((resp) => {
      this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
        if (+resp.data === 1) {
          localStorage.setItem('guest', 'not-allowed');
        } else {
          localStorage.setItem('guest', 'allowed');
        }
      })
    });
  }

  /**
   * Checks the guest checkout status.
   * @returns {Observable<any>} - Guest checkout status if "0" Guest is Enabled otherwise "1" Guest is Disabled.
   */
  checkGuestCheckoutStatus(): Observable<any> {
    return this.commonService.getData('guest_checkout_status');
  }
}
