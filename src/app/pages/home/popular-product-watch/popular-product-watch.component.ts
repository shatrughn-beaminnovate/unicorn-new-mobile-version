import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-watch',
  templateUrl: './popular-product-watch.component.html',
  styleUrls: ['./popular-product-watch.component.scss']
})
export class PopularProductWatch implements OnInit {

  imgUrl = environment.imgUrl;
  selectedProductId: string = '';
  displayModal!: boolean;
  val2 = 5
  selectedSpaceVariant: string = '';
  selectedColor: string = '';
  currentNumber = 1;
  selectedProduct: any;
  isWishlistAdded!: boolean;
  optionsHolder: any;
  loading: boolean = true;
  recently_products_watch = [

    {
      "id": 601,
      "sku": "AWUG4708",
      "name": "Apple Watch Ultra Green 49mm",
      "slug": "apple-watch-ultra-green-49mm",
      "route_id": 3268,
      "description": "",
      "excerpt": "",
      "price": 0,
      "color": "#645d4b",
      "space": "49mm",
      "prices": {
        "49mm": 0,
        "41mm": 155103,
        "45mm": 174503,

      },
      "saleprice": 0,
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
          "filename": "a9d5f76f92c44ac7d08a4de08.jpeg"
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
      "parent_id": 36,
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
      "category_name": "Apple Watch Ultra",
      "category_slug": "apple-watch-ultra1",
      "parent_category_slug": "watch1"
    },
    {
      "id": 1971,
      "sku": "AWS9SACWSS4GL914",
      "name": "Apple Watch Series 9 Starlight Aluminium Case with Starlight Sport 45mm GPS Loop",
      "slug": "apple-watch-series-9-starlight-aluminium-case-with-starlight-sport-45mm-gps-loop",
      "route_id": 4688,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "color": "#efe1d6",
      "space": "45mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
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
          "filename": "164a82a1db7bb22180efcd9d5.jpeg"
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
      "parent_id": 86,
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
      "category_name": "Apple Watch Series 9",
      "category_slug": "apple-watch-series-91",
      "parent_category_slug": "watch1"
    },
    {
      "id": 1749,
      "sku": "AWU2IS561",
      "name": "Apple Watch Ultra 2  Indigo Small",
      "slug": "apple-watch-ultra-2-indigo-small",
      "route_id": 4428,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "color": "#372b35",
      "space": "45mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "05d3c6e59b6fe79c494ac0b96.jpeg"
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
      "parent_id": 48,
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
      "category_name": "Apple Watch Ultra 2 ",
      "category_slug": "apple-watch-ultra-21",
      "parent_category_slug": "watch1"
    },
    {
      "id": 2001,
      "sku": "AWS9MACWMS4G+CL720",
      "name": "Apple Watch Series 9 Midnight Aluminium Case with Midnight Sport 41mm GPS + Cellular Loop",
      "slug": "apple-watch-series-9-midnight-aluminium-case-with-midnight-sport-41mm-gps-cellular-loop",
      "route_id": 4718,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#181d23",
      "space": "41mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bb89d9b5f77c3aa801c724331.jpeg"
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
      "parent_id": 86,
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
      "category_name": "Apple Watch Series 9",
      "category_slug": "apple-watch-series-91",
      "parent_category_slug": "watch1"
    },

  ];

