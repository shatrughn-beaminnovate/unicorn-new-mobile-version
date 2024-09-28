import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from "../../core/services/common.service";
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "../../core/helper/must-match-validators";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { finalize, map } from "rxjs/operators";
import { AlertService } from "../../core/shared/alert";
import { NgxOtpInputConfig } from "ngx-otp-input";
import { CartService } from "../../core/services/cart.service";
import Swal from "sweetalert2";
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  imgUrl = environment.imgUrl;
  alertMessage!: string;
  registerSuccessMsg: string = '';
  isLoading = false;
  isLoginLoading = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loginSubmitted = false;
  registerSubmitted = false;
  isLoginWithOtpForm = true;
  isForgotPasswordForm = false;
  isOtp = false;
  @ViewChild('mobileNumber', { static: false }) mobileNumber: ElementRef | undefined;
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

  displayCartGuestItemsCompare: boolean = false;
  guestCartItems: any[] = [];
  cartItems: any[] = [];
  cartConflictCount: number = 0;
  isVerifying = false;
  loginOffer = false
  registerOffer = false
  userOfferData: any;
  tokens: any;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private cartService: CartService,
    private messageService: MessageService
  ) {
    if (localStorage.getItem('customer_data')) {
      // this.router.navigate(['/account']);
      localStorage.removeItem('customer_data');


    }
  }

  get getLoginControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get getRegisterControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get mobile() {
    let mobileNumber = JSON.parse(localStorage.getItem('mobile')!);
    if (mobileNumber) {
      return mobileNumber
    }
    return null;
  }

  /**
   * Initializes the component and sets up the login and registration forms.
   */
  ngOnInit(): void {

    // Dynamic Image Url Change In Cart Page
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.loginForm = this.fb.group({
      email_id: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: ['', [Validators.required]]
    });

    const formOptions: AbstractControlOptions = {
      validators: MustMatch('password', 'conf_password')
    };
    let mobileNumberReg = /^[0-9]{10}$/;
    this.registerForm = this.fb.group({
      company: [''],
      firstname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
      lastname: ['',],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern(mobileNumberReg)]],
      gst: ['', [Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      email_subscribe: [true],
      password: ['', [Validators.required]],
      conf_password: ['', [Validators.required]],
    }, formOptions)

    if (this.route.snapshot.params.token) {
      console.log('Verification Token ', this.route.snapshot.params.token)
      const token = this.route.snapshot.params.token;
      this.tokens = this.route.snapshot.params.token;
      this.isVerifying = true;
      // Swal.fire({
      //   html: `<svg xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 100 100">
      //   <path d="M 50,50 L 33,60.5 a 20 20 -210 1 1 34,0 z" fill="#464646">
      //     <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"></animateTransform>
      //   </path>
      //   <circle cx="50" cy="50" r="16" fill="#fff"></circle>
      // </svg>`,
      //   // <h2 class="swal2-title custom-title">Verifying User</h2> <p>Please wait while we verify your account...</p>
      //   allowOutsideClick: false,
      //   showConfirmButton: false
      // });

      // imageUrl: 'assets/img/loader/2.gif',

      this.commonService.postRequest('unicorn/get_user_data', { token: token }).pipe(finalize(() => {
        this.isVerifying = false;
      })).subscribe((res) => {
        if (res.status === 'success') {
          Swal.close();
          // Swal.fire({ title: res.status, text: res.message || 'User has been verified successfully', icon: 'success' });
          this.userOfferData = res.data;
          if (this.userOfferData.is_customer === true) {
            this.loginOffer = true
            if (this.mobileNumber && this.userOfferData.phone) {
              this.mobileNumber.nativeElement.value = this.userOfferData.phone;
            }
          }
          else {
            this.registerOffer = true
            this.registerForm.patchValue({
              company: this.userOfferData.company_name,
              firstname: this.userOfferData.name,
              lastname: this.userOfferData.name,
              email: this.userOfferData.email,
              phone: this.userOfferData.phone,
              email_subscribe: [true],
            })

          }

          // this.login(res.data.email, res.data.password);
        } else if (res.status === 'info') {
          Swal.close();
          // Swal.fire({ title: 'error', text: 'Something went wrong', icon: 'error' });
          this.messageService.add({ severity: res.status, detail: 'Something went wrong', });

          this.router.navigate(['/'])

        }

        else {
          Swal.close();
          Swal.fire({ title: res.status, text: res.message, icon: res.status });
        }
      }, () => {
        Swal.close();
        Swal.fire({ title: 'error', text: 'Something went wrong', icon: 'error' });
      });
    }
  }


  /**
   * Handles the submission of the login form.
   */
  onLoginFormSubmit(): void {
    this.loginSubmitted = true;
    console.log('On Login Form Submitted : ', this.loginForm.value);
    if (this.loginForm.invalid) return; // Return if form is invalid (validation failed)
    this.isLoginLoading = true; // Set loading to true to display loading spinner
    this.authService.login(this.loginForm.value.email_id, this.loginForm.value.password).subscribe((resp) => {
      this.isLoginLoading = false; // Set loading to false to hide loading spinner
      this.alertMessage = '';
      if (resp && resp.status === true) {
        console.log('Login Successfully Resp : ', resp);
        this.guestCartItems = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
        let saveGuestCartPayload: any = [];

        if (localStorage.getItem('guest') === 'allowed') {
          if (this.guestCartItems && this.guestCartItems.length > 0) {
            this.guestCartItems.forEach((item: any) => {
              saveGuestCartPayload.push({
                product_id: item.id,
                quantity: item.item_quantity
              });
            });
          }

          // if (localStorage.getItem('order_number')) {
          //   saveGuestCartPayload = {
          //     order_id: localStorage.getItem('order_number')
          //   };
          // }
          if (saveGuestCartPayload.length > 0) {
            this.cartService.getAllCartItems().subscribe((resp) => {
              console.log('Get All Cart Items Resp : ', resp);
              if (resp.status) {
                if (resp?.cart_items?.length > 0) {
                  this.cartItems = resp.cart_items;
                  this.cartItems.forEach((item: any) => {
                    saveGuestCartPayload.forEach((guestItem: any) => {
                      if (item.id === guestItem.product_id) {
                        console.log('Item Matched : ', item);
                        this.cartConflictCount += 1;
                        this.displayCartGuestItemsCompare = true;
                      }
                    })
                  });

                } else {
                  this.displayCartGuestItemsCompare = false;
                }
              }
              // this.cartService.patchRequestWithToken('customer/save-guest-cart', { product_details: saveGuestCartPayload }).subscribe((resp) => {
              //   console.log('Guest Attached to Customer Resp : ', resp);
              //   if (resp.status) {
              //     sessionStorage.removeItem('guest-cart-items');
              //   }
              // });
            });
            // this.cartService.patchRequestWithToken('customer/save-guest-cart', { product_details: saveGuestCartPayload }).subscribe((resp) => {
            //   console.log('Guest Attached to Customer Resp : ', resp);
            //   if (resp.status) {
            //     sessionStorage.removeItem('guest-cart-items');
            //   }
            // });
          } else {
            localStorage.removeItem('guest'); // Remove Guest allowed from local storage if user logged in successfully
            this.cartService.cartChangeDetectionSubject.next(true); // Update Cart Count in Header
            if (this.route.snapshot.queryParams.returnUrl) {
              if (+localStorage.getItem('before-login-wishlist-add')!) {
                this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${+localStorage.getItem('before-login-wishlist-add')!}`).subscribe((resp) => {
                  console.log('Wishlist Added Resp After login : ', resp);
                  if (resp?.status) {
                    this.alertService.success('Wishlist Successfully Added');
                    localStorage.removeItem('before-login-wishlist-add');
                  }
                });
              }

              if (localStorage.getItem('product-id-before-login-for-add-to-cart')) {
                let payload = {
                  product_id: JSON.parse(localStorage.getItem('product-id-before-login-for-add-to-cart')!),
                  quantity: 1,
                };
                console.log('Before login payload : ', payload);
                this.cartService.addToCart(payload).subscribe((resp) => {
                  console.log('Add to Cart Resp After Login : ', resp);
                  if (resp.status) {
                    localStorage.removeItem('product-id-before-login-for-add-to-cart');
                    this.alertService.success('Product Added to Cart Successfully');
                  }
                })
              }
              this.router.navigate([this.route.snapshot.queryParams.returnUrl])
            } else {
              this.router.navigate(['/account']); // Navigate to account page if no return url
            }
          }

          // this.cartService.addToCart(saveGuestCartPayload).subscribe((resp) => {
          //   console.log('Guest Cart Resp : ', resp);
          //   if (resp.status) {
          //     sessionStorage.removeItem('guest-cart-items');
          //   }
          // })
        } else {
          localStorage.removeItem('guest'); // Remove Guest allowed from local storage if user logged in successfully
          this.cartService.cartChangeDetectionSubject.next(true); // Update Cart Count in Header
          if (this.route.snapshot.queryParams.returnUrl) {
            if (+localStorage.getItem('before-login-wishlist-add')!) {
              this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${+localStorage.getItem('before-login-wishlist-add')!}`).subscribe((resp) => {
                console.log('Wishlist Added Resp After login : ', resp);
                if (resp?.status) {
                  this.alertService.success('Wishlist Successfully Added');
                  localStorage.removeItem('before-login-wishlist-add');
                }
              });
            }

            if (localStorage.getItem('product-id-before-login-for-add-to-cart')) {
              let payload = {
                product_id: JSON.parse(localStorage.getItem('product-id-before-login-for-add-to-cart')!),
                quantity: 1,
              };
              console.log('Before login payload : ', payload);
              this.cartService.addToCart(payload).subscribe((resp) => {
                console.log('Add to Cart Resp After Login : ', resp);
                if (resp.status) {
                  localStorage.removeItem('product-id-before-login-for-add-to-cart');
                  this.alertService.success('Product Added to Cart Successfully');
                }
              })
            }
            this.router.navigate([this.route.snapshot.queryParams.returnUrl])
          } else {
            this.router.navigate(['/account']); // Navigate to account page if no return url
          }
        }

      } else {
        this.alertMessage = resp.message; // Set the error message to display in the template
      }
    })
  }

  removeCartItem(isGuest: boolean, productId: number, index: number) {
    this.cartConflictCount -= 1;
    if (isGuest) {
      const guestItemIndex = this.guestCartItems.findIndex((item: any) => item.id === productId);
      console.log('Guest Item Index for Remove : ', guestItemIndex);
      this.guestCartItems.splice(guestItemIndex, 1);
      sessionStorage.setItem('guest-cart-items', JSON.stringify(this.guestCartItems));
      console.log('Guest Cart Items After Removed : ', this.guestCartItems);
      this.cartService.cartChangeDetectionSubject.next(true); // Update Cart Count in Header
      this.messageService.add({ severity: 'success', detail: 'Item Removed Successfully' });
      if (this.cartConflictCount === 0) {
        this.displayCartGuestItemsCompare = false;
        this.router.navigate(['/account']);
      }
    } else if (!isGuest) {
      this.cartItems.splice(index, 1);
      this.cartService.cartChangeDetectionSubject.next(true); // Update Cart Count in Header
      this.cartService.removeFromCart(productId).subscribe((resp) => {
        console.log('Remove From Cart Resp : ', resp);
        this.messageService.add({ severity: 'success', detail: resp.message });
      })
      if (this.cartConflictCount === 0) {
        this.displayCartGuestItemsCompare = false;
        this.router.navigate(['/account']);
      }
    }

    if (this.cartConflictCount === 0 && this.guestCartItems && this.guestCartItems.length > 0) {
      this.saveGuestCartToCustomer();
      console.log('Save Guest Cart To Customer : ', this.guestCartItems);
      this.displayCartGuestItemsCompare = false;
      this.router.navigate(['/account']);
    }
  }

  keepInCart() {
    this.saveGuestCartToCustomer();
  }

  saveGuestCartToCustomer() {
    let saveGuestCartPayload: any = [];
    if (this.guestCartItems && this.guestCartItems.length > 0) {
      this.guestCartItems.forEach((item: any) => {
        saveGuestCartPayload.push({
          product_id: item.id,
          quantity: item.item_quantity
        });
      });
    }

    this.cartService.patchRequestWithToken('customer/save-guest-cart', { product_details: saveGuestCartPayload }).pipe(
      map((resp) => {
        return resp[0];
      })
    ).subscribe((resp) => {
      console.log('Guest Attached to Customer Resp : ', resp);
      if (resp.status === true) {
        sessionStorage.removeItem('guest-cart-items');
        this.displayCartGuestItemsCompare = false;
        this.messageService.add({ severity: 'success', detail: 'Cart Items Merged Successfully' });
        this.cartService.cartChangeDetectionSubject.next(true); // Update Cart Count in Header
        this.router.navigate(['/account']);
      }
    });
  }

  /**
   * Handles the form submission when registering a user.
   */
  onRegisterFormSubmit(): void {
    console.log('On Register Form Submitted : ', this.registerForm.value);
    this.registerSubmitted = true;
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    let registrationPayload = {
      ...this.registerForm.value,  // This includes all the form fields
      token: this.route.snapshot.params.token  // Add the token to the payload
    };
    this.commonService.postRequest('register', registrationPayload).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe((resp) => {
      console.log('Register Resp : ', resp);
      this.registerSuccessMsg = '';
      localStorage.removeItem('mobile');
      localStorage.setItem('customer_data', JSON.stringify(resp.data));
      localStorage.setItem('customer_token', resp.data.token);
      if (resp.status) {

        this.registerSubmitted = false;
        // this.registerForm.reset();
        let payloads = {
          product_id: this.userOfferData.product_id,
          quantity: 1,
          ipfl: false
        };
        // this.registerSuccessMsg = 'Successfully Registered. Please Login to Continue.';
        this.cartService.addToCart(payloads).subscribe((resp) => {
          if (resp.status) {
            // this.messageService.add({severity: 'success', detail: resp.message});
            localStorage.removeItem('payload-for-selected-product');
            this.router.navigate(['/checkout'])
            // this.commonService.sidebarCartToggle$.next(true); open Sidebar cart  
          } else if (resp.status === false) {
            this.messageService.add({ severity: resp.status, detail: resp.message });

          }
        })
        // this.commonService.sidebarCartToggle$.next(true); open Sidebar cart  

      } else {
        this.messageService.add({ severity: 'error', detail: resp.message });
      }
    })
  }

  onClickOtpLogin(): void {
    this.isLoginWithOtpForm = !this.isLoginWithOtpForm;
  }

  loginWithEmail(): void {
    console.log('On Click Login With Email : ');
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
          Swal.fire('Error!', resp.Error, 'error');
        }
        if (resp.response) {
          Swal.fire('Warning!', resp.response, 'warning');
        }
      }
    })
  }

  onClickForgotPassword() {
    this.isLoginWithOtpForm = false;
    this.isForgotPasswordForm = true;
  }

  resetPassword(email: any): void {
    if (email) {
      console.log('Reset Password Email : ', email);
      this.commonService.getData(`forgot_password?email=${email}`).subscribe((resp) => {
        if (resp.status === true) {
          this.messageService.add({ severity: 'success', detail: resp.message });
          this.isForgotPasswordForm = false;
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
      })
    }
  }

  handleOtpChange(value: string[]): void {
    // console.log(value);
  }

  handleFillEvent(otp: string): void {
    this.isOtpValue = +otp;
    console.log('Filled OTP : ', this.isOtpValue);
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
        let payload = {
          product_id: this.userOfferData.product_id,
          quantity: 1,
          ipfl: false
        };
        this.cartService.addToCart(payload).subscribe((resp) => {
          if (resp.status) {
            // this.messageService.add({severity: 'success', detail: resp.message});
            localStorage.removeItem('payload-for-selected-product');
            this.router.navigate(['/checkout'])
            // this.commonService.sidebarCartToggle$.next(true); open Sidebar cart  
          } else if (resp.status === false) {
            this.messageService.add({ severity: resp.status, detail: resp.message });

          }
          else {
            this.messageService.add({ severity: 'error', detail: resp.message });
            // this.commonService.sidebarCartToggle$.next(false);  close Sidebar cart  
          }
        })

        // this.router.navigate(['/account'])
      } else {
        this.messageService.add({ severity: 'error', detail: resp.Error });
      }
    })
  }

  resendOtp() {
    console.log('Resend Otp : ', localStorage.getItem('mobile'));
  }

}
