import {Component, Input} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {MessageService} from "primeng/api";
import {CartService} from "../../../services/cart.service";
import {AuthService} from "../../../services/auth.service";
import {DataLayerService} from 'src/app/core/services/data-layer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  productId: any; // Product Id
  productName: any; // Product Name
  isAddingToCart = false; // Add to Cart Loader Flag for Button Disable & Enable on Click Event of Add to Cart
  @Input() product!: any; // Product Details
  @Input() quantity: number = 1; // Default Quantity is 1 for Add to Cart
  @Input() styleClass!: string; // Style Class for Add to Cart Button
  @Input() showFirstButton: boolean = true;
  @Input() showPopularButton: boolean = false;
  @Input() showRoundButton: boolean = false;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private cartService: CartService,
    private authService: AuthService,
    private dataLayerService: DataLayerService,
  ) {
  }

  /**
   * Adds the product to the cart.
   * If the user is logged in, the product is added to the cart in the database.
   * If the user is not logged in, the product is added to the guest cart.
   * @returns void
   */
  addToCart(prebook: boolean = false): void {

    if (!this.authService.isLoggedIn && prebook === true) {
      Swal.fire({
        title: 'Pre-Book',
        text: 'You need to login to pre-book this product',
        icon: 'info',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.commonService.loginPopupToggle$.next(true);
          console.log('Pre-Book');
        }
      });
      return;
    }

    this.productId = this.product?.id;
    this.productName = this.product?.name;

    // Payload For Add to Cart
    let payload = {
      product_id: this.product?.id,
      quantity: this.quantity,
    };
    if (this.authService.isLoggedIn) {
      // Product Add to Cart in database when user logged in
      this.isAddingToCart = true;
      this.cartService.addToCart(payload).subscribe((resp) => {
        this.isAddingToCart = false;
        this.handleAddToCartGA4(this.product);
        if (resp.status) {
          this.messageService.add({severity: 'success', detail: resp.message});
          localStorage.removeItem('payload-for-selected-product');
          this.commonService.sidebarCartToggle$.next(true);
        } else {
          this.messageService.add({severity: 'error', detail: resp.message});
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(this.product.id));
          this.commonService.sidebarCartToggle$.next(false);
        }
      })
    } else {
      this.authService.checkGuestCheckoutStatus().subscribe((resp) => {
        // here i change condition 1 in network if true then show 0 show i change here
        if (+resp.data === 1) {
          localStorage.setItem('guest', 'not-allowed');
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(this.productId));
          this.commonService.loginPopupToggle$.next(true);
          // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        } else {
          console.log('Ele : ', 0);
          localStorage.setItem('guest', 'allowed');
          // Get the existing data
          let existing: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!) || [];
          let existingIndex = existing.findIndex((item: any) => +item.id === +this.product.id && +item.bundle === 0);
          if (existingIndex === -1) {
            this.product.item_quantity = 1;
            this.product.cart_item_id = this.product.id;
            existing.push({...this.product, bundle: 0});
            this.messageService.add({severity: 'success', detail: 'Product successfully added to cart'});
          } else {
            if (+existing[existingIndex].fixed_quantity === 0) {
              existing[existingIndex].item_quantity++;
              this.messageService.add({severity: 'success', detail: 'Item quantity in cart has been increased'});
            } else {
              this.messageService.add({severity: 'error', detail: 'Only one unit of this item allowed'});
            }
          }
          sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
          this.commonService.sidebarCartToggle$.next(true);
          this.cartService.getTotalGuestCartItemsSubject.next(true);
          this.handleAddToCartGA4(this.product);
        }
      });
    }
  }

  handleAddToCartGA4(product: any, quantity: number = 1) {
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        currency: 'INR',
        value: product.saleprice,
        items: [
          {
            item_id: product.sku,
            item_name: product.name,
            price: product.saleprice,
            quantity: quantity,
            coupon: product.coupon_code || '',
            discount: product.coupon_discount || 0,
            item_list_id: "add_to_cart",
            item_list_name: "Add to Cart",
          }
        ]
      }
    });
  }

}
