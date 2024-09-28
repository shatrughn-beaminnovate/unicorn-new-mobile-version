import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-notify-me-modal',
  templateUrl: './notify-me-modal.component.html',
  styleUrls: ['./notify-me-modal.component.scss']
})
export class NotifyMeModalComponent implements OnInit {
  isNotifyMeModalShow = false;
  isOtpSent = false;
  isOtpResendTimerStart = 30;
  loading = false;
  customerName!: string;
  mobile!: string;
  otp!: string;
  productId!: number;
  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
  }

  show(productId: number) {
    this.productId = productId;
    this.isNotifyMeModalShow = true;
  }

  sendOtp() {
    // TODO: Notify Me API Integration
    let success = true;
    if (!this.customerName) {
      success = false;
      Swal.fire({ icon: 'error', title: 'Error', html: 'Please enter name', timer: 5000 });
    }

    if (!success) return;

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!this.mobile) {
      success = false;
      Swal.fire({ icon: 'error', title: 'Error', html: 'Please enter mobile number', timer: 5000 });
    }

    if (!mobileRegex.test(this.mobile)) {
      success = false;
      Swal.fire({ icon: 'error', title: 'Error', html: 'Please enter valid mobile number', timer: 5000 });
    }

    if (!success) return;

    if (success) {
      this.loading = true;
      this.commonService.postRequest('validate_number', { phone: this.mobile }).subscribe((res: any) => {
        console.log('validate_number resp : ', res);
        if (res.status === true) {
          this.isOtpSent = true;
          let intervalHolder = setInterval(() => {
            this.loading = false;
            if (+this.isOtpResendTimerStart == 0) {
              clearInterval(intervalHolder);
              return;
            }
            this.isOtpResendTimerStart -= 1;
          }, 1000);
        } else {
          this.loading = false;
          this.isOtpSent = false;
          Swal.fire({ icon: 'error', title: 'Error', text: res.response || 'Please enter valid mobile number', timer: 5000 });
        }
      }, () => {
        this.loading = false;
        this.isOtpSent = false;
        Swal.fire({ icon: 'error', title: 'Error', html: 'Something went wrong', timer: 5000 });
      });
    }
  }

  verifyOtp() {
    const payload = {
      phone: this.mobile,
      name: this.customerName,
      otp: this.otp,
      product_id: this.productId,
    };
    this.commonService.postRequest('verify_otp', payload).subscribe((res: any) => {
      console.log('Verify_otp Resp : ', res);
      if (res.status === true) {
        Swal.fire({ icon: 'success', title: 'Success', html: res.message || 'Thank You! <br> When product is available you got a mail', timer: 5000 })?.then(() => {
          this.isNotifyMeModalShow = false;
        });
      } else {
        Swal.fire({ icon: 'error', title: 'Error', html: res.message || 'Please enter valid OTP', timer: 5000 });
      }
    });
  }

  clearInput() { this.customerName = ''; this.mobile = ''; this.otp = ''; }
}
