import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-iPad',
  templateUrl: './popular-product-iPad.component.html',
  styleUrls: ['./popular-product-iPad.component.scss']
})
export class PopularProductiPad implements OnInit {

  imgUrl = environment.imgUrl;
  selectedProductId: string = '';
  displayModal!: boolean;
  val2 = 5
  selectedProduct: any;
  isWishlistAdded!: boolean;
  optionsHolder: any;
  currentNumber = 1;
  loading: boolean = true;
  selectedSpaceVariant: string = '';
  selectedColor: string = '';
  prices: { [key: string]: number } = {};
  recently_products_ipad = [

    {
      sale: 'Sale 6% off',
      href: 'https://shop.unicornstore.in/type/ipad-10th-generation2',
      ratings: 4,
      "id": 143,
      "sku": "MPQ33HN\/A",
      "name": "iPad 10th Generation Pink 64GB Wi-Fi",
      "slug": "ipad-10th-generation-pink-64-gb-wi-fi",
      "route_id": 2788,
      "description": "",
      "excerpt": "",
      "price": 39900,
      "saleprice": 37506,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#fb798d",
      "space": "64GB",
      "prices": {
        "256GB": { "price": 399900, "id": 1245222 },
        "64GB": { "price": 39900, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 10th Generation Pink 64GB Wi-Fi | Unicorn Store",
          "caption": "iPad 10th Generation Pink 64GB Wi-Fi | Unicorn Store",
          "sequence": 1,
          "filename": "2525c53e48bd954b56399ea3b6777ac0.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "3929c0d5831493aac553daaaf.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "c3b5926109bbfd900980095da.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "1595835f8640b05720ac2ed38.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "f50281716a765f4c84117db72.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "c12e630b592972a45c6d577cb.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "7f15f30088a73b1a9cfb1051b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "28030b4ed9231464c31eb5ad3.png"
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
      "parent_id": 13,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 10th Generation",
      "category_slug": "ipad-10th-generation2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-pro-with-apple-m2-chip2',
      ratings: 4,
      sale: 'Sale 6% off',
      "id": 164,
      "sku": "MNXE3HN\/A",
      "name": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch",
      "slug": "ipad-pro-with-apple-m2-chip-silver-128-gb-wi-fi-11-inch",
      "route_id": 2811,
      "description": "",
      "excerpt": "",
      "price": 81900,
      "saleprice": 76986,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch | Unicorn Store",
          "caption": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch | Unicorn Store",
          "sequence": 1,
          "filename": "c5b259253ae8d596d16ac968853661b0.jpeg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "c5f5e3695dc13a8da07a6432b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "300a31ff662ff5b88a65ebe95.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "2b9e52777aa92fbf97a9a3dbf.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "4b00ff59704c70a126b86f005.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "630f9f9d9f1a78a359b08831f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "044f4ef3543a3c776711af6e2.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "0dbea40ee120c0537f5cde5b0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "fd9290b0bc8c30b99bcf25775.png"
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
      "parent_id": 15,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad Pro with Apple M2 chip",
      "category_slug": "ipad-pro-with-apple-m2-chip2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-9th-generation2',
      ratings: 5,
      sale: 'Sale 6% off',
      "id": 208,
      "sku": "MK2K3HN\/A",
      "name": "iPad 9th Generation Space Grey 64GB Wi-Fi",
      "slug": "ipad-9th-generation-space-grey-64-gb-wi-fi",
      "route_id": 2856,
      "description": "",
      "excerpt": "",
      "price": 32900,
      "saleprice": 30926,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#5e5f64",
      "space": "64GB",
      "prices": {
        "256GB": { "price": 155103, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 9th Generation Space Grey 64GB Wi-Fi | Unicorn Store",
          "caption": "iPad 9th Generation Space Grey 64GB Wi-Fi | Unicorn Store",
          "sequence": 1,
          "filename": "5ee10458f3e236c97ff85ef98284138c.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "a475a43459ebdb0845625b8f2.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6e635b161456cb3ecd71681fa.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "df1250d8ae17fe6694af06267.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "50750b70851e05e4794cdc695.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "18895a08abcb319d1aafd0eab.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "7b5c075c1b18de3ba02164920.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "7afdf4fb404a43f0c67d8ca45.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "1a5eff458a8eb9e7a1de4635b.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "0cd68712777c631858aed491b.jpg"
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
      "parent_id": 17,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 9th Generation",
      "category_slug": "ipad-9th-generation2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-10th-generation2',
      ratings: 5,
      "id": 154,
      sale: 'Sale 6% off',
      "sku": "MQ6U3HN\/A",
      "name": "iPad 10th Generation Blue 256GB Wi-Fi Cellular",
      "slug": "ipad-10th-generation-blue-256-gb-wi-fi-cellular",
      "route_id": 2799,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 65706,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#718fb2",
      "space": "256GB",
      "prices": {
        "256GB": { "price": 65706, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 10th Generation Blue 256GB Wi-Fi + Cellular | Unicorn Store",
          "caption": "iPad 10th Generation Blue 256GB Wi-Fi + Cellular | Unicorn Store",
          "sequence": 1,
          "filename": "aef68050ba3d81342218d965b672752f.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "be9af6c9b37dcc41670da3779.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "ade00fb400a87b1372ba24a8d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "0a3982f77c9036815fdea592f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "f7efd9f7c79b4ec3f6ed71de6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "0880ccccfd44fdb8af3302efb.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "0f4203d91d8156c4980d1cec5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "be9a77bc7a32be275f0caead2.png"
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
      "parent_id": 13,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 10th Generation",
      "category_slug": "ipad-10th-generation2",
      "parent_category_slug": "ipad1"
    },
  ];

  recently_popup = [
    {
      sale: 'Sale 6% off',
      href: 'https://shop.unicornstore.in/type/ipad-10th-generation2',
      ratings: 4,
      "id": 143,
      "sku": "MPQ33HN\/A",
      "name": "iPad 10th Generation Pink 64GB Wi-Fi",
      "slug": "ipad-10th-generation-pink-64-gb-wi-fi",
      "route_id": 2788,
      "description": "",
      "excerpt": "",
      "price": 39900,
      "saleprice": 37506,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#fb798d",
      "space": "64GB",
      "prices": {
        "256GB": { "price": 399900, "id": 1245222 },
        "64GB": { "price": 39900, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 10th Generation Pink 64GB Wi-Fi | Unicorn Store",
          "caption": "iPad 10th Generation Pink 64GB Wi-Fi | Unicorn Store",
          "sequence": 1,
          "filename": "2525c53e48bd954b56399ea3b6777ac0.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "3929c0d5831493aac553daaaf.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "c3b5926109bbfd900980095da.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "1595835f8640b05720ac2ed38.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "f50281716a765f4c84117db72.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "c12e630b592972a45c6d577cb.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "7f15f30088a73b1a9cfb1051b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "28030b4ed9231464c31eb5ad3.png"
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
      "parent_id": 13,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 10th Generation",
      "category_slug": "ipad-10th-generation2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-pro-with-apple-m2-chip2',
      ratings: 4,
      sale: 'Sale 6% off',
      "id": 164,
      "sku": "MNXE3HN\/A",
      "name": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch",
      "slug": "ipad-pro-with-apple-m2-chip-silver-128-gb-wi-fi-11-inch",
      "route_id": 2811,
      "description": "",
      "excerpt": "",
      "price": 81900,
      "saleprice": 76986,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch | Unicorn Store",
          "caption": "iPad Pro with Apple M2 chip Silver 128GB Wi-Fi 11-inch | Unicorn Store",
          "sequence": 1,
          "filename": "c5b259253ae8d596d16ac968853661b0.jpeg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "c5f5e3695dc13a8da07a6432b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "300a31ff662ff5b88a65ebe95.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "2b9e52777aa92fbf97a9a3dbf.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "4b00ff59704c70a126b86f005.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "630f9f9d9f1a78a359b08831f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "044f4ef3543a3c776711af6e2.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "0dbea40ee120c0537f5cde5b0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "fd9290b0bc8c30b99bcf25775.png"
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
      "parent_id": 15,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad Pro with Apple M2 chip",
      "category_slug": "ipad-pro-with-apple-m2-chip2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-9th-generation2',
      ratings: 5,
      sale: 'Sale 6% off',
      "id": 208,
      "sku": "MK2K3HN\/A",
      "name": "iPad 9th Generation Space Grey 64GB Wi-Fi",
      "slug": "ipad-9th-generation-space-grey-64-gb-wi-fi",
      "route_id": 2856,
      "description": "",
      "excerpt": "",
      "price": 32900,
      "saleprice": 30926,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#5e5f64",
      "space": "64GB",
      "prices": {
        "256GB": { "price": 155103, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 9th Generation Space Grey 64GB Wi-Fi | Unicorn Store",
          "caption": "iPad 9th Generation Space Grey 64GB Wi-Fi | Unicorn Store",
          "sequence": 1,
          "filename": "5ee10458f3e236c97ff85ef98284138c.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "a475a43459ebdb0845625b8f2.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6e635b161456cb3ecd71681fa.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "df1250d8ae17fe6694af06267.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "50750b70851e05e4794cdc695.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "18895a08abcb319d1aafd0eab.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "7b5c075c1b18de3ba02164920.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "7afdf4fb404a43f0c67d8ca45.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "1a5eff458a8eb9e7a1de4635b.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "0cd68712777c631858aed491b.jpg"
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
      "parent_id": 17,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 9th Generation",
      "category_slug": "ipad-9th-generation2",
      "parent_category_slug": "ipad1"
    },
    {
      href: 'https://shop.unicornstore.in/type/ipad-10th-generation2',
      ratings: 5,
      "id": 154,
      sale: 'Sale 6% off',
      "sku": "MQ6U3HN\/A",
      "name": "iPad 10th Generation Blue 256GB Wi-Fi Cellular",
      "slug": "ipad-10th-generation-blue-256-gb-wi-fi-cellular",
      "route_id": 2799,
      "description": "",
      "excerpt": "",
      "price": 69900,
      "saleprice": 65706,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#718fb2",
      "space": "256GB",
      "prices": {
        "256GB": { "price": 65706, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "iPad 10th Generation Blue 256GB Wi-Fi + Cellular | Unicorn Store",
          "caption": "iPad 10th Generation Blue 256GB Wi-Fi + Cellular | Unicorn Store",
          "sequence": 1,
          "filename": "aef68050ba3d81342218d965b672752f.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "be9af6c9b37dcc41670da3779.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "ade00fb400a87b1372ba24a8d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "0a3982f77c9036815fdea592f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "f7efd9f7c79b4ec3f6ed71de6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "0880ccccfd44fdb8af3302efb.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "0f4203d91d8156c4980d1cec5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "be9a77bc7a32be275f0caead2.png"
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
      "parent_id": 13,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPad 10th Generation",
      "category_slug": "ipad-10th-generation2",
      "parent_category_slug": "ipad1"
    },

  ];

  recentlyColors = [
    { colorName: 'Space Grey', background: '#5e5f64', selected: false },
    { colorName: 'Chip Silver', background: '#c4c5c7', selected: false },
    { colorName: 'Blue', background: '#718fb2', selected: false },
    { colorName: 'Pink', background: '#fb798d', selected: false }
  ];
  space_variant = [
    { spaces: '128GB', selected_space: false },
    { spaces: '256GB', selected_space: false },
    { spaces: '64GB', selected_space: false },
  ];
  constructor(private commonService: CommonService, private router: Router, private dataLayerService: DataLayerService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireProductImpression(this.recently_products_ipad);
      this.loading = false;
    }, 500);
  }

  closePopup() {
    this.displayModal = false;
  }
  wishlistToggle(productId: number) {
    if (localStorage.getItem('customer_data')) {
      this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${productId}`).subscribe((resp) => {
        if (resp?.status) {
          this.isWishlistAdded = !this.isWishlistAdded;

          if (resp.message === 'product added') {
            this.messageService.add({ severity: 'success', detail: resp.message });
          }
          if (resp.message === 'product removed') {
            this.messageService.add({ severity: 'error', detail: resp.message });
          }

        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
        if (this.isWishlistAdded) {

          // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.

          this.dataLayerService.push({
            event: "add_to_wishlist",
            ecommerce: {
              items: [
                {
                  item_id: this.selectedProduct.id,
                  item_name: this.selectedProduct.name,
                  currency: 'INR',
                  item_variant: this.selectedProduct.name,
                  price: this.selectedProduct.saleprice,
                  quantity: this.selectedProduct.quantity
                }
              ]
            }
          });
        }
      });
      localStorage.removeItem('before-login-wishlist-add');
    } else {
      localStorage.setItem('payload-for-selected-product', JSON.stringify(this.optionsHolder));
      localStorage.setItem('before-login-wishlist-add', String(productId));
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });

    }
  }
  fireProductImpression(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "iPad",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "popular_product_iPad",
        item_list_name: "Popular Product - iPad",
        items: items
      }
    });
  }


  fireProductSelectImpression(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "popular_product_iPad",
        item_list_name: "Popular Product - iPad",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "iPad",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }

  // showModalDialog(productId: any) {

  //   if (this.recently_popup.some(product => product.id === productId)) {
  //     this.selectedProductId = productId;
  //     this.displayModal = true;
  //   }
  // }

  selectColor(index: number): void {
    this.recentlyColors.forEach(color => color.selected = false);
    this.recentlyColors[index].selected = true;
    this.selectedColor = this.recentlyColors[index].colorName;
  }

  selectSpace(index: number): void {
    this.space_variant.forEach(space => space.selected_space = false);
    this.space_variant[index].selected_space = true;
    this.selectedSpaceVariant = this.space_variant[index].spaces;
    this.recently_popup.forEach(selectedProduct => {
      const prices = selectedProduct.prices as { [key: string]: any };
      const newPriceObject = prices[this.selectedSpaceVariant];
      const newPrice = newPriceObject.price;
      selectedProduct.saleprice = newPrice;
      selectedProduct.name = selectedProduct.name.replace(/\d+GB/, this.selectedSpaceVariant);
    });
  }
  showModalDialog(productId: any) {
    const product = this.recently_products_ipad.find(product => product.id === productId);
    if (product) {
      const productColor = product.color.toLowerCase();
      const selectedColorIndex = this.recentlyColors.findIndex(color => color.background === productColor);
      if (selectedColorIndex !== -1) {
        this.selectColor(selectedColorIndex);
      }
      const storage = product.space;
      if (storage) {
        const selectedSpaceIndex = this.space_variant.findIndex(space => space.spaces === storage);
        if (selectedSpaceIndex !== -1) {
          this.selectSpace(selectedSpaceIndex);
        }
      }
      this.selectedProductId = productId;
      this.displayModal = true;
    }
  }
  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

}
