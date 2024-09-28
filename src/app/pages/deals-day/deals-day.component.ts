import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-deals-day',
  templateUrl: './deals-day.component.html',
  styleUrls: ['./deals-day.component.scss']
})
export class DealsDayComponent implements OnInit {


  customSwiperOptions: SwiperOptions = {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      425: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1028: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  };
  newsletter_products: any[] = [
    {
      "id": "936",
      "sku": "SKIP-R21-HR-BLK",
      "name": "Skech Hard Rubber Black iPhone 13",
      "slug": "skech-hard-rubber-black-iphone-131",
      "route_id": "3604",
      "description": "Skech Hard Rubber Black iPhone 13",
      "excerpt": "",
      "price": "1890.00",
      "saleprice": "1228.50",
      "quantity": "0",
      "images": [
        {
          "alt": "Skech Hard Rubber Black iPhone 13 | Unicorn Store",
          "caption": "Skech Hard Rubber Black iPhone 13 | Unicorn Store",
          "sequence": 1,
          "filename": "1e0336233c7bddc72b0e17b60494756a.jpg",
          "primary": true
        }
      ],
      "product_type": "simple",
      "parent_id": "37",
      "enabled": "1"
    },
    {
      "id": "1549",
      "sku": "MT123ZM\/A",
      "name": "iPhone 15 Plus Silicone Case with MagSafe - Storm Blue",
      "slug": "iphone-15-plus-silicone-case-with-magsafe-storm-blue1",
      "route_id": "4217",
      "description": "<p><font color=\"#212529\">Designed by Apple to complement iPhone 15 Plus, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 15 Plus, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "86",
      "related_products": "[]",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "2591146ddc2eeccb3c3f1034dbbf3c00.jpeg"
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
      "parent_id": "43",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0"
    },
    {
      "id": "1731",
      "sku": "AMR KIT-02261-CLEAR BUNDLE",
      "name": "Muvtech Armour Bundle For iPhone 15 - Clear",
      "slug": "muvtech-armour-bundle-for-iphone-15-clear1",
      "route_id": "4399",
      "description": "",
      "excerpt": "",
      "price": "5999.00",
      "saleprice": "2999.00",
      "quantity": "10",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "4321a0d3dc3b533d658678086783a58a.jpeg"
        }
      ],
      "product_type": "simple",
      "parent_id": "37",
      "enabled": "1"
    },
    {
      "id": "733",
      "sku": "MKU63HN\/A",
      "name": "67W USB-C Power Adapter",
      "slug": "67w-usb-c-power-adapter1",
      "route_id": "3401",
      "description": "",
      "excerpt": "",
      "price": "5800.00",
      "saleprice": "5800.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "30",
      "related_products": "[]",
      "images": [
        {
          "alt": "67W USB-C Power Adapter | Unicorn Store",
          "caption": "67W USB-C Power Adapter | Unicorn Store",
          "sequence": 1,
          "filename": "5da8fbad4ef39d42f6a2b0b98b189f73.jpeg",
          "primary": true
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
      "parent_id": "61",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "",
      "custom_column_2": "",
      "custom_column_3": "",
      "custom_column_4": "",
      "cashback_note": " ",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0"
    }
    // {
    //   "id": 33,
    //   "sku": "MQ5D3HN\/A",
    //   "name": "iPhone 14 Plus Starlight 512GB",
    //   "slug": "iphone-14-plus-starlight-512-gb",
    //   "route_id": 2665,
    //   "description": "",
    //   "excerpt": "",
    //   "price": 109900,
    //   "saleprice": 103306,
    //   "free_shipping": 0,
    //   "shippable": 1,
    //   "taxable": 0,
    //   "fixed_quantity": 0,
    //   "dimension": null,
    //   "track_stock": 0,
    //   "quantity": 1,
    //   "images": [
    //     {
    //       "alt": "iPhone 14 Plus Starlight 512GB | Unicorn Store",
    //       "caption": "iPhone 14 Plus Starlight 512GB | Unicorn Store",
    //       "sequence": 1,
    //       "filename": "9cb99aa118ea661a6ce0d1f68ec8894c.jpg",
    //       "primary": true
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 2,
    //       "filename": "1af8e0767503fa6580bb74f88.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 3,
    //       "filename": "f90bed7ea390f58a58d1a9870.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 5,
    //       "filename": "a0f387188d19a6cc1e48bc4d5.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 4,
    //       "filename": "ea7247a3a0b0a3636b0dd8df1.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 6,
    //       "filename": "e4cbc26a08d6f3b43d2de011e.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 7,
    //       "filename": "9976a66b0b2855f4d1ec59426.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "c752bbc854a7ffe6d68dbd0cf.png"
    //     }
    //   ],
    //   "seo_title": null,
    //   "meta": null,
    //   "enabled": 1,
    //   "tag": null,
    //   "option_pincodes": null,
    //   "product_code": null,
    //   "hsn_code": null,
    //   "affordability": 0,
    //   "allow_rating": 1,
    //   "show_rating": 1,
    //   "average_rating": 0,
    //   "effective_price": 0,
    //   "parent_id": 3,
    //   "product_type": "configurable",
    //   "cashback": 0,
    //   "custom_column_1": "",
    //   "custom_column_2": "",
    //   "custom_column_3": "",
    //   "custom_column_4": "",
    //   "cashback_note": " ",
    //   "cashback_price": 0,
    //   "blinkit_price": null,
    //   "reorder_level": null,
    //   "cashback_amt": null,
    //   "category_name": "iPhone 14 Plus",
    //   "category_slug": "iphone-14-plus1",
    //   "parent_category_slug": "iphone1"
    // },
    // {
    //   "id": 67,
    //   "sku": "I1P1GWT586",
    //   "name": "iPhone 15 Pro 128GB White Titanium",
    //   "slug": "iphone-15-pro-128-gb-white-titanium",
    //   "route_id": 2703,
    //   "description": "",
    //   "excerpt": "",
    //   "price": 134900,
    //   "saleprice": 130853,
    //   "free_shipping": 0,
    //   "shippable": 1,
    //   "taxable": 0,
    //   "fixed_quantity": 0,
    //   "dimension": null,
    //   "track_stock": 0,
    //   "quantity": 1,
    //   "images": [
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "823d75461890398b9ac3f65a4.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "e2ff335a2cdd1e99d4118c355.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "c5784370351640c8d08843a3a.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "5341ea56da5e3f789bbfdbea5.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "4e2a9338eb4527ba14862043b.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "bcdb6f52056205c082e40bb4d.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "0dfae6a220bcb2ea7edbe17a3.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "91fadd6173373b783614f83a3.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "d73ae64e31b4606dd2af3f005.png"
    //     }
    //   ],
    //   "seo_title": null,
    //   "meta": null,
    //   "enabled": 1,
    //   "tag": null,
    //   "option_pincodes": null,
    //   "product_code": null,
    //   "hsn_code": null,
    //   "affordability": 0,
    //   "allow_rating": 1,
    //   "show_rating": 1,
    //   "average_rating": 0,
    //   "effective_price": 0,
    //   "parent_id": 6,
    //   "product_type": "configurable",
    //   "cashback": 0,
    //   "custom_column_1": "",
    //   "custom_column_2": "",
    //   "custom_column_3": "",
    //   "custom_column_4": "",
    //   "cashback_note": " ",
    //   "cashback_price": 0,
    //   "blinkit_price": null,
    //   "reorder_level": null,
    //   "cashback_amt": null,
    //   "category_name": "iPhone 15 Pro",
    //   "category_slug": "iphone-15-pro2",
    //   "parent_category_slug": "iphone1"
    // },
    // {
    //   "id": 49,
    //   "sku": "I1B1G34",
    //   "name": "iPhone 15 Blue 128GB",
    //   "slug": "iphone-15-blue-128-gb",
    //   "route_id": 2683,
    //   "description": "",
    //   "excerpt": "",
    //   "price": 79900,
    //   "saleprice": 70312,
    //   "free_shipping": 0,
    //   "shippable": 1,
    //   "taxable": 0,
    //   "fixed_quantity": 0,
    //   "dimension": null,
    //   "track_stock": 0,
    //   "quantity": 1,
    //   "images": [
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "5590b57157f09e0ce7f793433.jpg"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "8266a73a3380d7d42690d4f74.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "9047e6d4e4579087c9f996504.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "90259af278cfea1af89df4daf.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "1a9007f73d3dcc7f4a9b3075c.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "190bf49cfecda6f5dfda1e3c4.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "85b86e89ed89bc78337098186.png"
    //     },
    //     {
    //       "alt": "",
    //       "caption": "",
    //       "sequence": 0,
    //       "filename": "ec9a5ee13e266067b81c447aa.png"
    //     }
    //   ],
    //   "seo_title": null,
    //   "meta": null,
    //   "enabled": 1,
    //   "tag": null,
    //   "option_pincodes": null,
    //   "product_code": null,
    //   "hsn_code": null,
    //   "affordability": 0,
    //   "allow_rating": 1,
    //   "show_rating": 1,
    //   "average_rating": 0,
    //   "effective_price": 0,
    //   "parent_id": 4,
    //   "product_type": "configurable",
    //   "cashback": 0,
    //   "custom_column_1": "",
    //   "custom_column_2": "",
    //   "custom_column_3": "",
    //   "custom_column_4": "",
    //   "cashback_note": " ",
    //   "cashback_price": 0,
    //   "blinkit_price": null,
    //   "reorder_level": null,
    //   "cashback_amt": 0,
    //   "category_name": "iPhone 15",
    //   "category_slug": "iphone-15123",
    //   "parent_category_slug": "iphone1"
    // },
  ];
  imgUrl = environment.imgUrl;

  constructor(private commonService: CommonService,) { }

  ngOnInit(): void {
    // this.commonService.baseUrls$.subscribe((result) => {
    //   this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    // }, () => {
    //   this.imgUrl = environment.imgUrl;
    // });
  }

}
