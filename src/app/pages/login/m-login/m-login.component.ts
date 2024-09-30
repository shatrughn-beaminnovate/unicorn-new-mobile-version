import { Platform } from "@angular/cdk/platform";
import { PlatformLocation } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, AbstractControlOptions } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxOtpInputConfig } from "ngx-otp-input";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs/operators";
import { MustMatch } from "src/app/core/helper/must-match-validators";
import { AuthService } from "src/app/core/services/auth.service";
import { CartService } from "src/app/core/services/cart.service";
import { CommonService } from "src/app/core/services/common.service";
import { DummyDataService } from "src/app/core/services/dummy-data.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";


@Component({
  selector: 'app-m-login',
  templateUrl: './m-login.component.html',
  styleUrls: ['./m-login.component.scss']
})
export class MLoginComponent implements OnInit {
  display = true;
  imgUrl = environment.imgUrl;
  password: string = '';
  isLoading = false;
  forgotEmail: any;
  displayBasic2: boolean | undefined;
  registerSubmitted = false;
  loginSubmitted = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isPasswordFocused: boolean = false;
  isConfirmPasswordFocused: boolean = false;
  showCloseIcon: boolean = false;

  loginForm!: FormGroup;

  registerForm!: FormGroup;
  startTime!: number;
  loginSidebar: boolean = false;
  registerSidebar: boolean = false;

  disableButtons!: boolean;

  productId: any;
  productName: any;
  quantity: any;
  isLoginWithOtpForm = false;
  isForgotPasswordForm = false;
  isOtp = false;
  isOtpValue!: number;
  otpExpires = 30;
  forgotPasswordForm!: FormGroup;
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
  private popStateListener: any;

  alert = { show: false, type: '', message: '' };
  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private cartService: CartService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dummyService: DummyDataService,
    private platform: Platform,
    private platformLocation: PlatformLocation
  ) {
    this.forgotPasswordForm = this.fb.group({
      forgotEmail: ['', [Validators.required, Validators.email]]
    });

    // Disable back button on mobile devices
    if (this.platform.ANDROID) {
      this.popStateListener = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
      };
      this.platformLocation.onPopState(this.popStateListener);
    }

  }



  get getLoginControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  get mobile() {
    let mobileNumber = JSON.parse(localStorage.getItem('mobile')!);
    if (mobileNumber) {
      return mobileNumber
    }
    return null;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),]],
      password: ['', [Validators.required]],
    });

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'conf_password'),
    };
    this.forgotPasswordForm = this.fb.group({
      forgotEmail: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * OTP Functions Start Here
   */
  onClickOtpLogin(): void {
    this.isLoginWithOtpForm = true;
  }

  loginWithEmail(): void {
    this.isLoginWithOtpForm = false;
    this.isForgotPasswordForm = false;
  }

  verifyMobile(phone: any) {
    console.log('Mobile No : ', phone);
    localStorage.setItem('mobile', phone);

    this.commonService.getData(`login_with_otp?phone=${phone}`).subscribe((resp) => {
      console.log('Login With OTP Resp : ', resp);
      if (resp.status) {
        this.isOtp = true;
        setInterval(() => {
          if (this.otpExpires > 0) {
            this.otpExpires = --this.otpExpires;
          } else {
            // clearInterval();
          }
        }, 1000)
      } else {
        if (resp.Error) {
          this.messageService.add({ severity: 'error', detail: resp.Error });
        }
        if (resp.response) {
          this.messageService.add({ severity: 'warning', detail: resp.response });
        }
      }
    })
  }

  validateOtp() {
    let otpData = {
      phone: localStorage.getItem('mobile'),
      otp: this.isOtpValue
    };
    this.commonService.postRequest('verify_login_otp', otpData).subscribe((resp) => {
      console.log('OTP Validate Resp : ', resp);
      if (resp && resp.status) {
        localStorage.removeItem('mobile');
        localStorage.setItem('customer_data', JSON.stringify(resp.data));
        localStorage.setItem('customer_token', resp.data.token);
        // this.hideSidebar();
        this.isLoginWithOtpForm = false;
        this.isForgotPasswordForm = false;
        this.isOtp = false;
        this.router.navigate(['/account'])
      } else {
        this.messageService.add({ severity: 'error', detail: resp.Error });
      }
    })
  }

  handleOtpChange(value: string[]): void {
    // console.log(value);
  }

  handleFillEvent(otp: string): void {
    this.isOtpValue = +otp;
    console.log('Filled OTP : ', this.isOtpValue);
  }

  resendOtp() {
    console.log('Resend Otp : ', localStorage.getItem('mobile'));
  }

  // show password
  showUserPassword() {
    this.showPassword = !this.showPassword; // Your existing code for toggling password visibility
  }

  //  on focus and blur input border-black by onclick
  onPasswordFocus() {
    this.isPasswordFocused = true;
  }

  onPasswordBlur() {
    this.isPasswordFocused = false;
  }

  // OTP Functions End Here
  async onLoginFormSubmit() {
    console.log('Login Form : ', this.loginForm.value);
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // Check if there are any items in the guest cart
    const guestCartItems = JSON.parse(sessionStorage.getItem('guest-cart-items') || '[]');
    if (guestCartItems.length > 0) {
      // Show sweet alert warning the user that their guest cart items will be removed
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Guest Cart Items',
        text: 'Your guest cart items will be removed after login.',
        showCancelButton: true,
        confirmButtonText: 'Proceed with Login',
        cancelButtonText: 'Cancel Login'
      });

      if (!result.isConfirmed) {
        // If the user clicked 'Cancel', close the login popup and return
        this.loginSidebar = false;
        return;
      }
    }


    this.alert.show = false;
    this.alert.type = '';
    this.alert.message = '';
    this.isLoading = true;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(finalize(() => {
      this.isLoading = false;
      this.loginSubmitted = false;
    })).subscribe((resp) => {
      if (resp && resp.status === true) {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('customer_data', JSON.stringify(resp.data));
        localStorage.setItem('customer_token', resp.data.token);
        this.cartService.emptyCart().subscribe(); // Empty the cart after login
        this.router.navigate(['/']);
        this.display = false;
        // Call the API to get the guest is allowed to checkout or not
        // this.commonService.getRequest('guest_checkout_status').subscribe((resp) => {
        this.dummyService.getGuestCheckoutStatus().subscribe((resp) => {
          if (+resp.data === 1) {
            localStorage.setItem('guest', 'not-allowed');
          } else {
            localStorage.setItem('guest', 'allowed');
          }
        });
      } else {
        this.alert = { show: true, type: 'alert-error', message: resp.message || 'Login failed' };
      }
    });
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
    this.loginSidebar = false;

  }
}
