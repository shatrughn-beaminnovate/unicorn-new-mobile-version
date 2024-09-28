import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import { CommonService } from "../../core/services/common.service";
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-cashify-modal',
  templateUrl: './cashify-modal.component.html',
  styleUrls: ['./cashify-modal.component.scss']
})
export class CashifyModalComponent implements OnInit {
  @Output() afterModalHide = new EventEmitter();
  isCashifyModalShow = false;
  isIntroStepOpen = true;
  isFirstStepOpen = false;
  isSecondStepOpen = false;
  isThirdStepOpen = false;
  isFourthStepOpen = false;
  isFifthStepOpen = false;
  isSixthStepOpen = false;
  isFinalStepOpen = false;
  isPhoneSwitchOn = 'Y';
  pincode = new FormControl('');
  isCheckPinLoading: boolean = false;
  isPinCodeAvailable = false;
  isPinCodeError = {status: false, msg: ''};
  pinCodeResponse: any = { status: false, msg: '' };

  brands: any = [];
  selectedBrand!: any;
  isBrandLoading: boolean = false;

  products: any = [];
  selectedProduct!: any;
  isProductLoading: boolean = false;

  variants: any = [];
  selectedVariant!: any;
  isVariantLoading: boolean = false;

  imei!: number;
  isImeiLoading: boolean = false;
  isImeiValid: boolean = false;
  isImeiError: boolean = false;
  imeiErrorMsg: string = '';


  isQuoteLoading = false;
  quoteDetails: any = {};
  isQuoteValid: boolean = false;

  isAllianceMobileSwitchOn!: string;
  isAllianceFunctionalCondition!: string;
  isAllianceBodyCondition!: string;
  isAllianceScreenCondition!: string;

  cashifyQuoteResponseStatus!: string;
  cashifyQuoteResponseMsg!: string;

  isCashifyCouponLoading = false;

  isCashifyCouponError!: string;
  cashifyCouponErrorMsg!: string;

