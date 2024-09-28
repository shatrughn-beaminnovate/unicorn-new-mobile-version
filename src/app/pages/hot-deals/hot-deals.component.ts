import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss']
})
export class HotDealsComponent implements OnInit {
  hotDealsHolder: any[] = [];
  imgUrl = environment.imgUrl;
  customOptions: OwlOptions = {};
  constructor(
    private commonService: CommonService,
    private router: Router,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private location: Location
  ) {
    this.customOptions = {
      loop: true,
      margin: 15,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      stagePadding: 50,
      dots: true,
      navSpeed: 700,
      navText: ['<', '>'],
      responsive: {
        0: {
          items: 1,
          nav: false,
          stagePadding: 30,
        },
        425: {
          items: 2,
          nav: false,
          stagePadding: 30,
        },
        768: {
          items: 3,
          nav: false,
          stagePadding: 30,
        },
        1024: {
          items: 4,
          nav: true,
        },
        1440: {
          items: 5,
          nav: true,
        }
      }
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Hot Deals | Unicornstore');
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    this.commonService.getData('get_theme/hot-deals').subscribe((result) => {
      this.hotDealsHolder = result;
      console.log("hot-deals :", result);
      this.dataLayerService.push({ "ecommerce": null }); // Clear the previous ecommerce object.
      this.dataLayerService.push({
        event: "view_item_list",
        ecommerce: {
          item_list_id: "hot_deals",
          item_list_name: "Hot Deals",
          items: this.hotDealsHolder.map((item: any, index: any) => ({
            item_id: item.component_values[index].product_id,
            item_name: item.component_values[index].product_name,
            item_price: item.component_values[index].price,
            item_saleprice: item.component_values[index].saleprice,
            item_index: index,
          })),
        },
      });
      console.log("Hot Deals dataLayer :", (window as any).dataLayer);

    });
  }

  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Hot Deals | Unicornstore',
    });
  }

  isKeyExist(item: any, type: string) {
    return item.hasOwnProperty(type);
  }

  handleImageError(event: any, item: any) {
    event.target.src = this.imgUrl + '/medium/' + item?.image;
  }

  onClickType(slug: string) {
    this.router.navigate(['type', slug], { queryParams: { type: true } });
    // this.messageService.add({severity: 'error', detail: 'Work Inprogress'});
  }

}
