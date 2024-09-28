import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-Mac',
  templateUrl: './popular-product-mac.component.html',
  styleUrls: ['./popular-product-mac.component.scss']
})
export class PopularProductMac implements OnInit {
  isWishlistAdded!: boolean;
  imgUrl = environment.imgUrl;
  selectedProductId: string = '';
  displayModal!: boolean;
  val2 = 5
  optionsHolder: any;
  selectedProduct: any;
  currentNumber = 1;
  loading: boolean = true;
  selectedSpaceVariant: string = '';
  selectedColor: string = '';
  prices: { [key: string]: number } = {};
  recently_products_mac = [

    {
      ratings: 2,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 113,
      "sku": "1MAAMC8C1GS8UM2SS836",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Silver 8GB unified memory 256GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-silver-8gb-unified-memory-256gb-ssd-storage",
      "route_id": 2755,
      "description": "",
      "excerpt": "",
      "price": 134900,
      "saleprice": 124108,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "256GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "5b73f6e755dbbe8ba42447068.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "23062c1b347fc2f0529c8ecd7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "a3306f44d1d8db859fbafd8c3.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "712c342748447b3a9f72fd782.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "d4452ad3a1ddbef366070c00d.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "350af4ee6f1d63c70f267f234.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "fdb3bc115e85253ecfb92db5b.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 3,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 116,
      "sku": "1MAAMC8C1GSG8UM5SS197",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Space Grey 8GB unified memory 512GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-space-grey-8gb-unified-memory-512gb-ssd-storage",
      "route_id": 2758,
      "description": "",
      "excerpt": "",
      "price": 154900,
      "saleprice": 142508,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#5e5f64",
      "space": "512GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "1d30882326a49ef8249c81c63.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "205bd7c5044751704641a7333.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6b587d020a369fa5d143a7631.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "5c963b5c6b9fca253dab3d9fe.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "53ac56884f510991230a92d4a.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "1d87353aef48846a2012e228c.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "de2674c40424f25559819977c.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 5,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/13-inch-macbook-air-apple-m2-chip1",
      "id": 212,
      "sku": "MLXY3HN\/A",
      "name": "13-inch MacBook Air: Apple M2 chip Silver 8GB unified memory 256GB SSD storage 8 core CPU - 8 core GPU",
      "slug": "13-inch-macbook-air-apple-m2-chip-silver-8gb-unified-memory-256gb-ssd-storage-8-core-cpu-8-core-gpu",
      "route_id": 2861,
      "description": "",
      "excerpt": "",
      "price": 114900,
      "saleprice": 101112,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "256GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "8ffdbbff5e527c1f75d0454ba.jpeg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "7675b43addd031e20d2788f2f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6b66309177a2c23528d76e308.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "35cd32520afbf6e3a3a115fb2.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "8f138b689fed7f218de48265b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "2fffd207eafdbc85008168b4d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "1b62b164fca7b320ea52e29aa.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "38f137d5390c4a731ff8ddc10.png"
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
      "parent_id": 16,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "13-inch MacBook Air: Apple M2 chip",
      "category_slug": "13-inch-macbook-air-apple-m2-chip1",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 5,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 114,
      "sku": "1MAAMC8C1GS8UM5SS812",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Silver 8GB unified memory 512GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-silver-8gb-unified-memory-512gb-ssd-storage",
      "route_id": 2756,
      "description": "",
      "excerpt": "",
      "price": 154900,
      "saleprice": 142508,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": " #c4c5c7",
      "space": "512GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "7d6706c35fb761dc8966d8a57.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "6583f5647a2104bc8ea8d7f20.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "de385c299cd256d22f68eb73e.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "c62ce3723ce87420f3742151a.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "6d7ea8e79bec31fa0dfe74d4e.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "3eab06b034db5bbe760be265c.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "9a6df3890475248669ca9d1d0.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
  ];
  recently_popup = [

    {
      ratings: 2,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 113,
      "sku": "1MAAMC8C1GS8UM2SS836",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Silver 8GB unified memory 256GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-silver-8gb-unified-memory-256gb-ssd-storage",
      "route_id": 2755,
      "description": "",
      "excerpt": "",
      "price": 134900,
      "saleprice": 124108,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "256GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "5b73f6e755dbbe8ba42447068.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "23062c1b347fc2f0529c8ecd7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "a3306f44d1d8db859fbafd8c3.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "712c342748447b3a9f72fd782.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "d4452ad3a1ddbef366070c00d.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "350af4ee6f1d63c70f267f234.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "fdb3bc115e85253ecfb92db5b.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 3,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 116,
      "sku": "1MAAMC8C1GSG8UM5SS197",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Space Grey 8GB unified memory 512GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-space-grey-8gb-unified-memory-512gb-ssd-storage",
      "route_id": 2758,
      "description": "",
      "excerpt": "",
      "price": 154900,
      "saleprice": 142508,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#5e5f64",
      "space": "512GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "1d30882326a49ef8249c81c63.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "205bd7c5044751704641a7333.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6b587d020a369fa5d143a7631.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "5c963b5c6b9fca253dab3d9fe.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "53ac56884f510991230a92d4a.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "1d87353aef48846a2012e228c.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "de2674c40424f25559819977c.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 5,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/13-inch-macbook-air-apple-m2-chip1",
      "id": 212,
      "sku": "MLXY3HN\/A",
      "name": "13-inch MacBook Air: Apple M2 chip Silver 8GB unified memory 256GB SSD storage 8 core CPU - 8 core GPU",
      "slug": "13-inch-macbook-air-apple-m2-chip-silver-8gb-unified-memory-256gb-ssd-storage-8-core-cpu-8-core-gpu",
      "route_id": 2861,
      "description": "",
      "excerpt": "",
      "price": 114900,
      "saleprice": 101112,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#c4c5c7",
      "space": "256GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "8ffdbbff5e527c1f75d0454ba.jpeg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "7675b43addd031e20d2788f2f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "6b66309177a2c23528d76e308.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "35cd32520afbf6e3a3a115fb2.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "8f138b689fed7f218de48265b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "2fffd207eafdbc85008168b4d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "1b62b164fca7b320ea52e29aa.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "38f137d5390c4a731ff8ddc10.png"
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
      "parent_id": 16,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "13-inch MacBook Air: Apple M2 chip",
      "category_slug": "13-inch-macbook-air-apple-m2-chip1",
      "parent_category_slug": "mac1"
    },
    {
      ratings: 5,
      sale: 'Sale 8% off',
      "href": "https://shop.unicornstore.in/type/15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "id": 114,
      "sku": "1MAAMC8C1GS8UM5SS812",
      "name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU Silver 8GB unified memory 512GB SSD storage",
      "slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu-silver-8gb-unified-memory-512gb-ssd-storage",
      "route_id": 2756,
      "description": "",
      "excerpt": "",
      "price": 154900,
      "saleprice": 142508,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": " #c4c5c7",
      "space": "512GB",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 1,
          "filename": "7d6706c35fb761dc8966d8a57.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "6583f5647a2104bc8ea8d7f20.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "de385c299cd256d22f68eb73e.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "c62ce3723ce87420f3742151a.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "6d7ea8e79bec31fa0dfe74d4e.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "3eab06b034db5bbe760be265c.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "9a6df3890475248669ca9d1d0.jpg"
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
      "parent_id": 10,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "15-inch MacBook Air: Apple M2 chip 8-core CPU, 10-core GPU",
      "category_slug": "15-inch-macbook-air-apple-m2-chip-8-core-cpu-10-core-gpu",
      "parent_category_slug": "mac1"
    },
  ];
  recentlyColors = [
    { colorName: 'Space Grey', background: '#5e5f64', selected: false },
    { colorName: 'Chip Silver', background: '#c4c5c7', selected: false },
    { colorName: 'Purple', background: '#e6dbeb', selected: false },
    { colorName: 'Pink', background: '#fde8e7', selected: false }
  ];
  space_variant = [
    { spaces: '128GB', selected_space: false },
    { spaces: '256GB', selected_space: false },
    { spaces: '512GB', selected_space: false },
  ];
  constructor(private commonService: CommonService, private messageService: MessageService, private router: Router, private dataLayerService: DataLayerService) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireProductImpression(this.recently_products_mac);
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
        item_category: "Mac",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "popular_product_mac",
        item_list_name: "Popular Product - Mac",
        items: items
      }
    });
  }

  fireProductSelectImpression(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "popular_product_mac",
        item_list_name: "Popular Product - Mac",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "Mac",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }

  showModalDialog(productId: any) {
    const product = this.recently_products_mac.find(product => product.id === productId);
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
      // const prices = selectedProduct.prices as { [key: string]: any };
      // const newPriceObject = prices[this.selectedSpaceVariant];
      // const newPrice = newPriceObject.price;
      // selectedProduct.saleprice = newPrice;
      selectedProduct.name = selectedProduct.name.replace(/\d+GB/, this.selectedSpaceVariant);
    });
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