  cashifyCouponCode!: number;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
  ) {
  }

  get getExchangeProductDetails() {
    return JSON.parse(sessionStorage.getItem('exchange-details') || '{}');
  }

  ngOnInit(): void {
    // this.pincode.valueChanges.pipe(debounceTime(1000)).subscribe(pinCode => {
    //   // Empty the response and error message before checking pincode again
    //   this.pinCodeResponse = { status: false, msg: '' };
    //   this.isPinCodeError = { status: false, msg: '' };
    //   this.isPinCodeAvailable = false;
    //   if (pinCode && pinCode.length == 6) {
    //     this.checkPin();
    //   }
    // });
  }

  show() {
    console.log('Cashify Modal Opened : ');
    this.isCashifyModalShow = true;

  }

  checkPin() {
    // Empty the response and error message before checking pincode again
    this.pinCodeResponse = { status: false, msg: '' };
    this.isPinCodeError = { status: false, msg: '' };
    this.isPinCodeAvailable = false;

    if (this.pincode.value === '') {
      this.isPinCodeError.status = true;
      this.isPinCodeError.msg = 'Pincode is required';
      return;
    }
    let pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(this.pincode.value)) {
      this.isPinCodeError.status = true;
      this.isPinCodeError.msg = 'Invalid Pincode';
      return;
    }
    this.isCheckPinLoading = true;
    this.commonService.getRequest(`cashify/get-all-pincodes/${this.pincode.value}`).subscribe((result) => {
      console.log('All Pin By Cashify : ', result);
      // {"status":true,"message":"the pincode is serviceable"}
      this.isCheckPinLoading = false;
      if (result && result.status === true) {
        sessionStorage.setItem('exchange-details', JSON.stringify(result.data));
        this.isPinCodeAvailable = true;
        this.pinCodeResponse.status = true;
        this.pinCodeResponse.msg = result.message;
      } else {
        this.isPinCodeAvailable = false;
        this.isPinCodeError.status = true;
        this.isPinCodeError.msg = result.message;
      }
    }, (error) => {
      this.isCheckPinLoading = false;
      this.isPinCodeAvailable = false;
      this.isPinCodeError.status = true;
      this.isPinCodeError.msg = error.error.message || 'Something went wrong, Please try again later.';
    });
  }

  nextStepClick(step: string) {
    console.log('Next Step Clicked : ', step);
    this.isIntroStepOpen = false;
    this.isFirstStepOpen = false;
    this.isSecondStepOpen = false;
    this.isThirdStepOpen = false;
    this.isFourthStepOpen = false;
    this.isFifthStepOpen = false;
    this.isSixthStepOpen = false;
    this.isFinalStepOpen = false;
    switch (step) {
      case 'goto-step-1':
        this.isFirstStepOpen = true;
        break;
      case 'goto-step-2':
        // Get All Brands By Pincode and show in dropdown list in step 2
        this.getBrands();
        this.isSecondStepOpen = true;
        break;
      case 'goto-step-3':
        // Check if brand is selected or not and check product is selected or not and variants is selected or not and check imei is valid or not then go to step 3
        // this.isThirdStepOpen = true;
        // break;
        if (!this.selectedBrand) {
          this.messageService.add({ severity: 'warn', detail: 'Please select brand' });
          this.isSecondStepOpen = true;
          this.isThirdStepOpen = false;
          break;
        } else if (!this.selectedProduct) {
          this.messageService.add({ severity: 'warn', detail: 'Please select product' });
          this.isSecondStepOpen = true;
          this.isThirdStepOpen = false;
          break;
        } else if (!this.selectedVariant) {
          this.messageService.add({ severity: 'warn', detail: 'Please select variant' });
          this.isSecondStepOpen = true;
          this.isThirdStepOpen = false;
          break;
        } else if (!this.imei) {
          this.messageService.add({ severity: 'warn', detail: 'Please enter IMEI' });
          this.isSecondStepOpen = true;
          this.isThirdStepOpen = false;
          break;
        }
        this.handleImeiAPICall(this.imei)
        break;
      case 'goto-step-4':
        this.onSubmitQuote();
        break;
      case 'goto-step-5':
        this.isFifthStepOpen = true;
        break;
      case 'goto-step-6':
        this.isSixthStepOpen = true;
        break;
      case 'goto-step-final':
        this.isFinalStepOpen = true;
        break;
    }
  }

  stepBack(backStep: string) {
    console.log('Step Back : ', backStep);
    console.log('Next Step Clicked : ', backStep);
    this.isIntroStepOpen = false;
    this.isFirstStepOpen = false;
    this.isSecondStepOpen = false;
    this.isThirdStepOpen = false;
    this.isFourthStepOpen = false;
    this.isFifthStepOpen = false;
    this.isSixthStepOpen = false;
    this.isFinalStepOpen = false;
    switch (backStep) {
      case 'goto-intro-step':
        this.isIntroStepOpen = true;
        break;
      case 'goto-step-1':
        this.isFirstStepOpen = true;
        break;
      case 'goto-step-2':
        this.isSecondStepOpen = true;
        break;
      case 'goto-step-3':
        this.isThirdStepOpen = true;
        break;
      case 'goto-step-4':
        this.isFourthStepOpen = true;
        break;
      case 'goto-step-5':
        this.isFifthStepOpen = true;
        break;
      case 'goto-step-6':
        this.isSixthStepOpen = true;
        break;
      case 'goto-step-final':
        this.isFinalStepOpen = true;
        break;
      default:
        break;
    }
  }

  getBrands() {
    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    const payload = {
      pincode: exchangeDetails.pincode,
      tier: exchangeDetails.tier,
    }

    this.isBrandLoading = true;
    this.commonService.postRequest(`cashify/get_brands_by_pincode`, payload).subscribe((result) => {
      console.log('All Brands By Cashify : ', result);
      this.isBrandLoading = false;
      if (result && result.status === true) {
        this.brands = result.data.dt;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Something went wrong, Please try again later.',
        })
      }
    }, (error) => {
      this.isBrandLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message || 'Something went wrong, Please try again later.',
      })
    });
  }

  onBrandSelected() {
    console.log('Brand Changed : ', this.selectedBrand);
    sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), ...this.selectedBrand }));
    this.getProducts();
  }

  onProductSelected() {
    console.log('Product Changed : ', this.selectedProduct);
    sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), ...this.selectedProduct }));
    this.getVariants();
  }

  onVariantSelected() {
    console.log('Variant Changed : ', this.selectedVariant);
    sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), ...this.selectedVariant }));

  }

  getProducts() {
    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    const payload = {
      pincode: this.pincode.value,
      tier: exchangeDetails.tier,
      brandId: exchangeDetails.brandId,
    }
    this.isProductLoading = true;
    this.commonService.postRequest(`cashify/get_product_list`, payload).subscribe((result) => {
      console.log('All Products By Cashify : ', result);
      this.isProductLoading = false;
      if (result && result.status === true) {
        this.products = result.data.dt;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Something went wrong, Please try again later.',
        })
      }
    }, (error) => {
      this.isProductLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message || 'Something went wrong, Please try again later.',
      })
    });
  }

  getVariants() {
    this.isVariantLoading = true;
    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    const payload = {
      pincode: exchangeDetails.pincode,
      tier: exchangeDetails.tier,
      brandId: exchangeDetails.brandId,
      product_id: exchangeDetails.id,
      device_type: 'mobile',
    }
    this.commonService.postRequest(`cashify/get_all_variants`, payload).subscribe((result) => {
      console.log('All Variants By Cashify : ', result);
      this.isVariantLoading = false;

      if (result && result.status === true) {
        this.variants = result.data.dt;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Something went wrong, Please try again later.',
        })
      }
    }, (error) => {
      this.isVariantLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message || 'Something went wrong, Please try again later.',
      })
    });
  }

  handleImeiAPICall(deviceImei: number) {
    this.isImeiLoading = true;
    this.isImeiError = false;
    this.imeiErrorMsg = '';
    const payload = {
      pincode: JSON.parse(sessionStorage.getItem('exchange-details')!).pincode,
      imei: deviceImei
    }
    this.isSecondStepOpen = true;
    this.isThirdStepOpen = false;
    this.commonService.postRequest(`cashify/get_device_details`, payload).subscribe((result) => {
      console.log('All IMEI Details By Cashify : ', result);
      this.isImeiLoading = false;
      if (result && result.status === true) {
        if (result.data.ir == false) {
          this.isSecondStepOpen = true;
          this.isThirdStepOpen = false;
          this.isImeiError = true;
          this.imeiErrorMsg = result.data.message;
        } else {
          // check product is available or not
          if (result.data.dt.findIndex((item: any) => item.id === JSON.parse(sessionStorage.getItem('exchange-details')!).id) !== -1) {
            this.isSecondStepOpen = false;
            this.isThirdStepOpen = true;
            this.isImeiValid = true;
            sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), imei: deviceImei }));
          } else {
            this.isSecondStepOpen = true;
            this.isThirdStepOpen = false;
            this.isImeiError = true;
            this.imeiErrorMsg = 'Product is not available for this IMEI.';
            this.isImeiValid = false;
          }
        }
      } else {
        this.isSecondStepOpen = true;
        this.isThirdStepOpen = false;
        this.isImeiError = true;
        this.imeiErrorMsg = result.message || 'Something went wrong, Please try again later.';
      }
    }, (error) => {
      this.isSecondStepOpen = true;
      this.isThirdStepOpen = false;
      this.isImeiLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, Please try again later.',
      });
    });
  }

  onSubmitQuote() {
    this.cashifyQuoteResponseStatus = '';
    this.cashifyQuoteResponseMsg = '';
    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    const payload = {
      imei: exchangeDetails.imei,
      serialNo: '',
      productId: exchangeDetails.id,
      pincode: exchangeDetails.pincode,
      cec: '',
      productLineName: 'mobile-phone',
      quoteQuestions: [
        {
          text: 'allianceMobileSwitchOn',
          value: this.isAllianceMobileSwitchOn === 'Y'
        },
        {
          text: 'allianceFunctionalCondition',
          value: this.isAllianceFunctionalCondition === 'Y'
        },
        {
          text: 'allianceBodyCondition',
          value: this.isAllianceBodyCondition === 'Y'
        },
        {
          text: 'allianceScreenCondition',
          value: this.isAllianceScreenCondition === 'Y'
        }
      ]
    }
    this.isQuoteLoading = true;
    this.isThirdStepOpen = true;
    this.commonService.postRequest(`cashify/quote_with_questions`, payload).subscribe((result) => {
      console.log('All Quote Details By Cashify : ', result);
      this.isQuoteLoading = false;
      if (result && result.status === true) {
        this.quoteDetails = result.data;
        if (result.data.ir == false) {
          this.isQuoteValid = false;
          this.cashifyQuoteResponseStatus = 'error';
          this.cashifyQuoteResponseMsg = result.data.message;
          return;
        } else {
          sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), ...result.data }));
          this.isQuoteValid = true;
          this.isThirdStepOpen = false;
          this.isFourthStepOpen = true;
        }
      } else {
        this.isQuoteValid = false;
        this.isThirdStepOpen = true;
        this.isFourthStepOpen = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.message || 'Something went wrong, Please try again later.',
        })
      }
    }, (error) => {
      this.isQuoteLoading = false;
      this.isQuoteValid = false;
      this.isFourthStepOpen = true;
      this.isFifthStepOpen = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message || 'Something went wrong, Please try again later.',
      })
    });
  }

  /**
   * @desc To apply coupon code for cashify 
   */
  applyCashifyCoupon() {
    this.isCashifyCouponLoading = true;
    this.isCashifyCouponError = '';
    this.cashifyCouponErrorMsg = '';

    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    const payload = {
      couponCode: this.cashifyCouponCode,
      quoteId: exchangeDetails.quoteId,
      pincode: exchangeDetails.pincode,
      exchangeProductId: exchangeDetails.id,
      name: '',
      email: '',
      mobile: '',
    }
    this.commonService.postRequest(`cashify/apply_coupon`, payload).subscribe((result) => {
      console.log('All Coupon Details By Cashify : ', result);
      this.isCashifyCouponLoading = false;
      if (result && result.status === true) {
        if (result.data.ir == false) {
          this.isCashifyCouponError = 'error';
          this.cashifyCouponErrorMsg = result.data.message;
          return;
        } else {
          this.isCashifyCouponError = '';
          this.cashifyCouponErrorMsg = '';
          this.isFifthStepOpen = true;
          sessionStorage.setItem('exchange-details', JSON.stringify({ ...JSON.parse(sessionStorage.getItem('exchange-details')!), ...result.data }));
        }
      } else {
        this.isCashifyCouponError = 'error';
        this.cashifyCouponErrorMsg = result.message || 'Something went wrong, Please try again later.';
      }
    }, (error) => {
      this.isCashifyCouponLoading = false;
      this.isCashifyCouponError = 'error';
      this.cashifyCouponErrorMsg = error.error.message || 'Something went wrong, Please try again later.';
    });
  }

  proceedWithCashify() {
    this.isCashifyModalShow = false;
    Swal.fire({
      icon: 'success',
      title: 'Successfully Saved!',
      text: 'The details has been saved, please continue to checkout!',
      confirmButtonText: 'Continue',
    })
  }

  onModalHide() {
    console.log('Cleared Data : ');
    const exchangeDetails = JSON.parse(sessionStorage.getItem('exchange-details')!);
    let status = !!(exchangeDetails?.couponPrice ? exchangeDetails?.newQuotePrice : exchangeDetails?.buyBackPrice);
    this.afterModalHide.emit(status);
  }

  onBrandImageNotFound(event: any) {
    event.target.src = 'assets/img/not-found/no-image-found.png';
  }
}
