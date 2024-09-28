import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blinkit-order-placed',
  templateUrl: './blinkit-order-placed.component.html',
  styleUrls: ['./blinkit-order-placed.component.scss']
})
export class BlinkitOrderPlacedComponent implements OnInit {
  adt!: number;
  url!: string;
  intervalId: any;
  orderNumber!: string | number;
  confirmedOrderNumber!: string | number;
  isOrderConfirmed = false;
  isOrderVerifying = false;
  constructor(private route: ActivatedRoute, private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.adt = Number(params['auto_dismiss_time']);
    });

    this.route.params.subscribe(params => {
      this.orderNumber = params['orderId'];
    });

    if (this.url && this.adt) {
      this.intervalId = setInterval(() => {
        document.getElementById('redirect_timer')!.innerText = this.adt + 's';
        this.adt = this.adt - 1;
        if (this.adt < 0) {
          clearInterval(this.intervalId);
        }
      }, 1000);

      setTimeout(() => {
        window.open(this.url, '_self');
        clearInterval(this.intervalId);
      }, this.adt * 1000);
    }


    // this.isOrderVerifying = true;
    // this.commonService.postRequest(`blinkit/order_placed/${this.orderNumber}?url=${this.url}&auto_dismiss_time=${this.adt}`, {}).subscribe((res) => {
    //   console.log(res);
      
    //   this.isOrderVerifying = false;
    //   if (this.url && this.adt) {
    //     this.intervalId = setInterval(() => {
    //       document.getElementById('redirect_timer')!.innerText = this.adt + 's';
    //       this.adt = this.adt - 1;
    //       if (this.adt < 0) {
    //         clearInterval(this.intervalId);
    //       }
    //     }, 1000);

    //     setTimeout(() => {
    //       window.open(this.url, '_self');
    //       clearInterval(this.intervalId);
    //     }, this.adt * 1000);
    //   }

    //   if (res.status === 'success') {
    //     this.isOrderConfirmed = true;
    //     this.confirmedOrderNumber = res.data.order_number;
    //   } else {
    //     Swal.fire({
    //       title: res.status,
    //       html: res.message + '<br><br> Redirect in - ' + this.adt.toString() + 's',
    //       icon: res.status,
    //       showConfirmButton: false,
    //       showCancelButton: false
    //     });
    //   }
    // });
  }
}