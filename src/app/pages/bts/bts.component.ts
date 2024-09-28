import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../core/helper/must-match-validators';
import { MenuItem, MessageService } from 'primeng/api';
import { CommonService } from '../../core/services/common.service';
import { environment } from '../../../environments/environment';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { AlertService } from 'src/app/core/shared/alert';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import Swal from 'sweetalert2';
import { NgxOtpInputConfig } from "ngx-otp-input";
import { DomSanitizer, Title } from '@angular/platform-browser';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bts',
  templateUrl: './bts.component.html',
  styleUrls: ['./bts.component.scss']
})
export class BtsComponent implements OnInit {
  @ViewChild('scrollTargetElement', { static: false }) scrollTargetElement!: ElementRef;
  stepper: any;
  imgUrl = environment.imgUrl;
  additionalClassAdded: boolean = false;
  additionalClassFour: boolean = false;
  selectedVariantId: number | null = null;
  studentComponentHolder: any;
  selectedCategoryId: number | null = null;
  selectedCategory: any = null;
  stdRegisterForm!: FormGroup;
  LoginForm!: FormGroup;
  documentsForm!: FormGroup;
  submitted = false;
  isItemSelecteds: boolean = false;
  isItemSelectedss: boolean = false;
  isDropdownClicked: boolean = false;
  isItemSelectedDropdown: boolean = false;
  isItemSelected: boolean = false;
  selectedVariant = null;
  selectedProductId!: any;
  selectedProduct: any;
  showVariantDropdown: boolean = false;
  selectedProductVariants = [];
  selectUser = 'Student';
  option = 'New Admission (No ID Card)';
  teacherUser: any;
  selectedVariantSku!: string;
  selectedSku!: string;
  selectedProductVariant!: any;
  // selectedProduct!: any;
  selectedMac!: any;
  isDetailsOpen: { [key: string]: boolean } = {};