  recently_popup = [
    {
      "id": 601,
      "sku": "AWUG4708",
      "name": "Apple Watch Ultra Green 49mm",
      "slug": "apple-watch-ultra-green-49mm",
      "route_id": 3268,
      "description": "",
      "excerpt": "",
      "price": 0,
      "color": "#645d4b",
      "space": "49mm",
      "prices": {
        "49mm": 0,
        "41mm": 155103,
        "45mm": 174503,

      },
      "saleprice": 0,
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
          "filename": "a9d5f76f92c44ac7d08a4de08.jpeg"
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
      "parent_id": 36,
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
      "category_name": "Apple Watch Ultra",
      "category_slug": "apple-watch-ultra1",
      "parent_category_slug": "watch1"
    },
    {
      "id": 1971,
      "sku": "AWS9SACWSS4GL914",
      "name": "Apple Watch Series 9 Starlight Aluminium Case with Starlight Sport 45mm GPS Loop",
      "slug": "apple-watch-series-9-starlight-aluminium-case-with-starlight-sport-45mm-gps-loop",
      "route_id": 4688,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "color": "#efe1d6",
      "space": "45mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
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
          "filename": "164a82a1db7bb22180efcd9d5.jpeg"
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
      "parent_id": 86,
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
      "category_name": "Apple Watch Series 9",
      "category_slug": "apple-watch-series-91",
      "parent_category_slug": "watch1"
    },
    {
      "id": 1749,
      "sku": "AWU2IS561",
      "name": "Apple Watch Ultra 2  Indigo Small",
      "slug": "apple-watch-ultra-2-indigo-small",
      "route_id": 4428,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "color": "#372b35",
      "space": "45mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "05d3c6e59b6fe79c494ac0b96.jpeg"
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
      "parent_id": 48,
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
      "category_name": "Apple Watch Ultra 2 ",
      "category_slug": "apple-watch-ultra-21",
      "parent_category_slug": "watch1"
    },
    {
      "id": 2001,
      "sku": "AWS9MACWMS4G+CL720",
      "name": "Apple Watch Series 9 Midnight Aluminium Case with Midnight Sport 41mm GPS + Cellular Loop",
      "slug": "apple-watch-series-9-midnight-aluminium-case-with-midnight-sport-41mm-gps-cellular-loop",
      "route_id": 4718,
      "description": "",
      "excerpt": "",
      "price": 0,
      "saleprice": 0,
      "free_shipping": 0,
      "shippable": 1,
      "taxable": 0,
      "fixed_quantity": 0,
      "dimension": null,
      "track_stock": 0,
      "quantity": 1,
      "color": "#181d23",
      "space": "41mm",
      "prices": {
        "41mm": 155103,
        "45mm": 174503,
        "49mm": 0
      },
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "bb89d9b5f77c3aa801c724331.jpeg"
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
      "parent_id": 86,
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
      "category_name": "Apple Watch Series 9",
      "category_slug": "apple-watch-series-91",
      "parent_category_slug": "watch1"
    },
  ];
  recentlyColors = [
    { colorName: 'Green', background: '#645d4b', selected: false },
    { colorName: 'Starlight ', background: '#efe1d6', selected: false },
    { colorName: 'Indigo', background: '#372b35', selected: false },
    { colorName: 'Midnight', background: '#181d23', selected: false }
  ];

  space_variant = [
    { spaces: '45mm', selected_space: false },
    { spaces: '41mm', selected_space: false },
    { spaces: '49mm', selected_space: false },
    // { spaces: '1TB', selected_space: false },

  ];
  constructor(private commonService: CommonService, private router: Router, private dataLayerService: DataLayerService, private messageService: MessageService,) { }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    setTimeout(() => {
      this.fireProductImpression(this.recently_products_watch);
      this.loading = false;
    }, 500);
  }

  fireProductImpression(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "Watch",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "popular_product_watch",
        item_list_name: "Popular Product - Watch",
        items: items
      }
    });
  }

  fireProductSelectImpression(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "popular_product_watch",
        item_list_name: "Popular Product - Watch",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "Watch",
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
  selectColor(index: number): void {
    this.recentlyColors.forEach(color => color.selected = false);
    this.recentlyColors[index].selected = true;
    this.selectedColor = this.recentlyColors[index].colorName;
  }

  // selectSpace(index: number) {
  //   this.space_variant.forEach(space => space.selected_space = false);
  //   this.space_variant[index].selected_space = true;

  // }
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
    const product = this.recently_products_watch.find(product => product.id === productId);
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
  // showModalDialog(productId: any) {

  //   if (this.recently_popup.some(product => product.id === productId)) {
  //     this.selectedProductId = productId;
  //     this.displayModal = true;
  //   }
  // }
  // selectColor(index: number): void {
  //   this.recentlyColors.forEach(color => color.selected = false);


  //   this.recentlyColors[index].selected = true;
  // }
  // selectSpace(index: number): void {
  //   this.space_variant.forEach(space => space.selected_space = false);
  //   this.space_variant[index].selected_space = true;
  // }

  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 1) {
      this.currentNumber--;
    }
  }

}
