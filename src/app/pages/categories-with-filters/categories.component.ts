import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../core/services/common.service";
import { Subscription } from "rxjs";
import { Options } from '@angular-slider/ngx-slider';
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { DataLayerService } from 'src/app/core/services/data-layer.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesWithFilters implements OnInit, OnDestroy, AfterViewChecked {

  title!: string;
  imgUrl = environment.imgUrl;
  categoryTypeHolder!: ITypes[];
  categoryAttrHolder: any[] = [];
  defaultPaginateEvent!: { first: number, rows: number, sortField: string | undefined, sortOrder: number | undefined };
  sortOptions!: any[];
  sortKey!: string;
  sortField!: string;
  sortOrder!: number;
  totalRecords!: number;
  attributesHolder: any[] = [];
  isPriceFilterApplied = false;
  isFilterApplied = false;
  minValue: number = 0;
  maxValue: number = 5000000;
  options: Options = {
    floor: 0,
    ceil: 500000
  };
  private subscription = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private cd: ChangeDetectorRef,
    private titleService: Title,
    private dataLayerService: DataLayerService
  ) {
    this.sortOptions = [
      { label: 'Name: A to Z', value: 'name' },
      { label: 'Name: Z to A', value: '!name' },
      { label: 'Price: Low to High', value: 'saleprice' },
      { label: 'Price: High to Low', value: '!saleprice' }
    ];
  }

  // On Page Load
  ngOnInit(): void {

    this.commonService.baseUrls$.subscribe((result) => {
      if (result.status) {
        this.imgUrl = result?.data.asset_url?.s3_link || result?.data.asset_url?.fallback || environment.imgUrl;
      } else {
        this.imgUrl = environment.imgUrl;
      }
    }, () => {
      this.imgUrl = environment.imgUrl;
    });

    this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params.slug || 'Category';
      // this.attributesHolder = [];
      // this.categoryTypeHolder = [];
      // localStorage.removeItem('filterable-attributes');
      this.commonService.getRequest(`attribute/get_category/${resp.params.slug}`).subscribe((result) => {


        // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
        this.dataLayerService.push({
          event: "view_item_list",
          ecommerce: {
            item_list_id: "category",
            item_list_name: "Category",
            items: result.data.map((item: any, index: number) => ({
              item_id: item.id,
              item_name: item.name,
              index: index,
            })),
          },
        });

        console.log("Category dataLayer :", (window as any).dataLayer);

        if (result.attributes != undefined) {
          localStorage.setItem('attr_type', JSON.stringify(result.attributes));
        }
        if (result?.data?.primary) {
          this.router.navigate(['/products/', resp.params.slug], { replaceUrl: true });
          return;
        }
        this.categoryAttrHolder = result.data;
        this.titleService.setTitle(resp.params.slug + ' | Unicorn Store');
      });
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  onAttributesSelectedForFilters() {
    if (this.attributesHolder) {
      localStorage.setItem('filterable-attributes', JSON.stringify(this.attributesHolder));
    }
    this.loadData(this.defaultPaginateEvent);
  }

  onPriceChanged() {
    // console.log('Price : ', this.minValue, this.maxValue);
    this.isPriceFilterApplied = true;
    this.loadData(this.defaultPaginateEvent);
  }

  clearPriceFilters() {
    this.isPriceFilterApplied = false;
    this.minValue = 0;
    this.maxValue = 5000000;
    this.loadData(this.defaultPaginateEvent);
  }

  clearAllFilters() {
    localStorage.removeItem('filterable-attributes');
    this.attributesHolder.forEach((item, i) => {
      item.attribute_options.forEach((opt: any, j: number) => {
        if (opt.selected) {
          this.attributesHolder[i].attribute_options[j].selected = false;
        }
      });
    });
    this.clearPriceFilters();
  }

  loadData(event: any) {
    if (localStorage.getItem('filterable-attributes') && localStorage.getItem('filterable-attributes') !== 'undefined') {
      this.attributesHolder = JSON.parse(localStorage.getItem('filterable-attributes')!);
    } else {
      this.isFilterApplied = false;
    }

    this.defaultPaginateEvent = event;
    let convertedEvent: any = {
      limit_per_page: event.rows,
      order_by: event.sortField,
      skip: event.first,
      sort: event.sortOrder,
      filter_text: ""
    };

    let attributesArr: any[] = [];
    this.attributesHolder.forEach((item, i) => {
      let optionsIds: any[] = [];
      let attrType = '';

      item.attribute_options.forEach((opt: any) => {
        if (opt.selected) {
          this.isFilterApplied = true;
          attrType = opt.attribute_type;
          optionsIds.push(opt.id);
        }
      });

      if (attrType !== '' && optionsIds.length > 0) {
        let count = attributesArr.length;
        if (count === 0) {
          attributesArr.push({
            attribute_type: attrType,
            attribute_options: optionsIds
          })
        } else {
          if (attributesArr[count - 1].attribute_type === attrType) {
            attributesArr[count - 1].attribute_options.push(...optionsIds)
          } else {
            attributesArr.push({
              attribute_type: attrType,
              attribute_options: optionsIds
            })
          }
        }

      }
    });

    if (attributesArr.length > 0) {
      convertedEvent.attributes = [
        ...attributesArr
      ];
    }

    if (this.isPriceFilterApplied) {
      if (convertedEvent.attributes && convertedEvent.attributes.length > 0) {
        convertedEvent.attributes.push({
          attribute_type: 'price',
          attribute_options: [this.minValue, this.maxValue]
        })
      } else {
        convertedEvent.attributes = [{
          attribute_type: 'price',
          attribute_options: [this.minValue, this.maxValue]
        }]
      }
    }

    this.subscription = this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params.slug;
      this.commonService.postRequest(`attribute/get_category/products/${resp.params.slug}`, convertedEvent).pipe(map((resp) => {
        if (resp.attributes) {
          resp.attributes.forEach((item: any) => {
            item.attribute_options.forEach((opt: any, index: number) => {
              item.attribute_options[index].selected = false;
            })
          });
        }
        return resp;
      })).subscribe((result) => {
        console.log('attribute/get_category/products : ', result);
        this.categoryTypeHolder = result.data;
        setTimeout(() => {
          if (Array.isArray(result.attributes)) {
            localStorage.setItem('attr_type', JSON.stringify(result.attributes));
          }
        }, 1000);

        if (!localStorage.getItem('filterable-attributes')) {
          this.attributesHolder = result.attributes;
          localStorage.setItem('filterable-attributes', JSON.stringify(result.attributes));
        } else {
          if (localStorage.getItem('filterable-attributes') !== 'undefined') {
            this.attributesHolder = JSON.parse(localStorage.getItem('filterable-attributes')!);
          }
        }
        this.totalRecords = result.total_count;
      });
    });
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clearFilter() {
    this.defaultPaginateEvent = {
      first: 0,
      rows: 12,
      sortField: undefined,
      sortOrder: undefined,
    };
    this.sortKey = '';
    this.loadData(this.defaultPaginateEvent);
  }

  trackByFunc(index: number) {
    return index;
  }

  onClickProduct(Id: number, name: string) {
    // @ts-ignore
    window.dataLayer.push({ "ecommerce": null }); // Clear the previous ecommerce object.
    // @ts-ignore
    window.dataLayer.push({
      event: "select_product",
      ecommerce: {
        items: [
          {
            item_id: Id,
            item_name: name,
            item_list_name: name,
          }
        ]
      }
    });
  }
}

export interface ITypes {
  affordability: number;
  affordability_note: string;
  allow_rating: number;
  average_rating: number;
  buyback_options: null
  cashback: number;
  cashback_note: null
  description: string;
  dimension: string;
  display: number;
  effective_price: number;
  emi_options: string;
  enabled: number;
  excerpt: string;
  fixed_quantity: number;
  free_shipping: number;
  hsn_code: string;
  id: number;
  images: IImage[];
  meta: string;
  name: string;
  offers: string;
  option_pincodes: string;
  price: number;
  product_code: string;
  quantity: number;
  related_products: string;
  route_id: number;
  saleprice: number;
  seo_title: string;
  shippable: number;
  show_rating: number;
  sku: string;
  slug: string;
  tag: number;
  taxable: number;
  track_stock: number;
  types_badge: string;
  types_description: string;
  types_enabled: number;
  types_id: number;
  types_images: IImage[];
  types_meta: string;
  types_name: string;
  types_related_products: string;
  types_related_types: string;
  types_route_id: number;
  types_seo_title: string;
  types_slug: string;
}

export interface IImage {
  alt: string;
  caption: string;
  filename: string;
  primary: boolean
}
