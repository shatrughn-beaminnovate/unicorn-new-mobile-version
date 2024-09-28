import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-product-airpod',
  templateUrl: './popular-product-airpod.component.html',
  styleUrls: ['./popular-product-airpod.component.scss']
})
export class PopularProductAirPod implements OnInit {

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
  recently_products_AirPods = [
    {
      "id": 679,
      "sku": "MQD83HN\/A",
      "name": "AirPods Pro (2nd generation)",
      "slug": "airpods-pro-2nd-generation1",
      "route_id": "3347",
      "description": "<span>AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency and Personalised Spatial Audio with dynamic head tracking for immersive sound. Now with multiple ear tips (XS, S, M, L) and up to 6 hours of listening time.<\/span>",
      "excerpt": "",
      "price": "24900.00",
      "saleprice": "24900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "100",
      "related_products": "[]",
      "images": [
        {
          "alt": "AirPods Pro (2nd generation) | Unicorn Store",
          "caption": "AirPods Pro (2nd generation) | Unicorn Store",
          "sequence": 1,
          "filename": "5407038fa5e3992dd30bc6d023358656.jpeg",
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
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "cashback_amt": null
    },
    {
      "id": 1194,
      "sku": "LN-72846-LAVENDER",
      "name": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER",
      "slug": "uniq-airpods-pro-case-ln-72846-lavender",
      "route_id": "3862",
      "description": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER",
      "excerpt": "",
      "price": "1299.00",
      "saleprice": "1299.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": null,
      "track_stock": "0",
      "quantity": "0",
      "related_products": "[]",
      "images": [
        {
          "alt": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER | Unicorn Store",
          "caption": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER | Unicorn Store",
          "sequence": 1,
          "filename": "92d91dcec7ad218e7dedc60e78f45189.jpg",
          "primary": true
        }
      ],
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": null,
      "option_pincodes": null,
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
      "id": 680,
      "sku": "MME73HN\/A",
      "name": "AirPods (3rd\u00a0generation)",
      "slug": "airpods-3rdgeneration1",
      "route_id": "3348",
      "description": "<span>Introducing the all-new AirPods. Featuring spatial audio that places sound all around you,1 Adaptive EQ that tunes music to your ears and longer battery life.2 It&#8217;s all sweat and water resistant and delivers an experience that&#8217;s simply magical.3<\/span>",
      "excerpt": "",
      "price": "20900.00",
      "saleprice": "19855.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "2",
      "related_products": "[]",
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "AirPods (3rd\u00a0generation) | Unicorn Store",
          "caption": "AirPods (3rd\u00a0generation) | Unicorn Store",
          "sequence": 1,
          "filename": "3c50d5bd7752353a070100fb9968ec4f.jpeg",
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
      "id": 1590,
      "sku": "MTJV3HN\/A",
      "name": "AirPods Pro (2nd generation) with MagSafe Case (USB\u2011C)-2023",
      "slug": "airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",
      "route_id": "4258",
      "description": "",
      "excerpt": "",
      "price": "24900.00",
      "saleprice": "24900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "10",
      "related_products": "[]",
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
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
  ];

  recently_popup = [
    {
      "id": 679,
      "sku": "MQD83HN\/A",
      "name": "AirPods Pro (2nd generation)",
      "slug": "airpods-pro-2nd-generation1",
      "route_id": "3347",
      "description": "<span>AirPods Pro feature up to 2x more Active Noise Cancellation, plus Adaptive Transparency and Personalised Spatial Audio with dynamic head tracking for immersive sound. Now with multiple ear tips (XS, S, M, L) and up to 6 hours of listening time.<\/span>",
      "excerpt": "",
      "price": "24900.00",
      "saleprice": "24900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "100",
      "related_products": "[]",
      "images": [
        {
          "alt": "AirPods Pro (2nd generation) | Unicorn Store",
          "caption": "AirPods Pro (2nd generation) | Unicorn Store",
          "sequence": 1,
          "filename": "5407038fa5e3992dd30bc6d023358656.jpeg",
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
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "cashback_amt": null
    },
    {
      "id": 1194,
      "sku": "LN-72846-LAVENDER",
      "name": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER",
      "slug": "uniq-airpods-pro-case-ln-72846-lavender",
      "route_id": "3862",
      "description": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER",
      "excerpt": "",
      "price": "1299.00",
      "saleprice": "1299.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": null,
      "track_stock": "0",
      "quantity": "0",
      "related_products": "[]",
      "images": [
        {
          "alt": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER | Unicorn Store",
          "caption": "Uniq-AirPods Pro Case-LN-72846 -LAVENDER | Unicorn Store",
          "sequence": 1,
          "filename": "92d91dcec7ad218e7dedc60e78f45189.jpg",
          "primary": true
        }
      ],
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "seo_title": "",
      "meta": "",
      "enabled": "1",
      "tag": null,
      "option_pincodes": null,
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
      "id": 680,
      "sku": "MME73HN\/A",
      "name": "AirPods (3rd\u00a0generation)",
      "slug": "airpods-3rdgeneration1",
      "route_id": "3348",
      "description": "<span>Introducing the all-new AirPods. Featuring spatial audio that places sound all around you,1 Adaptive EQ that tunes music to your ears and longer battery life.2 It&#8217;s all sweat and water resistant and delivers an experience that&#8217;s simply magical.3<\/span>",
      "excerpt": "",
      "price": "20900.00",
      "saleprice": "19855.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "2",
      "related_products": "[]",
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
      "images": [
        {
          "alt": "AirPods (3rd\u00a0generation) | Unicorn Store",
          "caption": "AirPods (3rd\u00a0generation) | Unicorn Store",
          "sequence": 1,
          "filename": "3c50d5bd7752353a070100fb9968ec4f.jpeg",
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
      "id": 1590,
      "sku": "MTJV3HN\/A",
      "name": "AirPods Pro (2nd generation) with MagSafe Case (USB\u2011C)-2023",
      "slug": "airpods-pro-2nd-generation-with-magsafe-case-usbc-20231",
      "route_id": "4258",
      "description": "",
      "excerpt": "",
      "price": "24900.00",
      "saleprice": "24900.00",
      "free_shipping": "0",
      "shippable": "1",
      "taxable": "0",
      "fixed_quantity": "0",
      "dimension": "",
      "track_stock": "0",
      "quantity": "10",
      "related_products": "[]",
      "color": "#c4c5c7",
      "space": "128GB",
      "prices": {
        "256GB": { "price": 81900, "id": 1245222 },
        "64GB": { "price": 174503, "id": 44444 },
        "128GB": { "price": 145103, "id": 3333 }
      },
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
      this.fireProductImpression(this.recently_products_AirPods);
      this.loading = false;
    }, 500);
    this.recently_products_AirPods.forEach((product: any) => {
      product.salePercentage = this.calculateSalePercentage(product);
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
  fireProductImpression(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "AirPods",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "popular_product_airpods",
        item_list_name: "Popular Product - AirPods",
        items: items
      }
    });
  }

  fireProductSelectImpression(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "popular_product_airpods",
        item_list_name: "Popular Product - AirPods",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "AirPods",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }
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
    const product = this.recently_products_AirPods.find(product => product.id === productId);
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
