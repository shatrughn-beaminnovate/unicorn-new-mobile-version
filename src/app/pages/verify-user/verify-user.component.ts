import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  isVerifying = false;
  displayCartGuestItemsCompare: boolean = false;
  guestCartItems: any[] = [];
  cartItems: any[] = [];
  cartConflictCount: number = 0;
  loginSidebar: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isTokenExpired: boolean = false;
  isVerified: boolean = false;
  isReSendingVerificationLink: boolean = true;
  isVerificationFailed: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
    private cartService: CartService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.params.token;
    this.isVerifying = true;
    this.commonService.postRequest('verify_user', { verify_user: token }).pipe(finalize(() => {
      this.isVerifying = false;
    })).subscribe((res) => {
      if (res.status === 'success') {
        Swal.fire({ title: res.status, text: res.message || 'User has been verified successfully', icon: 'success' });
        this.login(res.data.email, res.data.password);
      } else {
        Swal.fire({ title: res.status, text: res.message, icon: res.status });
      }
    });
  }

  login(email: string, password: string) {
    this.authService.loginForNewUser(email, password, true).subscribe((resp) => {
      if (resp && resp.status === true) {
        this.loginSidebar = false;
        this.showPassword = false;
        this.showConfirmPassword = false;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('customer_data', JSON.stringify(resp.data));
        localStorage.setItem('customer_token', resp.data.token);
        this.cartService.emptyCart().subscribe(); // Empty the cart after login 
        this.messageService.add({ severity: 'success', detail: 'Login successful' });
        this.router.navigate(['/account']);

        // Call the API to get the guest is allowed to checkout or not
        this.commonService.getRequest('guest_checkout_status').subscribe((resp) => {
          if (+resp.data === 1) {
            localStorage.setItem('guest', 'not-allowed');
          } else {
            localStorage.setItem('guest', 'allowed');
          }
        });
      }
      else {
        this.messageService.add({ severity: 'error', detail: resp.message || 'Login failed' });
      }
    });
  }

  resendVerificationLink() {
    let email = ''
    if (this.route.snapshot.params.token) {
      try {
        console.log('Token:', atob(this.route.snapshot.params.token.split('.')[1]));
        email = JSON.parse(atob(this.route.snapshot.params.token.split('.')[1]))!.mail;
      } catch (e) {
        console.error('Failed to decode token:', e);
        return;
      }
    }
    this.isReSendingVerificationLink = true;
    this.commonService.postRequest('resend_verification_mail', { email }).pipe(finalize(() => {
      this.isReSendingVerificationLink = false;
    })).subscribe((res) => {
      if (res.status === true) {
        Swal.fire({ title: 'Verification Link Sent', text: res.message || 'Verification link has been sent to your email', icon: 'success' });
      } else {
        Swal.fire({
          title: 'Verification Link Failed', text: res.message || 'Verification link sending failed', icon: 'error'
        });
      }
    });
  }
}
