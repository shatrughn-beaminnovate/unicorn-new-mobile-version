import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-deals-of-the-day',
  templateUrl: './deals-of-the-day.component.html',
  styleUrls: ['./deals-of-the-day.component.scss']
})
export class DealsOfTheDayComponent implements OnInit {
  configOptions = {
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
        slidesPerView: 3,
        spaceBetween: 10,
        navigator: false

      }, 1440: {
        slidesPerView: 4,
        spaceBetween: 10,
        navigator: false

      },
      1600: {
        slidesPerView: 4,
        spaceBetween: 10,
        navigator: false

      }
    }
  }
  products = [
    {
      "id": 67,
      rating: 5,
      "href": "https://shop.unicornstore.in/type/iphone-15-pro2",
      "sku": "I1P1GWT586",
      "name": "iPhone 15 Pro 128GB White Titanium",
      "slug": "iphone-15-pro-128-gb-white-titanium",
      "route_id": 2703,
      "description": "",
      "excerpt": "",
      "price": 134900,
      "saleprice": 130853,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "823d75461890398b9ac3f65a4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "e2ff335a2cdd1e99d4118c355.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c5784370351640c8d08843a3a.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "5341ea56da5e3f789bbfdbea5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "4e2a9338eb4527ba14862043b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bcdb6f52056205c082e40bb4d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "0dfae6a220bcb2ea7edbe17a3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "91fadd6173373b783614f83a3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "d73ae64e31b4606dd2af3f005.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 6,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15 Pro",
      "category_slug": "iphone-15-pro2",
      "parent_category_slug": "iphone1"
    },
    {
      "href": "https://shop.unicornstore.in/type/iphone-14",
      rating: 3.8,
      "id": 4,
      "sku": "MPV03HN\/A",
      "name": "iPhone 14 Purple 128GB",
      "slug": "iphone-14-purple-128-gb",
      "route_id": 2636,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 60813,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "iPhone 14 Purple 128GB | Unicorn Store",
          "caption": "iPhone 14 Purple 128GB | Unicorn Store",
          "sequence": 1,
          "filename": "a29f63d9981815669025580b09db59cf.jpg",
          "primary": true
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 2,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14",
      "category_slug": "iphone-14",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 37,
      rating: 4.8,
      "href": "https://shop.unicornstore.in/type/iphone-15123",
      "sku": "I1P1G535",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "route_id": 2671,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 70312,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
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
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 4,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15",
      "category_slug": "iphone-15123",
      "parent_category_slug": "iphone1"
    },
    {
      "href": "https://shop.unicornstore.in/type/iphone-14",
      "id": 1,
      rating: 2.8,
      "sku": "MPVA3HN\/A",
      "name": "iPhone 14 (Product) Red 128GB",
      "slug": "iphone-14-product-red-128-gb",
      "route_id": 2633,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 60813,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "iPhone 14 (Product)Red 128GB | Unicorn Store",
          "caption": "iPhone 14 (Product)Red 128GB | Unicorn Store",
          "sequence": 1,
          "filename": "5500930433bc5894c5964d0d2a4e43b2.jpg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "e11b333c86d4b53a5e34ec2e8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "49f1e7348eddab98e0435afb6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "3fe1a292ec1c9db27c732d272.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "9b93250f2fa280a3718ed48b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "6aebe92da6965e3c15120cc04.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "661bd81ccbd9af6076fe89d6b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "0face2ba281214e4035ba1ab1.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "a423c8a45785df373c3d0ea62.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "c7de5bb0999ba9258e814d4b3.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 2,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14",
      "category_slug": "iphone-14",
      "parent_category_slug": "iphone1"
    },
    {
      "id": 43,
      rating: 4.8,
      "href": 'https://shop.unicornstore.in/type/iphone-15123',
      "sku": "I1G1G276",
      "name": "iPhone 15 Green 128GB",
      "slug": "iphone-15-green-128-gb",
      "route_id": 2677,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 70312,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "d88a6c8f598fbd081376e3feb.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "180c674cbc5203f8ba2d00c64.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "fad982b02c691194dba2acd7b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "a8de579af4519e983e780c47c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "fee42cbe0f52422cc51b2a023.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "08a60e426c9d8d16965a18855.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "57e235ceea789358a1c869a3c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "cf68b2bf06840ff07f4ad83e3.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "d7df54c5cab6a97a3f2a02caa.png"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 1,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 4,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 15",
      "category_slug": "iphone-15123",
      "parent_category_slug": "iphone1"
    },
  ];
  loading: boolean = true;

  imgUrl = environment.imgUrl;
  categoryItems = [
    { name: 'iPhone', link: 'https://shop.unicornstore.in/category/iphone1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/iphone/home-img-1694857550_8831.png' },
    { name: 'Mac', link: 'https://shop.unicornstore.in/category/mac1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/mac/home-img-1697184347_496.png' },
    { name: 'iPad', link: 'https://shop.unicornstore.in/category/ipad1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/ipad/home-img-1694070441_0921.png' },
    // { name: 'Watch', link: 'https://shop.unicornstore.in/category/watch1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/watch/home-img-1697116198_6179.png' },
    { name: 'AirPods', link: 'https://shop.unicornstore.in/category/headphones-and-speakers1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/music/home-img-1697116269_9121.png' },
    // { name: 'AirPods', link: 'https://shop.unicornstore.in/accessories/airpods-accessories1', image: 'https://i3-prod-assets.indiaistore.com/files/uploads/categories/music/home-img-1697116269_9121.png' }

  ];
  constructor(
    private commonService: CommonService,
    private dataLayerService: DataLayerService
  ) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireCategoryGA4Event(this.products);
      this.loading = false;
    }, 500);
  }

  fireCategoryGA4Event(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_name: item.name,
        item_category: "Categories",
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "categories",
        item_list_name: "Categories",
        items: items
      }
    });
  }

  fireCategorySelectGA4Event(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "categories",
        item_list_name: "Categories",
        items: [{
          item_name: item.name,
          item_category: "Categories",
        }]
      }
    });
  }
}
