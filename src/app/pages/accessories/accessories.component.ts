import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';
import { MessageService } from "primeng/api";
import { CartService } from "../../core/services/cart.service";
import { AuthService } from "../../core/services/auth.service";
import { NotifyMeModalComponent } from "../../core/shared/components/notify-me-modal/notify-me-modal.component";
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
  @ViewChild('quickViewModal') quickViewModal!: any;
  @ViewChild('notifyMeModal') notifyMeModal!: NotifyMeModalComponent;
  accessoriesHolder: any[] = [];
  title: any;
  imgUrl = environment.imgUrl;
  productId!: number;
  productName!: string;
  isWishlistAdded: boolean[] = [];
  isFetching: boolean = false;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private meta: Meta,
    private messageService: MessageService,
    private cartService: CartService,
    private authService: AuthService,
    private dataLayerService: DataLayerService
  ) {
  }

  ngOnInit(): void {

    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params.slug;
      let slug = this.route.snapshot?.params.slug;
      this.getProductsBySlug(slug);
      // this.commonService.getData(`accessories/${slug}`).subscribe((result) => {
      //   console.log('Accessories : ', result);

      //   this.dataLayerService.push({ "ecommerce": null }); // Clear the previous ecommerce object.
      //   this.dataLayerService.push({
      //     event: "view_item_list",
      //     ecommerce: {
      //       item_list_id: "accessories",
      //       item_list_name: "Accessories",
      //       items: result.data.map((item: any, index: number) => ({
      //         item_id: item.sku,
      //         item_name: item.name,
      //         item_price: item.saleprice,
      //         index: index,
      //       })),
      //     },
      //   });

      //   console.log("accessories dataLayer :", (window as any).dataLayer);


      //   if (result.status) {
      //     if (result.product && result.data && result.data.length > 0) {
      //       this.accessoriesHolder = result.data || [];
      //       this.isWishlistAdded = Array(this.accessoriesHolder.length).fill(false);
      //     }
      //   } else {
      //     this.messageService.add({ severity: 'error', detail: result.message });
      //   }
      // });
    });
  }

  getProductsBySlug(slug: string) {
    let payload = {
      view: "variant" //variant or tree
    };
    this.isFetching = true;
    this.commonService.postRequestWithSlug(slug, payload).subscribe((result) => {
      this.accessoriesHolder = result.products;
      this.isFetching = false;
      let metaData = JSON.parse(localStorage.getItem('meta-data') || '{}');
      console.log("Meta Data: ", metaData)
      if (metaData?.meta && metaData?.meta !== '') {
        // Create a new DOMParser
        const parser = new DOMParser();
        // Parse the meta string into a Document
        const parsed = parser.parseFromString(metaData?.meta, 'text/html');
        // Get the meta tags from the parsed Document
        const metas = parsed.head.childNodes;

        // Iterate over each meta tag
        for (let i = 0; i < metas.length; i++) {
          const metaTag = metas[i] as HTMLMetaElement;

          if (metaTag.name) {
            // If a meta tag with the same name already exists, update it
            if (this.meta.getTag(`name='${metaTag.name}'`)) {
              this.meta.updateTag({ name: metaTag.name, content: metaTag.content });
            } else {
              // Otherwise, add a new meta tag
              this.meta.addTag({ name: metaTag.name, content: metaTag.content });
            }
          }
        }
      } else {
        this.meta.updateTag({ name: 'description', content: metaData?.name });
        this.meta.updateTag({ name: 'keywords', content: metaData?.name });
      }
    }, (error) => {
      this.isFetching = false;
    });
  }

  // setMetaData(item: any) {
  //   console.log('Meta Data : ', item);
  //   localStorage.setItem('meta-data', JSON.stringify({name: item?.name, meta: item?.meta, seo_title: item?.seo_title}));
  // }

  /* Add To Cart: params: Product Id & Product Name */
  addToCart(product: any, event: any): void {

    this.productId = product.id;
    this.productName = product.name;

    // Payload For Add to Cart
    let payload = {
      product_id: product.id,
      quantity: 1,
    };
    console.log('ATC P : ', payload);
    if (this.authService.isLoggedIn) {
      // Product Add to Cart in database when user logged in
      this.cartService.addToCart(payload).subscribe((resp) => {
        console.log('Add to Cart Resp from api : ', resp);
        if (resp.status) {
          this.messageService.add({ severity: 'success', detail: resp.message });
          this.addToCartAnimation(event);
          localStorage.removeItem('payload-for-selected-product');
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
          localStorage.setItem('product-id-before-login-for-add-to-cart', String(product.id));
        }
      })
    } else {
      if (localStorage.getItem('guest') === 'allowed') {
        if (sessionStorage.getItem('guest-cart-items')) {
          // Get the existing data
          let existing: any = JSON.parse(sessionStorage.getItem('guest-cart-items')!);
          if (existing.findIndex((item: any) => item.id === product.id) === -1) {
            product.item_quantity = 1;
            product.cart_item_id = product.id;
            existing.push(product);
            this.messageService.add({ severity: 'success', detail: 'Product successfully added to cart' });
          } else {
            let index = existing.findIndex((item: any) => item.id === product.id);
            existing[index] = {
              ...existing[index],
              item_quantity: existing[index].item_quantity + 1
            };
            this.messageService.add({ severity: 'success', detail: 'Item quantity in cart has been increased' });
          }
          sessionStorage.setItem('guest-cart-items', JSON.stringify(existing));
        } else {
          product.item_quantity = 1;
          product.cart_item_id = product.id;
          sessionStorage.setItem('guest-cart-items', JSON.stringify([product]));
          this.messageService.add({ severity: 'success', detail: 'Product successfully added to cart' });
        }
        console.log('Reached : ');
        this.cartService.getTotalGuestCartItemsSubject.next(true);
      } else {
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        this.commonService.loginPopupToggle$.next(true);
      }
    }

    // DataLayer Push Add to Cart
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "add_to_cart",
      ecommerce: {
        item_list_id: "add_to_cart",
        item_list_name: "Accessories Add to Cart",
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            currency: 'INR',
            item_variant: product.name,
            price: product.saleprice,
            quantity: product.item_quantity
          }
        ]
      }
    });
  }

  quickProductView(product: any) {
    this.quickViewModal.show(product);
  }

  /** Add to cart animation */
  addToCartAnimation(event: any) {
    const clickedButton = event.target;
    const productItem = clickedButton.closest('.product-item');
    const productImage = productItem.querySelector('.ngxImageZoomThumbnail');
    const cartIcon = document.querySelector('.cart-view-btn')!;
    const rect = cartIcon.getBoundingClientRect();
    const productImageRect = productImage.getBoundingClientRect();
    const clone = productImage.cloneNode(true);
    clone.classList.add('product-image');
    document.body.appendChild(clone);
    clone.style.position = 'fixed';
    clone.style.top = `${productImageRect.top}px`;
    clone.style.left = `${productImageRect.left}px`;
    clone.style.width = `${productImageRect.width}px`;
    clone.style.height = `${productImageRect.height}px`;
    clone.style.transition = 'all 0.5s cubic-bezier(0.42, 0, 0.58, 1)';
    clone.style.zIndex = '9999';
    cartIcon.classList.add('rubber-band-animation');
    requestAnimationFrame(() => {
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = '50px';
      clone.style.height = '50px';
      clone.style.opacity = '0';

      setTimeout(() => {
        clone.remove();
      }, 500);

      setTimeout(() => {
        cartIcon.classList.remove('rubber-band-animation');
      }, 1000);
    });
  }


  wishlistToggle(product: any, i: number) {
    if (localStorage.getItem('customer_data')) {
      this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${product.id}`).subscribe((resp) => {
        if (resp?.status === true) {
          this.isWishlistAdded[i] = !this.isWishlistAdded[i];
        } else {
          this.messageService.add({ severity: 'error', detail: resp.message });
        }
        if (this.isWishlistAdded[i]) {
          // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
          this.dataLayerService.push({
            event: "add_to_wishlist",
            ecommerce: {
              item_list_id: "add_to_wishlist",
              item_list_name: "Accessories Add to Wishlist",
              items: [{
                item_id: product.id,
                item_name: product.name,
                currency: 'INR',
                item_variant: product.name,
                price: product.saleprice,
                quantity: product.quantity
              }]
            }
          });
          console.log("Accessories Add to Wishlist - dataLayer :", (window as any).dataLayer);
        }
      });
      localStorage.removeItem('before-login-wishlist-add');
    } else {
      localStorage.setItem('before-login-wishlist-add', String(product.id));
      // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      this.commonService.loginPopupToggle$.next(true);
    }
  }

}
