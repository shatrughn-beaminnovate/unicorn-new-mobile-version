import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.scss']
})
export class BestsellersComponent implements OnInit {
  swiperConfigs = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      368: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      }, 380: {
        slidesPerView: 1,
        spaceBetween: 1,
        navigator: false
      },
      508: {
        slidesPerView: 1,
        spaceBetween: 5,
        navigator: false
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigator: false
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        navigator: false
      },
      1030: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigator: false
      },
      1600: {
        slidesPerView: 6,
        spaceBetween: 20,
        navigator: false
      }
    }
  }
  bts = [{
    "id": "37",
    "name": "iPhone 15 Pink 128GB",
    "slug": "iphone-15-pink-128-gb",
    "sku": "MTP13HN\/A",
    "images": [
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "a57ab34d757a2e01f95d858d7.jpg"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "60090eb5a66b59a2188fa07db.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "842347060bf7f0728b14176c6.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "241fffbce0548f09f6f767993.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "c615869bf3a9b47f66decf313.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "08049c56ea4fb734981cc58b8.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "8efc8941b128e47b2d06a6812.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "62e721cea4b9a173125521ae4.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "b7434b904fe633f7c7e82cf92.png"
      },
      {
        "alt": "",
        "caption": "",
        "sequence": 0,
        "filename": "1b764daffcd5942a69b1563dd.png"
      }
    ],
    "price": "79900.00",
    "saleprice": "71111.00",
    "average_rating": "0",
    "product_type": "configurable",
    "total_quantity_sold": "1",
    "product": true
  },]
  imgUrl = environment.imgUrl;
  loading: boolean = false;
  bestsellersHolder: any[] = [];
  constructor(private commonService: CommonService, private dataLayerService: DataLayerService) { }

  ngOnInit(): void {
    this.fetchData();
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
  }

  fireBestSellersGAEvents(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: item.category ? 'accessories' : 'product',
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "bestsellers",
        item_list_name: "Bestsellers",
        items: items
      }
    });
  }

  fireBestSellersSelectGAEvents(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "bestsellers",
        item_list_name: "Bestsellers",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: item.category ? 'accessories' : 'product',
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }

  fireVerticalBannerPromotionGA4Event() {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_promotion",
      ecommerce: {
        creative_name: "Buy an AirPods Pro",
        creative_slot: "vertical_banner_2",
        promotion_id: "vertical_banner_2",
        promotion_name: "AirPods Pro",
      }
    });
  }

  fetchData() {
    this.commonService.getData('best_seller').subscribe((result) => {
      this.bestsellersHolder = result;
      console.log(this.bestsellersHolder)
      // this.commonService.setBestsellers(result);
      this.bestsellersHolder.forEach((product: any) => {
        product.salePercentage = this.calculateSalePercentage(product);
      });
      this.loading = false;
      this.fireBestSellersGAEvents(this.bestsellersHolder);
      this.fireVerticalBannerPromotionGA4Event()
    });
  }

  // calculateSalePercentage(product: any): number {
  //   const salePercentage = ((product.price - product.saleprice) / product.price) * 100;
  //   return Math.round(salePercentage);
  // }
  calculateSalePercentage(product: any): string {
    if (product.price === 0 && product.saleprice === 0) {
      return "0% off";
    } else if (typeof product.price === 'string' && typeof product.saleprice === 'string') {
      // Convert price and saleprice to numbers if they are strings
      const price = parseFloat(product.price);
      const saleprice = parseFloat(product.saleprice);
      if (price === 0 && saleprice === 0) {
        return "0% off";
      }
    }

    const salePercentage = ((product.price - product.saleprice) / product.price) * 100;
    return Math.round(salePercentage) + "% off";
  }
  getRouterLink(re_product: any): any[] {
    let type: string;
    if (re_product.product) {
      type = 'product';
    } else if (re_product.accessory) {
      type = 'accessories';
    } else {
      type = '';
    }
    return ['/', type, re_product.slug];
  }


}
