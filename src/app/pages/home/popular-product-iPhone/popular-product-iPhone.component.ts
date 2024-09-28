import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-iPhone',
  templateUrl: './popular-product-iPhone.component.html',
  styleUrls: ['./popular-product-iPhone.component.scss']
})
export class PopularProductiPhone implements OnInit {

  imgUrl = environment.imgUrl;
  displayModal!: boolean;
  val2 = 5
  selectedProduct: any;
  currentNumber = 1;
  loading: boolean = true;
  selectedProductId: any | null = null;
  selectedSpaceVariant: string = '';
  selectedColor: string = '';
  prices: { [key: string]: number } = {};
  recently_products = [
    {
      "id": 1590,
      "sku": "MTJV3HN\/A",
      "name": "AirPods Pro (2nd generation) with MagSafe Case (USB\u2011C)-2023",
      "slug": "airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",
      "route_id": "4258",
      "href": "https://shop.unicornstore.in/product/airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",

      "description": "",
      "excerpt": "",
      "price": 24900,
      "saleprice": 23655,
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "92",
      "related_products": [],
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "3aac0926c3da0210752f3a8724a55c1a.jpeg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "251",
      "product_type": "simple",
      "cashback": "1",
      "custom_column_1": "0",
      "custom_column_2": "0.00",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0",
      "color": "rgb(235, 232, 225)",
      "space": "512GB",
      "prices": {
        "256GB": 155103,
        "512GB": 161910,
        "128GB": 0
      },
      "parent_category": {
        "slug": "airpods-pro-2nd-generation12",
        "name": "AirPods Pro (2nd generation)"
      },
      "wishlist": false
    },

    {
      "id": 682,
      "sku": "MWTY3ZM\/A",
      "name": "EarPods with Lightning Connector",
      "slug": "earpods-with-lightning-connector1",
      "route_id": "3350",
      "href": "https://shop.unicornstore.in/product/earpods-with-lightning-connector1",

      "description": "<div class=\"para-list as-pdp-lastparalist\"><p>Unlike traditional, circular earbuds, the design of the EarPods is defined by the geometry of the ear. Which makes them more comfortable for more people than any other earbud-style headphones.<\/p><p>The speakers inside the EarPods have been engineered to maximise sound output, which means you get high-quality audio.<\/p><p>The EarPods (Lightning Connector) also include a built-in remote that lets you adjust the volume, control the playback of music and video, and answer or end calls with a press of the remote.<\/p><\/div>",
      "excerpt": "",
      "price": 2000,
      "saleprice": 2000,
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "97",
      "related_products": [],
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "2369c4596e56786b8ade5ae1670ea8f4.jpeg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "color": "#e6dbeb",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "37",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "0",
      "custom_column_2": "0.00",
      "custom_column_3": "",
      "custom_column_4": "",
      "space": "128GB",
      "prices": {
        "256GB": 78663,
        "128GB": 2000,
        "512GB": 2000
      },
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0",
      "parent_category": {
        "slug": "accessories1",
        "name": "Accessories",
        "child": [
          {
            "slug": "headphones-and-speakers1",
            "name": "Headphones and Speakers",
            "child": [
              {
                "slug": "earpods",
                "name": "EarPods"
              }
            ]
          }
        ]
      },
      "wishlist": false
    },
    {
      ratings: 3.8,
      sale: 'Sale 12% off',
      "href": "https://shop.unicornstore.in/type/iphone-15123",
      "id": 37,
      "sku": "I1P1G535",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "route_id": 2671,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 71111,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#fde8e7",
      "space": "128GB",
      "prices": {
        "256GB": 78663,
        "128GB": 70312,
        "512GB": 104405
      },
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
      ratings: 3.8,
      sale: 'Sale 6% off',
      "href": "https://shop.unicornstore.in/type/iphone-14-plus1",
      "id": 23,
      "sku": "MQ563HN\/A",
      "name": "iPhone 14 Plus Purple 256GB",
      "slug": "iphone-14-plus-purple-256-gb",
      "route_id": 2655,
      "description": "",
      "excerpt": "",
      "price": 89900,
      "saleprice": 79112,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#e6dbeb",
      "space": "256GB",
      "prices": {
        "256GB": 84506,
        "128GB": 70312,
        "512GB": 103306
      },
      "images": [
        {
          "alt": "iPhone 14 Plus Purple 256GB | Unicorn Store",
          "caption": "iPhone 14 Plus Purple 256GB | Unicorn Store",
          "sequence": 1,
          "filename": "a29f63d9981815669025580b09db59cf.jpg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "4c27c214b9d9f097899f78b58.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "4ddb11f165fc02910b78664d5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "941ede7db1d92100452bc7eb1.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "99d2ef5bbf9d136a90eb7e462.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "4858c6efd63a7b94be221fad0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "eeb305deb8c364c732bdd7994.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "f60870f35a44e9c92213ea4e0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "923cbc7a67665ea52da80b97c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "b946d649fd6a2da8a163016d8.png"
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
      "parent_id": 3,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14 Plus",
      "category_slug": "iphone-14-plus1",
      "parent_category_slug": "iphone1"
    },

  ];
  recently_popup = [

    {
      "id": 1590,
      "sku": "MTJV3HN\/A",
      "name": "AirPods Pro (2nd generation) with MagSafe Case (USB\u2011C)-2023",
      "slug": "airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",
      "route_id": "4258",
      "href": "https://shop.unicornstore.in/product/airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",

      "description": "",
      "excerpt": "",
      "price": 24900,
      "saleprice": 23655,
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "92",
      "related_products": [],
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "3aac0926c3da0210752f3a8724a55c1a.jpeg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "251",
      "product_type": "simple",
      "cashback": "1",
      "custom_column_1": "0",
      "custom_column_2": "0.00",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": "",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0",
      "color": "rgb(235, 232, 225)",
      "space": "512GB",

      "prices": {
        "256GB": { "price": 155103, "id": 127222 },
        "512GB": { "price": 23655, "id": 44044 },
        "128GB": { "price": 145103, "id": 33323 }
      },
      "parent_category": {
        "slug": "airpods-pro-2nd-generation12",
        "name": "AirPods Pro (2nd generation)"
      },
      "wishlist": false
    },

    {
      "id": 682,
      "sku": "MWTY3ZM\/A",
      "href": "https://shop.unicornstore.in/product/earpods-with-lightning-connector1",

      "name": "EarPods with Lightning Connector",
      "slug": "earpods-with-lightning-connector1",
      "route_id": "3350",
      "description": "<div class=\"para-list as-pdp-lastparalist\"><p>Unlike traditional, circular earbuds, the design of the EarPods is defined by the geometry of the ear. Which makes them more comfortable for more people than any other earbud-style headphones.<\/p><p>The speakers inside the EarPods have been engineered to maximise sound output, which means you get high-quality audio.<\/p><p>The EarPods (Lightning Connector) also include a built-in remote that lets you adjust the volume, control the playback of music and video, and answer or end calls with a press of the remote.<\/p><\/div>",
      "excerpt": "",
      "price": 2000,
      "saleprice": 2000,
      "color": "#e6dbeb",

      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "97",
      "related_products": [],
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "2369c4596e56786b8ade5ae1670ea8f4.jpeg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "37",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "0",
      "custom_column_2": "0.00",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "space": "128GB",

      "prices": {
        "256GB": { "price": 2000, "id": 1225222 },
        "512GB": { "price": 2000, "id": 40044 },
        "128GB": { "price": 2000, "id": 33733 }
      },
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0",
      "parent_category": {
        "slug": "accessories1",
        "name": "Accessories",
        "child": [
          {
            "slug": "headphones-and-speakers1",
            "name": "Headphones and Speakers",
            "child": [
              {
                "slug": "earpods",
                "name": "EarPods"
              }
            ]
          }
        ]
      },
      "wishlist": false
    },
    {
      ratings: 3.8,
      sale: 'Sale 12% off',
      "href": "https://shop.unicornstore.in/type/iphone-15123",
      "id": 37,
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
      "color": "#fde8e7",
      "space": "128GB",

      "prices": {
        "256GB": { "price": 78663, "id": 1225222 },
        "512GB": { "price": 104405, "id": 44444 },
        "128GB": { "price": 70312, "id": 33733 }
      },
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
      ratings: 3.8,
      sale: 'Sale 6% off',
      "href": "https://shop.unicornstore.in/type/iphone-14-plus1",
      "id": 23,
      "sku": "MQ563HN\/A",
      "name": "iPhone 14 Plus Purple 256GB",
      "slug": "iphone-14-plus-purple-256-gb",
      "route_id": 2655,
      "description": "",
      "excerpt": "",
      "price": 89900,
      "saleprice": 84506,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#e6dbeb",
      "space": "256GB",

      "prices": {
        "256GB": { "price": 84506, "id": 122223 },
        "512GB": { "price": 103306, "id": 44444 },
        "128GB": { "price": 70312, "id": 33335 }
      },
      "images": [
        {
          "alt": "iPhone 14 Plus Purple 256GB | Unicorn Store",
          "caption": "iPhone 14 Plus Purple 256GB | Unicorn Store",
          "sequence": 1,
          "filename": "a29f63d9981815669025580b09db59cf.jpg",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "4c27c214b9d9f097899f78b58.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "4ddb11f165fc02910b78664d5.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 10,
          "filename": "941ede7db1d92100452bc7eb1.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 9,
          "filename": "99d2ef5bbf9d136a90eb7e462.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "4858c6efd63a7b94be221fad0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "eeb305deb8c364c732bdd7994.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "f60870f35a44e9c92213ea4e0.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "923cbc7a67665ea52da80b97c.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "b946d649fd6a2da8a163016d8.png"
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
      "parent_id": 3,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": 0,
      "category_name": "iPhone 14 Plus",
      "category_slug": "iphone-14-plus1",
      "parent_category_slug": "iphone1"
    },

  ];

  recentlyColors = [
    { colorName: 'White', background: 'rgb(235, 232, 225)', selected: false },
    { colorName: 'Black', background: '#474745', selected: false },
    { colorName: 'Purple', background: '#e6dbeb', selected: false },
    { colorName: 'Pink', background: '#fde8e7', selected: false }
  ];

  space_variant = [
    { spaces: '128GB', selected_space: false },
    { spaces: '256GB', selected_space: false },
    { spaces: '512GB', selected_space: false },
    // { spaces: '1TB', selected_space: false },

  ];
  isWishlistAdded!: boolean;
  optionsHolder: any;
  constructor(private commonService: CommonService, private router: Router, private dataLayerService: DataLayerService, private messageService: MessageService,) { }
  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireProductImpression(this.recently_products);
      this.loading = false;
    }, 700);
  }

  fireProductImpression(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "iPhone",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "popular_products_iPhone",
        item_list_name: "Popular Products - iPhone",
        items: items
      }
    });
  }

  fireProductSelectImpression(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "popular_products_iPhone",
        item_list_name: "Popular Products - iPhone",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "iPhone",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }

  closePopup() {
    this.displayModal = false;
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
      const prices = selectedProduct.prices as { [key: string]: any };
      const newPriceObject = prices[this.selectedSpaceVariant];
      const newPrice = newPriceObject.price;
      selectedProduct.saleprice = newPrice;
      selectedProduct.name = selectedProduct.name.replace(/\d+GB/, this.selectedSpaceVariant);
    });
  }

  showModalDialog(productId: any) {
    const product = this.recently_products.find(product => product.id === productId);
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

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

}


