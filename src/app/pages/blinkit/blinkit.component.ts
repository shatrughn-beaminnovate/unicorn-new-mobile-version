import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blinkit',
  templateUrl: './blinkit.component.html',
  styleUrls: ['./blinkit.component.scss']
})
export class BlinkitComponent implements OnInit, OnDestroy {

  blinkitProduct!: any;
  productImage = '';
  imgUrl = environment.imgUrl;
  url = '';
  queryParam!: any;

  blinkitData!: any;
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    let id = 0;
    this.route.params.subscribe((params) => {
      console.log('Params:', params);
      id = params.id;
    });

    if (!id) {
      this.router.navigate(['/page-not-found']);
      return;
    }

    // Get Query Params from URL
    this.route.queryParams.subscribe((params) => {
      console.log('queryParams:', params);
      this.url = params.url;
      this.queryParam = params;
      this.getBlinkitProduct(id, params.url, params.key);
    });
  }

  getBlinkitProduct(id: number, url: string, key: string) {
    this.commonService.postRequest(`blinkit/product/${id}?url=${url}&action=${this.queryParam.action}&key=${key}`, {}).subscribe((res) => {
      console.log(res);
      if (+res.redirect === 404) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      if (res.status === 'success') {
        this.blinkitData = res.data;
        this.blinkitProduct = res?.data?.product || null;
        this.productImage = res.data.primary_image ? res.data.primary_image.filename : '';
      }
    });
  }

  confirmOrder() {
    console.log('Order Confirmed');
    window.open('blinkit/order_placed/155549043834585?url=https://www.zomato.com&auto_dismiss_time=5', '_blank');
    // this.commonService.postRequest(`blinkit/order_placed/155549043834585?url=https://www.zomato.com&auto_dismiss_time=5`, {}).subscribe((res) => {
    //   console.log(res);
    // });
  }

  ngOnDestroy() {
    console.log('Destroying');
    this.blinkitProduct = null;
    this.productImage = '';
    this.imgUrl = environment.imgUrl;
    this.url = '';
    this.queryParam = null;
    this.blinkitData = null;
  }

}
