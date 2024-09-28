import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { AlertService } from 'src/app/core/shared/alert';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-with-filters',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductWithFiltersComponent implements OnInit {
  isProductShare = false;
  title!: any;
  product!: any;
  imgUrl = environment.imgUrl;
  recommendProduct: any[] = [];
  primaryProductData!: any;
  selectedProductData!: any;
  attributesHolder: any[] = [];

  constructor(
    private commonService: CommonService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private dataLayerService: DataLayerService,
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params.slug.replace(/-/g, ' ');
      let slug = this.route.snapshot.params.slug;

      this.commonService.getData(`attribute/get_product/${slug}`).subscribe((result) => {
        // Check if result.product is an object
        if (typeof result.product === 'object' && !Array.isArray(result.product)) {
          // Clear the previous ecommerce object
          (window as any).dataLayer.push({ ecommerce: null });

          // Push the new ecommerce object with the view_item_list event
          (window as any).dataLayer.push({
            event: "view_item_list",
            ecommerce: {
              item_list_id: "related_products",
              item_list_name: "Related products",
              items: [
                {
                  item_id: result.product.id,
                  item_name: result.product.name,
                  affiliation: "Google Merchandise Store",
                  coupon: "SUMMER_FUN",
                  discount: 0,
                  index: 0,
                  item_category: result.product.name,
                  location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
                  price: result.product.price,
                  quantity: result.product.item_quantity || 1 // Provide a default value if item_quantity is not present
                }
              ]
            }
          });

          console.log('dataLayer event: view_item_list :- ', (window as any).dataLayer);

          console.log('Attr Product : ', result);
          if (result.status && result.primary) {
            console.log('It is Product : ', true);
            this.attributesHolder = result.attributes;
            this.primaryProductData = result.primary;
          }

        } else {
          // Log an error if result.product is not the expected type
          console.error('Error: result.product is not an object or is an array.', result.product);
        }
      });




      this.commonService.getData(`accessories/${slug}`).pipe(map((resp) => {
        if (resp && resp.status && resp.data) {
          if (Array.isArray(resp.data) && resp.data.length > 0) {
            resp.data.forEach((item: any, index: number) => {
              if (item.images) {
                resp.data[index].images = Object.values(JSON.parse(item.images))[0];
              }
            })
          }
        }
        return resp;
      })).subscribe((result) => {
        if (result.product) {
          if (result.data.length > 0) {
            console.log('Product : ', result.data[0]);
            this.product = result.data[0];
            this.getRecommendedProducts(this.product.id);
          }
        }
      });
    });
  }

  addToCart(productId: number) {
    console.log('Product : ', productId);
    this.cartService.addToCart({ product_id: productId, quantity: 1 }).subscribe((resp) => {
      console.log('Add to Cart Resp in Product : ', resp);
      if (!resp.status) {
        localStorage.setItem('product-id-before-login-for-add-to-cart', String(productId));
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
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
      }
    });
  }

  onClickProductShare() {
    this.isProductShare = !this.isProductShare;
  }

}