  registerSuccessMsg!: String;
  alertMessage!: string;
  isLoading = false;
  check: any;
  url1 = '';
  url2 = '';
  url3 = '';
  url4 = '';
  urls: string[] = [];
  img!: any;
  doc1Name: any;
  doc2Name: any;
  doc3Name = this.option;
  config: SwiperOptions = {
    spaceBetween: 15,
    centeredSlides: true,
    speed: 1200,
    centerInsufficientSlides: false,
    centeredSlidesBounds: true,
    loop: false,
    autoplay: true,
    navigation: true,
    breakpoints: {
      325: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 6,
      },
    },
    scrollbar: { draggable: false },
  };
  visible: boolean = false;
  items !: MenuItem[];
  activeIndex: number = 1;
  isFirstStepOpen: boolean = true;
  isSecondStepOpen: boolean = false;
  isThirdStepOpen: boolean = false;
  isFourthStepOpen: boolean = false;
  isFiveStepOpen: boolean = false;
  activedStep = 0;
  loginForm!: FormGroup;
  isLoginFormSubmitted = false;
  isLoginFormSaving = false;
  isLoginWithOtp = false;
  isOtp = false;
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
  isAwareChecked = true;
  question: any;
  product_varient!: any;
  selectedMacs: any;
  selectedProducts: any;
  selectedcategory: any;

  isDocFormSubmitted = false;
  isCrtAlreadyRegistered: boolean = false;
  showAppleAgreement = false;

  constructor(
    private messageService: MessageService,
    private commonService: CommonService,
    private alertService: AlertService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, private sanitizer: DomSanitizer,
    private titleService: Title,
    private dataLayerService: DataLayerService,
    private location: Location,
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  // Register form
  get f(): { [key: string]: AbstractControl } {
    return this.stdRegisterForm.controls;
  }

  // Login form
  get l(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get k(): { [key: string]: AbstractControl } {
    return this.documentsForm.controls;
  }

  get mobile() {
    let mobileNumber = JSON.parse(localStorage.getItem('mobile')!);
    if (mobileNumber) {
      return mobileNumber
    }
    return null;
  }

  unicornGuide = [{
    guides: 'Exclusive product availability'
  }, {
    guides: 'Dedicated service center'
  }, {
    guides: 'Wide range of accessories'
  }, {
    guides: 'Apple Experts to help customers'
  }, {
    guides: 'Post Product set up after each billing'
  }, {
    guides: 'Dedicated festive offers'
  }]


  scrollToElement() {
    if (this.scrollTargetElement && this.scrollTargetElement.nativeElement) {
      this.scrollTargetElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }


  // #toggle faq question

  faqQuestions = [
    { name: 'How Do I Claim A Student Discount For Apple Products In India?', description: 'To claim a student discount for an Apple product at the Unicorn Store, you must be above 18 years old,actively studying at an institution. We would require your proof of study, a document like your Student ID card. If you are a new student, or a student who Is doing an online course, or a certification and you do not have an ID card, you can submit your fee receipt, bonafide certificate, or previous years mark sheet.', isOpen: false },
    { name: 'How do I claim a teachers discount for Apple Products in India? ', description: 'To claim a teachers discount for an Apple product at the Unicorn Store, you must currently be enrolled as a teacher at an institution, school or college. We would require your official ID card, latest 3 months salary slip, or proof of employment. ', isOpen: false },
    { name: 'Who is eligible for this discount? ', description: 'Students, above 18 years of age, currently enrolled in a field of study, and teachers who are currently employed at an institution are eligible for this discount.', isOpen: false },
    { name: 'Can I get a student discount at the Unicorn Store? ', description: 'Yes, student discounts can be availed at any Unicorn Store in India. You just need valid documentation to avail the discount at the store.', isOpen: false },
    { name: 'How good are Unicorn\'s Apple student discount offers?', description: 'Unicorns back to school offers are one of the best in India. Clubbed with instant store/online discount and other seasonal discounts, Unicorns product pricing is deemed one of the most competitive in the country.', isOpen: false },
    { name: 'Does Apple give a discount on iPad to students? ', description: 'Yes, currently students and teachers get anywhere between 3%-9% additional discount on iPads and MacBooks.', isOpen: false }
  ];

  toggleCollapse(index: number): void {
    this.faqQuestions[index].isOpen = !this.faqQuestions[index].isOpen;
  }

  toggleDetails(index: number) {
    this.faqQuestions[index].isOpen = !this.faqQuestions[index].isOpen;
  }

  /**
   * @desc Login Form Submission Handler
   * */
  onLoginFormSubmitted() {
    this.isLoginFormSubmitted = true;
    console.log('Login Form : ', this.loginForm.value);
    if (this.loginForm.invalid) return;
    this.isLoginFormSubmitted = false;
    this.isLoginFormSaving = true;

    this.authService.login(this.loginForm.value.email_id, this.loginForm.value.login_password).subscribe((resp) => {

      this.alertMessage = '';
      this.isLoginFormSaving = false;
      if (resp && resp.status) {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = false;
        this.isFourthStepOpen = true;
        this.additionalClassFour = true;
        console.log('Login Successfully Resp : ', resp);
        this.commonService.getRequestWithToken('crt/customer_exists').subscribe((resp) => {
          if (resp.crt_already_registered === true) {
            this.isCrtAlreadyRegistered = true;
            this.visible = false;    // Close here dialog 
            Swal.fire({
              title: 'Hello!',
              text: resp.message,
              icon: 'info',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/account']);
              }
            });
          }

        });
        localStorage.removeItem('guest');
        if (localStorage.getItem('order_number')) {
          let payload = {
            order_id: localStorage.getItem('order_number')
          };
          this.cartService.patchRequestWithToken('customer/save-guest-cart', payload).subscribe((resp) => {
            console.log('Guest Attached to Customer Resp : ', resp);
            if (resp.status) {
              sessionStorage.removeItem('guest-cart-items');
            }
          });
        }

        this.cartService.cartChangeDetectionSubject.next(true);
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
            });
          }

        }
      } else {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = true;
        this.isFourthStepOpen = false;
        this.alertMessage = resp.message;
        console.log("rsu", this.alertMessage)
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }, () => {
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = true;
      this.isThirdStepOpen = false;
      this.isFourthStepOpen = false;
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong! please try after some time.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
  }
  verifyMobile(phone: any) {
    console.log('Mobile No : ', phone);
    localStorage.setItem('mobile', phone);
    this.commonService.getData(`login_with_otp?phone=${phone}`).subscribe((resp) => {
      console.log('Login With OTP Resp : ', resp);
      if (resp.status) {
        this.isOtp = true;
        let intervalHolder = setInterval(() => {
          if (this.otpExpires > 0) {
            this.otpExpires = --this.otpExpires;
          } else {
            clearInterval(intervalHolder);
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
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = true;
        // localStorage.setItem('crt_product_data', JSON.stringify(this.selectedProductVariant));selectedProducts
        localStorage.setItem('crt_product_data', JSON.stringify(this.selectedProducts));

      } else {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = true;
        this.isThirdStepOpen = false;
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error'
        });
      }
    })
  }

  resendOtp() {
    console.log('Resend Otp : ', localStorage.getItem('mobile'));
  }

  onInitForm(): void {
    // Register Form
    this.stdRegisterForm = this.fb.group({
      company: ['', Validators.required],
      pincode: ['', Validators.required],
      city: [''],
      state: [''],
      country: [''],
      address1: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
          ),
        ],
      ],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conf_password: ['', Validators.required],
    },
      {
        validators: [MustMatch('password', 'conf_password')],
      }
    );

    // LoginForm
    this.loginForm = this.fb.group({
      email_id: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
      ],
      login_password: ['', [Validators.required]],
    });


    // step 3 Document Form
    this.documentsForm = this.fb.group({
      occupation: ['student', Validators.required],
      docOneName: [''],
      docOneNo: [''],
      docOneFile: [null],
      docTwoName: [''],
      docTwoNo: [''],
      docTwoFile: [null],
      docThreeName: ['new_admission',],
      docThreeNo: [''],
      docThreeFile: [null],
      appleDocAgreement: [null, Validators.required],
    });
  }
  get documentsFormControls(): { [key: string]: AbstractControl } {
    return this.documentsForm.controls;
  }
  // Document Form Submit
  // docFormSubmit() {
  //   this.submitted = true;

  //   console.log('Form Data: ', this.documentsForm.value, 'Form Status: ', this.documentsForm.status);
  //   if (this.documentsForm.invalid) return;

  //   if (!this.isAwareChecked) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Customer undertaking is required',
  //       confirmButtonText: 'Ok',
  //     });
  //     return;
  //   }

  //   let fd = new FormData();
  //   fd.append("sku", "sku");
  //   fd.append("occupation", this.documentsForm.value.occupation);
  //   fd.append("primary_documents[0]['name']", this.documentsForm.value.docOneName);
  //   fd.append("primary_documents[0]['doc_no']", this.documentsForm.value.docOneNo);
  //   if (this.documentsForm.value.docOneFile) {
  //     fd.append("primary_documents[0]['primary_document']", this.documentsForm.value.docOneFile, this.documentsForm.value.docOneFile.name)
  //   }
  //   fd.append("primary_documents[1]['name']", this.documentsForm.value.docTwoName);
  //   fd.append("primary_documents[1]['doc_no']", this.documentsForm.value.docTwoNo);
  //   if (this.documentsForm.value.docTwoFile) {
  //     fd.append("primary_documents[1]['primary_document']", this.documentsForm.value.docTwoFile, this.documentsForm.value.docTwoFile.name)
  //   }
  //   fd.append("secondary_documents[0]['name']", this.documentsForm.value.docThreeName);
  //   fd.append("secondary_documents[0]['doc_no']", this.documentsForm.value.docThreeNo);
  //   if (this.documentsForm.value.docThreeFile) {
  //     fd.append("secondary_documents[0]['secondary_document']", this.documentsForm.value.docThreeFile, this.documentsForm.value.docThreeFile.name)
  //   }
  //   if (this.documentsForm.value.appleDocAgreement) {
  //     fd.append("apple_doc_agreement", this.documentsForm.value.appleDocAgreement, this.documentsForm.value.appleDocAgreement.name)
  //   }
  //   console.log("fb is here", fd)
  //   this.commonService.postRequestWithToken('crt/new_registration', fd).pipe(finalize(() => {
  //     this.submitted = false;
  //   })).subscribe((resp) => {
  //     console.log('FormData :' + JSON.stringify(resp));
  //     if (resp.status) {
  //       this.isFirstStepOpen = false;
  //       this.isSecondStepOpen = false;
  //       this.isThirdStepOpen = false;
  //       this.isFourthStepOpen = false;
  //       this.isFiveStepOpen = true;
  //       Swal.fire({
  //         title: 'Success!',
  //         text: 'Submitted Successfully',
  //         icon: 'success',
  //         confirmButtonText: 'Ok',
  //         timer: 2000
  //       });
  //     } else {
  //       this.isFirstStepOpen = false;
  //       this.isSecondStepOpen = false;
  //       this.isThirdStepOpen = false;
  //       this.isFourthStepOpen = true;
  //       Swal.fire({
  //         title: 'Error!',
  //         text: resp.message,
  //         icon: 'error',
  //         confirmButtonText: 'Ok',
  //       });
  //     }
  //   }, () => {
  //     this.isFirstStepOpen = false;
  //     this.isSecondStepOpen = false;
  //     this.isThirdStepOpen = false;
  //     this.isFourthStepOpen = true;
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Something went wrong! please try after some time.',
  //       icon: 'error',
  //       confirmButtonText: 'Ok',
  //     });
  //   });
  // }
  docFormSubmit() {
    this.submitted = true;
    console.log("DSFDf", this.documentsForm.value.occupation)
    console.log("DSFDsff", this.documentsForm.value.docThreeName)
    this.isDocFormSubmitted = true;
    console.log('CRT Form Data: ', this.documentsForm.controls);
    console.log('CRT Form Valid Status: ', this.documentsForm.status);
    if (this.documentsForm.invalid) return;
    this.submitted = false;
    this.isDocFormSubmitted = false;
    if (!this.isAwareChecked) return;

    if (this.documentsForm.value.occupation === 'teacher') {
      this.documentsForm.patchValue({
        docOneName: 'icard',
      })
    }
    let payload: any = {
      sku: this.selectedProducts.sku,
      occupation: this.documentsForm.value.occupation,

      primary_id_types: `${this.documentsForm.value.docOneName},${this.documentsForm.value.docTwoName}`,
      primary_id_value: {
        [this.documentsForm.value.docOneName]: {
          "doc_file": this.documentsForm.value.docOneFile,
          "doc_no": this.documentsForm.value.docOneNo
        },
        [this.documentsForm.value.docTwoName]: {
          "doc_file": this.documentsForm.value.docTwoFile,
          "doc_no": this.documentsForm.value.docTwoNo
        }
      },

      confirm_doc_name: {
        "upload_doc_0": this.documentsForm.value.appleDocAgreement,
        "upload_doc_1": ''
      }
    };
    console.log("DSFDf", this.documentsForm.value.docThreeName)
    if (this.documentsForm.value.docThreeName !== 'valid_icard' && this.documentsForm.value.occupation === 'student') {
      payload.secondary_id_type = this.documentsForm.value.docThreeName;
      payload.secondary_id_value = {
        [this.documentsForm.value.docThreeName]: {
          "doc_file": this.documentsForm.value.docThreeFile,
          "doc_no": this.documentsForm.value.docThreeNo
        }
      }
    } else {
      payload.secondary_id_type = null;
      payload.secondary_id_value = null;
    }
    console.log('CRT Payload : ', payload);
    this.commonService.postRequestWithToken('crt/new_registration', payload).pipe(finalize(() => {
      this.submitted = false;
      this.isDocFormSubmitted = false;
    })).subscribe((resp) => {
      console.log('FormData :' + JSON.stringify(resp));
      if (resp.status === true) {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = false;
        this.isFourthStepOpen = false;
        this.isFiveStepOpen = true;

        Swal.fire({
          title: 'Success!',
          text: resp.message || 'Successfully Registered',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2000
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/account']);
          }
        });
      } else {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = true;
        this.isFourthStepOpen = false;
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }, () => {
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = true;
      this.isFourthStepOpen = false;
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong! please try after some time.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
  }
  getSafeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.documentsFormControls.appleDocAgreement.value);
  }

  docUploader(event: any, formControl: any) {
    if (event.target.files && event.target.files[0]) {
      let formData = new FormData(); // Create FormData Object
      formData.append('doc_file', event.target.files[0], event.target.files[0].name); // Append Document File
      formData.append('dir_name', 'crt'); // Append Directory Name
      this.commonService.postRequestWithToken('uploader/document_upload', formData).subscribe((resp) => {
        if (resp.status === true) {
          formControl.patchValue(resp.s3_url); // Update Form Control Value With Uploaded Document URL
        } else {
          Swal.fire({
            title: 'Error!',
            text: resp.message,
            icon: 'error',
          });
        }
      }, () => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong! please try after some time.',
          icon: 'error',
        });
      });
    }
  }
  async removeFile(url: string): Promise<boolean> {
    const doc_file = url.split('/').pop();
    const dir_name = 'crt';
    try {
      const resp = await this.commonService.postRequestWithToken(`uploader/document_delete/${doc_file}/${dir_name}`, {}).toPromise();
      console.log('Remove File Resp : ', resp);
      if (resp.status === true) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 3500
        });
        return true;
      } else {
        Swal.fire({
          title: 'Error!',
          text: resp.message,
          icon: 'error',
        });
        return false;
      }
    } catch (error) {
      Swal.fire(
        'Error!',
        'Something went wrong! please refresh the page and try again.',
        'error'
      );
      return false;
    }
  }
  async removeUploadedFileAndReset(formControl: any) {
    console.log('formControl : ', this.documentsFormControls.docOneFile, formControl);
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => result);
    if (result.isConfirmed) {
      const isRemoved = await this.removeFile(formControl.value);
      if (isRemoved) {
        formControl.patchValue(null); // Reset Form Control Value
      }
      console.log('After Removed File Url Form Data : ', this.documentsForm.value);
    }
  }

  removeSpecialChars(str: string) {
    return str.replace(/[^a-zA-Z]/g, ' ');
  }
  onSelectedOccupation() {
    let occupation = this.documentsForm.get('occupation')!.value
    if (occupation === 'teacher') {
      this.documentsForm.patchValue({
        docOneName: 'employee_id',
        docThreeName: 'valid_icard'
      });
      this.docThreeNameChange();
    } else {
      this.documentsForm.patchValue({
        docOneName: '',
        docThreeName: 'new_admission'
      });
      this.docThreeNameChange();
    }
  }

  // onSelectDocOneFile(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.documentsForm.patchValue({
  //       docOneFile: event.target.files[0]
  //     });
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url1 = event.target?.result as string;
  //     }
  //   }
  // }
  docThreeNameChange() {
    let docThreeNameControl = this.documentsForm.get('docThreeName')!;
    let docThreeNoControl = this.documentsForm.get('docThreeNo')!;
    let docThreeFileControl = this.documentsForm.get('docThreeFile')!;
    let docThreeName = this.documentsForm.get('docThreeName')!.value
    console.log('Doc docThreeName : ', docThreeName);
    if (docThreeName === 'new_admission') {
      docThreeNameControl.setValidators([Validators.required]);
      docThreeNoControl.setValidators([Validators.required]);
      docThreeFileControl.setValidators([Validators.required]);
    } else {
      docThreeNameControl.setValidators([Validators.nullValidator]);
      docThreeNoControl.setValidators([Validators.nullValidator]);
      docThreeFileControl.setValidators([Validators.nullValidator]);
    }
    docThreeNameControl.updateValueAndValidity(); // To trigger the new validation
    docThreeNoControl.updateValueAndValidity(); // To trigger the new validation
    docThreeFileControl.updateValueAndValidity(); // To trigger the new validation
  }
  onSelectDocTwoFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.documentsForm.patchValue({
        docTwoFile: event.target.files[0]
      });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url2 = event.target?.result as string;
      }
    }
  }

  onSelectDocThreeFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.documentsForm.patchValue({
        docThreeFile: event.target.files[0]
      });
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url3 = event.target?.result as string;
      }
    }
  }

  onSelectDocFourFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.documentsForm.patchValue({
        appleDocAgreement: event.target.files[0]
      });
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url4 = event.target?.result as string;
          this.urls.push(this.url4);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // onSelectedProduct(id: number) {
  //   console.log('Product Id : ', id);
  //   this.product_varient = id;
  // }

  // onSelectedProducts(item: any) {
  //   console.log('Selected Product: ', item);
  //   this.selectedProductId = item.id;
  //   this.selectedProduct = item.products;
  // }


  onSelectedProduct(item: any) {
    this.selectedcategory = item;
    this.selectedProduct = item.id;
    console.log('Selected Product Variants:', this.selectedProduct);
    this.commonService.getRequest('crt/get_products/' + this.selectedProduct).subscribe((result) => {
      this.selectedMac = result.data;
      console.log("macc", this.selectedMac)
    });
  }

  isSelected(item: any): boolean {
    return this.selectedProductVariant && this.selectedProductVariant.id === item.id;
  }
  
  onSelectedProductss(item: any) {
    this.selectedProductVariant = item;
    // console.log("selected", this.selectedProductVariant)
    this.selectedProducts = item.id;
    // console.log("prody", this.selectedProducts)
    console.log("skjgfsdfd", this.selectedProducts)
    this.commonService.getRequest('crt/get_variants/' + this.selectedProducts).subscribe((result) => {
      this.selectedMacs = result.data;
      console.log("macc", this.selectedMacs)
      this.isItemSelected = true;
    });
  }


  onDropdownChange() {
    this.isItemSelectedDropdown = true;
    this.isItemSelected = true;
    console.log('Selected Products:', this.selectedProducts.sku);
  }
  // onDropdownChange() {
  //   this.isItemSelectedss = true;
  //   console.log('Selected Products:', this.selectedProducts);

  // }

  toggleVariantDropdown() {
    this.showVariantDropdown = !this.showVariantDropdown;
  }

  onVariantSelected(variant: any) {
    console.log('Selected variant:', variant);
    // Handle variant selection logic here
  }

  // onSelectedProducts(id: number) {
  //   console.log('Selected Product: ', id);
  //   this.selectedProduct = {};
  //   this.selectedProductId = id;
  //   this.studentComponentHolder.forEach((el: any) => {
  //     if (el.id === id) {
  //       this.selectedProduct = el.products;
  //       console.log("Selected Product Details: ", this.selectedProduct);

  //     }
  //   });
  // }


  // Fetch Data From API  MRP and Student Offer and Price after cashback
  onSelectedSku(event: any) {
    console.log('sku : ', event.value.sku);
    this.selectedSku = event.value.sku;
    this.selectedProductVariants.filter((el: any) => {
      if (el.sku === event.value.sku) {
        this.selectedProductVariant = el;
      }
    })
  }

  // validation in select product
  goToNextStep(step: string) {

    if (!this.selectedProduct) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select a Category',
      });
      return;
    }

    if (step === 'step-1') {
      console.log('Step 1 Called');
      this.isFirstStepOpen = true;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = false;
      this.additionalClassFour = false;
    } else if (step === 'step-2') {

      console.log('Step 2 Called');
      if (this.authService.isLoggedIn) {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = true;
        this.isThirdStepOpen = false;
        this.additionalClassAdded = true;
        this.additionalClassFour = false;

      } else {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = true;
        this.isThirdStepOpen = false;
        this.additionalClassAdded = true;
        this.additionalClassFour = false;
      }
      // localStorage.setItem('crt_product_data', JSON.stringify(this.selectedProductVariant));selectedProducts

      // localStorage.setItem('crt_product_data', JSON.stringify(this.selectedProducts));

    } else if (step === 'step-3') {

      if (!this.selectedProducts) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Please select a product .',
        });
        return;
      }
      if (!this.isItemSelectedDropdown) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Please select a product variants.',
        });
        return;
      }
      localStorage.setItem('crt_product_data', JSON.stringify(this.selectedProducts));
      if (this.authService.isLoggedIn) {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isFourthStepOpen = true;
        this.additionalClassAdded = true;
        this.additionalClassFour = true;
      } else {
        this.isFirstStepOpen = false;
        this.isSecondStepOpen = false;
        this.isThirdStepOpen = true;
        this.additionalClassAdded = true;
      }

      console.log('Step 3 Called');
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = true;
      this.additionalClassAdded = true;
    }
    else if (step === 'step-4') {
      console.log('Step 4 Called');
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = false;
      this.isFourthStepOpen = false;
      this.isFiveStepOpen = true;
      this.additionalClassFour = true;
      this.additionalClassAdded = true;
    }
    else if (step === 'step-5') {
      console.log('Step 4 Called');
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = false;
      this.isFourthStepOpen = false;
      this.isFiveStepOpen = true;
      this.additionalClassFour = true;
      this.additionalClassAdded = true;
    }
  }
  toggleAdditionalClass() {
    if (this.isSecondStepOpen) {
      this.additionalClassAdded = true;
    } else {
      this.additionalClassAdded = false;
    }
  }

  onClickThirdStepBack() {
    localStorage.removeItem('crt_product_data');
    // this.selectedProductVariant = {};
    this.selectedProducts = {};

    this.selectedProductId = 0;
    this.selectedSku = '';
    if (this.authService.isLoggedIn) {
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = true;
      this.isThirdStepOpen = false;
      this.isFourthStepOpen = false;
      this.additionalClassFour = false;
    } else {
      this.isFirstStepOpen = false;
      this.isSecondStepOpen = true;
      this.isThirdStepOpen = false;
      this.additionalClassFour = false;
    }
  }
  onClickSecondStepBack() {
    localStorage.removeItem('crt_product_data');
    // this.selectedProductVariant = {};
    this.selectedProducts = {};

    this.selectedProductId = 0;
    this.selectedSku = '';
    if (this.authService.isLoggedIn) {
      this.isFirstStepOpen = true;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = false;
      this.isFourthStepOpen = false;
      this.additionalClassAdded = false;

    } else {
      this.isFirstStepOpen = true;
      this.isSecondStepOpen = false;
      this.isThirdStepOpen = false;
      this.additionalClassAdded = false;

    }
  }

  showDialog() {
    this.visible = true;
  }

  // RegisterForm Submit
  onRegisterFormSubmitted() {
    console.log('On Register Form Submitted : ', this.stdRegisterForm.value);
    this.submitted = true;
    if (this.stdRegisterForm.invalid) return;
    let formData = {
      ...this.stdRegisterForm.value,
    };
    delete formData.conf_password;
    this.isLoading = true;
    this.commonService.postRequestWithToken('register', formData).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe((resp: any) => {
      console.log('Register Resp : ', resp);
      this.registerSuccessMsg = '';
      if (resp.status) {
        this.submitted = false;
        this.stdRegisterForm.reset();
        this.messageService.add({
          severity: 'success',
          detail: 'Successfully Registered. Please Login to Continue.',
        });
      } else {
        this.alertService.info(resp.msg);
        this.messageService.add({
          severity: 'error',
          detail: 'Error accurs',
        });
      }
    });
  }


  onRegisterFormReset(): void {
    this.submitted = false;
    this.stdRegisterForm.reset();
  }

  ngOnInit() {
    this.titleService.setTitle('Back to school | Unicornstore');
    this.fireGA4EventOnPageLoad();
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.onInitForm();
    this.commonService.getRequest('crt/get_categories').subscribe((result) => {
      this.studentComponentHolder = result.data;
    });

    this.commonService.getRequest('crt/get_all_products?landing_page=ture').subscribe((result) => {
      this.selectedMac = result;
    });

    this.commonService.getRequestWithToken('crt/customer_exists').subscribe((resp) => {
      if (resp.crt_already_registered === true) {
        this.isCrtAlreadyRegistered = true;
        Swal.fire({
          title: 'Hello!',
          text: resp.message,
          icon: 'info',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/account']);
          }
        });
      }
    });
  }


  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Back to School | Unicornstore',
    });
  }



  next() {
    this.stepper.next();
  }

  crt_check() {
    this.commonService.getRequestWithToken('crt/customer_exists').subscribe((resp) => {
      if (resp.crt_already_registered === true) {
        this.isCrtAlreadyRegistered = true;
        Swal.fire({
          title: 'Hello!',
          text: resp.message,
          icon: 'info',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/account']);
          }
        });
      }
    });
  }
  prevStep(step: number) {
    this.activedStep = step - 1;
    this.items = [{
      label: 'Select Product',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({ severity: 'info', summary: 'Select Product', detail: event.item.label });
      }
    },
    {
      label: 'Register & Enrollment',
      command: (event: any) => {
        this.activeIndex = 1;
        this.messageService.add({ severity: 'info', summary: 'Register & Enrollment', detail: event.item.label });
      }
    },
    {
      label: 'Document',
      command: (event: any) => {
        this.activeIndex = 2;
        this.messageService.add({ severity: 'info', summary: 'Document', detail: event.item.label });
      }
    },
    {
      label: 'Finish',
      command: (event: any) => {
        this.activeIndex = 3;
        this.messageService.add({ severity: 'info', summary: 'Finish', detail: event.item.label });
      }
    }
    ];
  }


}


