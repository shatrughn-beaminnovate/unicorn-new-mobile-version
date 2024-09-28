import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';
import { MessageService } from "primeng/api";
import { NotifyMeModalComponent } from "../../core/shared/components/notify-me-modal/notify-me-modal.component";
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('notifyMeModal') notifyMeModal!: NotifyMeModalComponent;
  isProductShare = false;
  title!: any;
  product!: any;
  imgUrl = environment.imgUrl;
  recommendProduct: any[] = [];
  primaryProductData!: any;
  isWishlistAdded!: boolean;

  constructor(
    private commonService: CommonService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private dataLayerService: DataLayerService,
    private titleService: Title,
    private meta: Meta
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params?.slug.replace(/-/g, ' ');
      let slug = this.route.snapshot.params.slug;
      this.getProductBySlug(slug);
      // this.commonService.getData(`attribute/get_product/${slug}`).subscribe((result) => {
      //   if (typeof result.product === 'object' && !Array.isArray(result.product)) {
      //     (window as any).dataLayer.push({ ecommerce: null });

      //     (window as any).dataLayer.push({
      //       event: "view_item_list",
      //       ecommerce: {
      //         item_list_id: "related_products",
      //         item_list_name: "Related products",
      //         items: [
      //           {
      //             item_id: result.product.id,
      //             item_name: result.product.name,
      //             affiliation: "Google Merchandise Store",
      //             coupon: "SUMMER_FUN",
      //             discount: 0,
      //             index: 0,
      //             item_category: result.product.name,
      //             location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      //             price: result.product.price,
      //             quantity: result.product.item_quantity || 1 // Provide a default value if item_quantity is not present
      //           }
      //         ]
      //       }
      //     });

      //     console.log('dataLayer event: view_item_list :- ', (window as any).dataLayer);
      //   } else {
      //     // Log an error if result.product is not the expected type
      //     console.error('Error: result.product is not an object or is an array.', result.product);
      //   }
      // });

      // this.commonService.getData(`attribute/get_category/${slug}`).subscribe((result) => {
      //   console.log('Attr Product : ', result);
      //   if(result.status && result.primary){
      //     console.log('It is Product : ', true);
      //     this.attributesHolder = result.attributes;
      //     this.primaryProductData = result.primary;
      //   }
      // });
      //
      // this.commonService.getData(`accessories/${slug}`).pipe(map((resp) => {
      //   if (resp && resp.status && resp.data) {
      //     if (Array.isArray(resp.data) && resp.data.length > 0) {
      //       resp.data.forEach((item: any, index: number) => {
      //         if (item.images) {
      //           resp.data[index].images = Object.values(JSON.parse(item.images))[0];
      //         }
      //       })
      //     }
      //   }
      //   return resp;
      // })).subscribe((result) => {
      //   if (result.product) {
      //     if (result.data.length > 0) {
      //       console.log('Product : ', result.data[0]);
      //       this.product = result.data[0];
      //       this.getRecommendedProducts(this.product.id);
      //     }
      //   }
      // });

    });
  }

  getProductBySlug(slug: string) {
    let payload = {
      view: "variant" //variant or tree
    };
    this.commonService.postRequestWithSlug(slug, payload).subscribe((result) => {
      // if (result.status && result.data) {
      this.product = result;
      this.titleService.setTitle(this.product?.name + ' | Unicornstore');
      let metaData = JSON.parse(localStorage.getItem('metaData') || '{}');
      console.log("Meta Data: ", this.product.meta)
      if (this.product.meta && this.product.meta !== '') {
        // Create a new DOMParser
        const parser = new DOMParser();
        // Parse the meta string into a Document
        const parsed = parser.parseFromString(this.product.meta, 'text/html');
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
        this.meta.updateTag({ name: 'description', content: this.product.name });
        this.meta.updateTag({ name: 'keywords', content: this.product.name });
      }
    });
  }

  addToCart(productId: number) {
    console.log('Product : ', productId);
    this.cartService.addToCart({ product_id: productId, quantity: 1 }).subscribe((resp) => {
      console.log('Add to Cart Resp in Product : ', resp);
      if (resp.status === true && resp.data) {
        this.messageService.add({ severity: 'success', detail: resp.message });
        // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
        this.dataLayerService.push({
          event: "add_to_cart",
          ecommerce: {
            item_list_id: "add_to_cart",
            item_list_name: "Product Add to Cart",
            items: [{
              name: resp.data.name,
              id: resp.data.id,
              price: resp.data.price,
              brand: resp.data.brand,
              category: resp.data.category,
              variant: resp.data.variant,
              quantity: resp.data.quantity
            }]
          }
        });
      } else {
        this.messageService.add({ severity: 'error', detail: resp.message });
      }
      if (!resp.status) {
        localStorage.setItem('product-id-before-login-for-add-to-cart', String(productId));
        // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
        this.commonService.loginPopupToggle$.next(true);
      }
    });
  }

  getRecommendedProducts(productId: number) {
    this.commonService.getData(`recommended_products/${productId}`).subscribe((resp) => {
      console.log('Recommended Products : ', resp);
      if (resp && resp.status && resp.data) {
        if (Array.isArray(resp.data) && resp.data.length > 0) {
          resp.data.forEach((item: any, index: number) => {
            if (item.images) {
              resp.data[index].images = Object.values(JSON.parse(item.images))[0];
            }
          })
        }
        this.recommendProduct = resp.data;

        // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
        this.dataLayerService.push({
          event: "view_item_list",
          ecommerce: {
            item_list_id: "recommended_products",
            item_list_name: "Recommended Products",
            items: resp.data.map((item: any, index: any) => ({
              item_id: item.id,
              item_name: item.name,
              index: index,
              item_category: item.name,
              price: item.price,
              quantity: item.item_quantity
            }))
          }
        });
      }
    });
  }

  wishlistToggle(productId: number) {
    if (localStorage.getItem('customer_data')) {
      this.commonService.getRequestWithToken(`add_to_wishlist?product_id=${productId}`).subscribe((resp) => {
        if (resp?.status) {
          this.isWishlistAdded = !this.isWishlistAdded;
          // this.messageService.add({ severity: 'success', detail: resp.message });

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
                  item_id: this.product.sku,
                  item_name: this.product.name,
                  currency: 'INR',
                  price: this.product.saleprice,
                  quantity: this.product.quantity
                }
              ]
            }
          });
        }
      });
      localStorage.removeItem('before-login-wishlist-add');
    } else {
      // localStorage.setItem('payload-for-selected-product', JSON.stringify(this.optionsHolder));
      // localStorage.setItem('before-login-wishlist-add', String(productId));
      // i show here message 
      this.messageService.add({ severity: 'error', detail: "You  need to login to add product to wishlist" });
      // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });

    }
  }

  onClickProductShare() {
    this.isProductShare = !this.isProductShare;
  }

  getFirstImageFileName(images: any) {
    console.log('Img : ', this.imgUrl + '/medium/' + images[0]?.filename);
    if (!images) return;
    return this.imgUrl + '/medium/' + images[0]?.filename;
  }
  setFallbackImage(event: any) {
    event.target.src = 'assets/img/not-found/no-image-found.png';
  }

}
