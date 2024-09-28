import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommended-accessories',
  templateUrl: './recommended-accessories.component.html',
  styleUrls: ['./recommended-accessories.component.scss']
})
export class RecommendedAccessoriesComponent implements OnInit {
  accessories = [
    {
      "id": "743",
      "sku": "MHJD3HN\/A",
      "name": "20W USB-C Power Adapter",
      "slug": "20w-usb-c-power-adapter1",
      "route_id": "3411",
      "description": "The Apple 20W USB C Power Adapter offers fast efficient charging at home in the office or on the go. While the power adapter is compatible with any USB C-enabled device Apple recommends pairing it with the 11-inch iPad Pro and 12.9-inch iPad Pro (3rd generation) for optimal charging performance. You can also pair it with iPhone 8 or later to take advantage of the fast-charging feature. USB C to Lightning Cable sold separately.",
      "excerpt": "",
      "price": "1900.00",
      "saleprice": "1900.00",
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
      "id": "1218",
      "sku": "MM0A3ZM\/A",
      "name": "USB-C to Lightning Cable 1m",
      "slug": "usb-c-to-lightning-cable-1m1",
      "route_id": "3886",
      "description": "USB-C to Lightning Cable 1m",
      "excerpt": "",
      "price": "1900.00",
      "saleprice": "1900.00",
      "quantity": "85",
      "images": [
        {
          "alt": "USB-C to Lightning Cable 1m | Unicorn Store",
          "caption": "USB-C to Lightning Cable 1m | Unicorn Store",
          "sequence": 1,
          "filename": "05766c7e1a0009c1026aca5bfd087018.jpeg",
          "primary": true
        }
      ],
      "product_type": "simple",
      "parent_id": "58",
      "enabled": "1"
    },

    {
      "id": "1602",
      "sku": "MU2G3ZM\/A",
      "name": "240W USB-C Charge Cable (2m)",
      "slug": "240w-usb-c-charge-cable-2m1",
      "route_id": "4270",
      "description": "<span>This 2-metre charging cable is made with a woven design &#8212; with USB-C connectors on both ends &#8212; and is ideal for charging, syncing and transferring data between USB-C devices. It supports charging of up to 240 watts and transfers data at USB 2 rates. Pair the USB-C Charge Cable with a compatible USB-C power adapter to conveniently charge your devices from a power point and take advantage of fast-charging capabilities. USB-C power adapters sold separately.<\/span>",
      "excerpt": "",
      "price": "2900.00",
      "saleprice": "2900.00",
      "quantity": "98",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "51a0a809cce9b3ab158a19e8b561e7f9.jpeg"
        }
      ],
      "product_type": "simple",
      "parent_id": "71",
      "enabled": "1"
    },
    {
      "id": "1538",
      "sku": "MT393ZM\/A",
      "name": "iPhone 15 FineWoven Case with MagSafe - Black",
      "slug": "iphone-15-finewoven-case-with-magsafe-black1",
      "route_id": "4206",
      "description": "<div class=\"para-list as-pdp-lastparalist\"><p><span>Designed by Apple to complement iPhone 15 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone.<\/span><br><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there&#8217;s a soft microfibre lining for even more protection.<\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>With built-in magnets that align perfectly with iPhone 15 Pro, this case offers a magical attach experience and faster wireless charging, every time. When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span><br><\/span><\/font><\/p><p><font face=\"SF Pro Text, SF Pro Icons, AOS Icons, Helvetica Neue, Helvetica, Arial, sans-serif\"><span>Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process. So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/span><\/font><\/p><\/div>",
      "excerpt": "",
      "price": "5900.00",
      "saleprice": "5900.00",
      "quantity": "100",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "09458998f705b775a523a97fa217e682.jpeg"
        }
      ],
      "product_type": "simple",
      "parent_id": "41",
      "enabled": "1"
    },
    {
      "id": "1539",
      "sku": "MT203ZM\/A",
      "name": "iPhone 15 Clear Case with MagSafe",
      "slug": "iphone-15-clear-case-with-magsafe1",
      "route_id": "4207",
      "description": "<p><font color=\"#212529\">Thin, light and easy to grip &#8212; this Apple-designed case shows off the brilliant coloured finish of iPhone 15 while providing extra protection.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Crafted with a blend of optically clear polycarbonate and flexible materials, the case fits right over the buttons for easy use. On the surface, a scratch-resistant coating has been applied to both the interior and exterior.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">And all materials and coatings are optimised to prevent yellowing over time.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">With built-in magnets that align perfectly with iPhone 15, this case offers a magical attach experience and faster wireless charging, every time.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">When it&#8217;s time to charge, just leave the case on your iPhone and snap on your MagSafe charger, or set it on your Qi-certified charger.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">Like every Apple-designed case, it undergoes thousands of hours of testing throughout the design and manufacturing process.<\/font><\/p><p><font color=\"#212529\"><br><\/font><\/p><p><font color=\"#212529\">So not only does it look great, it&#8217;s built to protect your iPhone from scratches and drops.<\/font><\/p>",
      "excerpt": "",
      "price": "4900.00",
      "saleprice": "4900.00",
      "quantity": "100",
      "images": [
        {
          "alt": "",
          "caption": "",
          "primary": true,
          "filename": "204f6988e2df458a6f9c695ddcf009c8.jpeg"
        }
      ],
      "product_type": "simple",
      "parent_id": "41",
      "enabled": "1"
    },
    {
      "id": "739",
      "sku": "MUF72ZM\/A",
      "name": "USB-C Charge Cable (1 m)",
      "slug": "usb-c-charge-cable-1-m1",
      "route_id": "3407",
      "description": "<span>With the Apple USB-C charging cable, you have everything you need to provide your device with USB-C connector with new energy. On top of that, this cable is suitable for synchronizing and transferring data to your MacBook or PC, for instance. With a separately available USB-C power adapter, you can charge your USB-C device via the power grid.<\/span>",
      "excerpt": "",
      "price": "1900.00",
      "saleprice": "1900.00",
      "quantity": "1",
      "images": [
        {
          "alt": "USB-C Charge Cable (1 m) | Unicorn Store",
          "caption": "USB-C Charge Cable (1 m) | Unicorn Store",
          "sequence": 1,
          "filename": "e718784154cf9fe95446da3f5388e38b.jpeg",
          "primary": true
        }
      ],
      "product_type": "simple",
      "parent_id": "37",
      "enabled": "1"
    }
  ]
  loading: boolean = true;
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

  constructor(private commonService: CommonService, private dataLayerService: DataLayerService) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireRecommendedAccessoriesGA4Event(this.accessories);
      this.loading = false;
    }, 500);
  }

  fireRecommendedAccessoriesGA4Event(data: any) {
    let items:any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "Recommended Accessories",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "recommended_accessories",
        item_list_name: "Recommended Accessories",
        items: items
      }
    });
  }

  fireRecommendedAccessoriesSelectGA4Event(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "recommended_accessories",
        item_list_name: "Recommended Accessories",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "Recommended Accessories",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }

  handleImageError(event: any, item: any) {
    event.target.src = this.imgUrl + '/medium/' + item?.image;
  }

}
