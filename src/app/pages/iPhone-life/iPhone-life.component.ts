import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-iPhone-life',
  templateUrl: './iPhone-life.component.html',
  styleUrls: ['./iPhone-life.component.scss']
})
export class IphoneLifeComponent implements OnInit {
  hotDealsHolder: any[] = [];
  imgUrl = environment.imgUrl;
  customOptions: OwlOptions = {};
  cartItems: any[] = [];
  productId: any; // Product Id
  productName: any; // Product Name
  isAddingToCart = false;// Product Details
  quantity: number = 1; // Default Quantity is 1 for Add to Cart
  @Input() styleClass!: string; // Style Class for Add to Cart Button
  @Input() showFirstButton: boolean = true;
  @Input() showPopularButton: boolean = false;
  @Input() showRoundButton: boolean = false;
  product: any;
  weekly_bestsellersHolder: any;
  ipfl!: string;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private location: Location,
    private messageService: MessageService,
    private cartService: CartService,
    private authService: AuthService,
  ) {
    this.customOptions = {
      loop: true,
      margin: 15,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      stagePadding: 50,
      dots: true,
      navSpeed: 700,
      navText: ['<', '>'],
      responsive: {
        0: {
          items: 1,
          nav: false,
          stagePadding: 30,
        },
        425: {
          items: 2,
          nav: false,
          stagePadding: 30,
        },
        768: {
          items: 3,
          nav: false,
          stagePadding: 30,
        },
        1024: {
          items: 4,
          nav: true,
        },
        1440: {
          items: 5,
          nav: true,
        }
      }
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('iPhone For Life | Unicornstore');
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    // this.fetchDataWithDates();
    this.getDataForIphoneLife();
  }

  getDataForIphoneLife() {
    this.commonService.getRequest('get_all_afls').subscribe((result) => {
      this.weekly_bestsellersHolder = result.data;
      console.log("hotDealsHolder", this.hotDealsHolder);
    });
  }

  fetchDataWithDates() {
    // console.log('Data fetching started...');
    const currentDate = new Date();
    const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const endDate = currentDate;

    const payload = {
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10)
    };

    this.commonService.postRequest('weekly_bestseller', payload).subscribe((result) => {
      this.weekly_bestsellersHolder = result;
      console.log("weekly", this.weekly_bestsellersHolder);
      // Calculate sale percentage for each product
      this.weekly_bestsellersHolder.forEach((product: any) => {
        product.salePercentage = this.calculateSalePercentage(product);
      });

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
  addToCart(item: any) {
    this.productId = item.id;
    this.productName = item.name;
    let payload = {
      product_id: item.id,
      quantity: this.quantity,
      ipfl: "true"
    };
    if (this.authService.isLoggedIn) {
      // Product Add to Cart in database when user logged in
      this.isAddingToCart = true;
      this.cartService.addToCart(payload).subscribe((resp) => {
        this.isAddingToCart = false;
        this.commonService.sidebarCartToggle$.next(true);
        this.handleAddToCartGA4(this.product);
        if (resp.status) {
          this.messageService.add({ severity: 'success', detail: resp.message });
          localStorage.removeItem('payload-for-selected-product');
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(this.product.id));
        }
      });
    } else {
      this.authService.checkGuestCheckoutStatus().subscribe((resp) => {
        if (+resp.data === 1) {
          localStorage.setItem('guest', 'not-allowed');
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(this.productId));
          this.commonService.loginPopupToggle$.next(true);
        } else {
          localStorage.setItem('guest', 'allowed');
          let existingItems = sessionStorage.getItem('guest-cart-items');
          let existing: any[] = existingItems ? JSON.parse(existingItems) : [];
          let index = existing.findIndex((cartItem: any) => cartItem.id === item.id);
          if (index === -1) {
            // If item is not in cart, add it
            item.item_quantity = 1;
            item.fixed_quantity = 1;  // added dummy fixed_quantity
            item.cart_item_id = item.id;
            item.ipfl = "true";
            item.bundle= 0;
            existing.push(item,);
            this.messageService.add({ severity: 'success', detail: 'Product successfully added to cart' });
          } else {
            // If item is already in cart, increase quantity
            existing[index].item_quantity += 1;
            this.messageService.add({ severity: 'success', detail: 'Item quantity in cart has been increased' });
          }
          sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));

          this.cartService.getTotalGuestCartItemsSubject.next(true);
          this.handleAddToCartGA4(item);
        }
      });
    }
  }



  handleAddToCartGA4(product: any) {
    // // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        item_list_id: "add_to_cart",
        item_list_name: "Add To Cart",
        items: [
          {
            item_id: product.sku,
            item_name: product.name,
            currency: 'INR',
            price: product.saleprice,
            quantity: 1
          }
        ]
      }
    });
  }
  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Hot Deals | Unicornstore',
    });
  }

  isKeyExist(item: any, type: string) {
    return item.hasOwnProperty(type);
  }

  handleImageError(event: any, item: any) {
    event.target.src = this.imgUrl + '/medium/' + item?.image;
  }

  onClickType(slug: string) {
    this.router.navigate(['type', slug], { queryParams: { type: true } });
    // this.messageService.add({severity: 'error', detail: 'Work Inprogress'});
  }

}
