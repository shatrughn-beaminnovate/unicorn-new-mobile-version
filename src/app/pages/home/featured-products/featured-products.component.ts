import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  providers: [DecimalPipe]
})
export class FeaturedProductsComponent implements OnInit {
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

  imgUrl = environment.imgUrl;
  loading: boolean = true;
  Bestsellers_products = [
    {
      "id": 3102,
      "sku": "MYED3HN/A",
      "name": "iPhone 16 Teal 128GB",
      "slug": "iphone-16-teal-128gb",
      "route_id": 6069,
      "description": "",
      "excerpt": "",
      "price": 79900,
      "saleprice": 79900,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 1,
      "dimension": null,
      "track_stock": 0,
      "quantity": 83,
      "images": [
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "7b5a4fa3cfba5d5a728bcea01.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "53ef1ee88db570bdbff87c664.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "03efa06aef76c900c561dd616.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "6b4a220b5228eea839066b5fc.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "ec046da6fb3487b3210bc17ef.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "6dc47d539500df6e1631a347c.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "2334eba7b943a8d84444beafd.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "4a6b8be3e6bab58139353193b.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "480b88a5c56b7082f6d6532ac.jpg"
          }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 3,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 321,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": 0,
      "custom_column_2": 1000,
      "custom_column_3": "",
      "custom_column_4": "Get ₹5000 Instant Cashback After 20th September On Selected Cards*",
      "cashback_note": "",
      "cashback_price": 0,
      "blinkit_price": 0,
      "reorder_level": 0,
      "cashback_amt": 0,
      "category_name": "iPhone 16",
      "category_slug": "iphone-16",
      "parent_category_slug": "iphone1",
      "wishlist": false
  },
    {
      "id": 3114,
      "sku": "MXVX3HN\/A",
      "name": "iPhone 16 Plus Ultramarine 128GB",
      "slug": "iphone-16-plus-ultramarine-128gb",
      "route_id": 6082,
      "description": "",
      "excerpt": "",
      "price": 89900,
      "saleprice": 89900,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 1,
      "dimension": null,
      "track_stock": 0,
      "quantity": 100,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b2a934e30a531f336218a44ad.jpg"
        }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 3,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 322,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": 0,
      "custom_column_2": 1000,
      "custom_column_3": "",
      "custom_column_4": "Get \u20b95000 Instant Cashback After 20th September On Selected Cards*",
      "cashback_note": "",
      "cashback_price": 0,
      "blinkit_price": 0,
      "reorder_level": 0,
      "cashback_amt": 0,
      "category_name": "iPhone 16 Plus",
      "category_slug": "iphone-16-plus",
      "parent_category_slug": "iphone1",
      "wishlist": false
    },
    {
      "id": 3133,
      "sku": "MYNG3HN/A",
      "name": "iPhone 16 Pro  Natural Titanium 128GB",
      "slug": "iphone-16-pro-natural-titanium-128gb",
      "route_id": 6102,
      "description": "",
      "excerpt": "",
      "price": 119900,
      "saleprice": 119900,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 1,
      "dimension": null,
      "track_stock": 0,
      "quantity": 81,
      "images": [
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "81d3d9b519293399c82414d0f.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "64ac854d03f6b0f36a188d507.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "99c37ee9a0b68e0a4116c3c7a.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "c78c09b97b488638b0dda3117.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "b536ae4f5e5d63eb708dbb696.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "27e8b542e0ce6d08f09eb90d7.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "0a41512b8e7e46b77226f1191.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "9fee52dceaab09a029b5decbd.jpg"
          },
          {
              "alt": "",
              "caption": "",
              "sequence": 0,
              "filename": "357ad526d31cf160a3df8c609.jpg"
          }
      ],
      "seo_title": null,
      "meta": null,
      "enabled": 3,
      "tag": null,
      "option_pincodes": null,
      "product_code": null,
      "hsn_code": null,
      "affordability": 0,
      "allow_rating": 1,
      "show_rating": 1,
      "average_rating": 0,
      "effective_price": 0,
      "parent_id": 323,
      "product_type": "configurable",
      "cashback": 0,
      "custom_column_1": 0,
      "custom_column_2": 1000,
      "custom_column_3": "",
      "custom_column_4": "Dispatch within 3-4 week.",
      "cashback_note": "",
      "cashback_price": 0,
      "blinkit_price": 0,
      "reorder_level": 0,
      "cashback_amt": 0,
      "category_name": "iPhone 16 Pro",
      "category_slug": "iphone-16-pro",
      "parent_category_slug": "iphone1",
      "wishlist": false
  },
    {
      "id": "3096",
      "sku": "MWW63HN\/A",
      "name": "AirPods Max - Blue",
      "slug": "airpods-max-blue",
      "route_id": "6062",
      "description": "",
      "excerpt": "",
      "price": "59900.00",
      "saleprice": "59900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "1",
      "dimension": "",
      "track_stock": "0",
      "quantity": "20",
      "related_products": [],
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "f68ab204f232c0d5b23f8986b.jpg"
        }
      ],
      "seo_title": "",
      "meta": "",
      "enabled": "3",
      "tag": "",
      "option_pincodes": "",
      "product_code": "",
      "hsn_code": "",
      "affordability": "0",
      "allow_rating": "0",
      "show_rating": "0",
      "average_rating": "0",
      "effective_price": "0",
      "parent_id": "320",
      "product_type": "simple",
      "cashback": "0",
      "custom_column_1": "0",
      "custom_column_2": "1000.00",
      "custom_column_3": "",
      "custom_column_4": "Available from 20 September",
      "cashback_note": "",
      "cashback_price": "0",
      "blinkit_price": "0",
      "reorder_level": "0",
      "cashback_amt": "0",
      "parent_category": {
        "slug": "airpods-max",
        "name": "Airpods Max"
      },
      "wishlist": false
    },
    {
      "id": "681",
      "sku": "MV7N2HN\/A",
      "name": "AirPods with Charging Case",
      "slug": "airpods-with-charging-case1",
      "route_id": "3349",
      "description": "",
      "excerpt": "",
      "price": 12900,
      "saleprice": 12900,
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "99",
      "related_products": "[]",
      "images": [
        {
          "alt": "AirPods with Charging Case | Unicorn Store",
          "caption": "AirPods with Charging Case | Unicorn Store",
          "sequence": 1,
          "filename": "922b205e126b8e1ffe8f54f519972d13.jpeg",
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
      "parent_id": "84",
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
      "cashback_amt": null
    },
    {
      "id": "743",
      "sku": "MHJD3HN\/A",
      "name": "20W USB-C Power Adapter",
      "slug": "20w-usb-c-power-adapter1",
      "route_id": "3411",
      "description": "The Apple 20W USB C Power Adapter offers fast efficient charging at home in the office or on the go. While the power adapter is compatible with any USB C-enabled device Apple recommends pairing it with the 11-inch iPad Pro and 12.9-inch iPad Pro (3rd generation) for optimal charging performance. You can also pair it with iPhone 8 or later to take advantage of the fast-charging feature. USB C to Lightning Cable sold separately.",
      "excerpt": "",
      "price": 1900,
      "saleprice": 1900,
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "82",
      "related_products": "[]",
      "images": [
        {
          "alt": "20W USB-C Power Adapter | Unicorn Store",
          "caption": "20W USB-C Power Adapter | Unicorn Store",
          "sequence": 1,
          "filename": "1ac88a0a5f3a55dd1af2801ee440aae0.jpeg",
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
      "parent_id": "71",
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
      "cashback_amt": null
    },
    {
      "id": "1534",
      "sku": "MT3J3ZM\/A",
      "name": "iPhone 15 FineWoven Case with MagSafe - Evergreen",
      "slug": "iphone-15-finewoven-case-with-magsafe-evergreen1",
      "route_id": "4202",
      "description": "<div class=\"para-list as-pdp-lastparalist\"><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>Designed by Apple to complement iPhone 15 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>With built-in magnets that align perfectly with iPhone 15 Pro, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process. So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/span><\/font><\/p><\/div>",
      "excerpt": "iPhone 15 FineWoven Case with MagSafe - Evergreen",
      "price": "5900.00",
      "saleprice": "5900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "90",
      "related_products": "[]",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "27ead50625081e16bd134031b81a8351.jpeg"
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
      "parent_id": "41",
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
      "id": 151,
      "sku": "MPQ13HN\/A",
      "name": "iPad 10th Generation Blue 64GB Wi-Fi",
      "slug": "ipad-10th-generation-blue-64-gb-wi-fi",
      "route_id": 2796,
      "description": "",
      "excerpt": "",
      "price": 39900,
      "saleprice": 37905,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "iPad 10th Generation Blue 64GB Wi-Fi | Unicorn Store",
          "caption": "iPad 10th Generation Blue 64GB Wi-Fi | Unicorn Store",
          "sequence": 1,
          "filename": "aef68050ba3d81342218d965b672752f.png",
          "primary": true
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 2,
          "filename": "5d53b95387580980d59f9ac2d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 3,
          "filename": "7b8e7bdfb0a57bdbd21ccf50b.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 4,
          "filename": "a569cf86a1d3a04062883e2a2.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 5,
          "filename": "d0eab0acd4397a430b5ac5e4d.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 6,
          "filename": "96f18679fe1107b279d8af22a.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 7,
          "filename": "958834eb9acc48c37e8f6d94f.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 8,
          "filename": "df162655da087f90b7b8e1f36.png"
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
      "blinkit_price": null,
      "reorder_level": null,
      "cashback_amt": null,
      "category_name": "iPad 10th Generation",
      "category_slug": "ipad-10th-generation2",
      "parent_category_slug": "ipad1"
    },
  ];
  constructor(
    private commonService: CommonService,
    private dataLayerService: DataLayerService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    setTimeout(() => {
      this.fireFeaturedProductGAEvents(this.Bestsellers_products);
      this.loading = false;
    }, 500);
  }

  fireFeaturedProductGAEvents(data: any) {

    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: item.category_name,
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });

    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "featured_products",
        item_list_name: "Featured Products",
        items: items
      }
    });
  }


  fireFeaturedProductSelectGAEvents(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "featured_products",
        item_list_name: "Featured Products",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: item.category_name,
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }



  calculateSalePercentage(product: any): string {
    // Handle case where both price and saleprice are zero
    if ((product.price === 0 || product.price === "0") && (product.saleprice === 0 || product.saleprice === "0")) {
      return "0% off";
    }

    // Convert price and saleprice to numbers if they are strings
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    const saleprice = typeof product.saleprice === 'string' ? parseFloat(product.saleprice) : product.saleprice;

    // Handle case where price is zero to avoid division by zero
    if (price === 0) {
      return "0% off";
    }

    // Calculate the sale percentage
    const salePercentage = ((price - saleprice) / price) * 100;

    // Format the sale percentage using Angular's DecimalPipe
    const formattedSalePercentage = this.decimalPipe.transform(salePercentage, '1.0-1');

    return `${formattedSalePercentage}% off`;
  }
}
