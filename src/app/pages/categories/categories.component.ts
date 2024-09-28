import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../core/services/common.service";
import { Subscription } from "rxjs";
import { Options } from '@angular-slider/ngx-slider';
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";
import { Meta, Title } from "@angular/platform-browser";
import { MessageService } from "primeng/api";
import { Location } from "@angular/common";
import { DataLayerService } from 'src/app/core/services/data-layer.service';

declare var ga: Function;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent implements OnInit, OnDestroy, AfterViewChecked {

  title!: string;
  imgUrl = environment.imgUrl; // Image URL
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
  categoryType: any;
  private subscription = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private cd: ChangeDetectorRef,
    private titleService: Title,
    private meta: Meta,
    private messageService: MessageService,
    private location: Location,
    private dataLayerService: DataLayerService
  ) {
    this.sortOptions = [
      { label: 'Name: A to Z', value: 'name' },
      { label: 'Name: Z to A', value: '!name' },
      { label: 'Price: Low to High', value: 'saleprice' },
      { label: 'Price: High to Low', value: '!saleprice' }
    ];
  }

  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    this.route.paramMap.subscribe((resp: any) => {
      console.log('URL Change In Cat : ', resp);
      // this.title = resp.params.slug;
      // this.attributesHolder = [];
      // this.categoryTypeHolder = [];
      // localStorage.removeItem('filterable-attributes');
      // console.log('Title : ', this.title);
      // this.getCategory(resp.params.slug);
      this.getCategoryBySlug(resp.params.slug);
    });
  }

  setMetaData(item: any) {
    console.log('Meta Data : ', item);
    localStorage.setItem('meta-data', JSON.stringify({name: item?.name, meta: item?.meta, seo_title: item?.seo_title}));
  }

  getCategoryBySlug(slug: string) {
    console.log('Category Id : ', slug);
    let payload = {
      view: "tree" //variant or tree
    };
    this.commonService.postRequestWithSlug(slug, payload).subscribe((result) => {
      this.categoryType = result?.category?.category_type;
      // this.categoryAttrHolder = result.category.children;
      this.categoryAttrHolder = result;
      this.handleCategoryListGA4(slug);
      let pageTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : slug;
      this.titleService.setTitle(pageTitle + ' | Unicorn Store');

      let metaData = JSON.parse(localStorage.getItem('category-meta-data')!);
      console.log("Meta Data: ", metaData.meta)
      if (metaData.meta && metaData.meta !== '') {
        // Create a new DOMParser
        const parser = new DOMParser();
        // Parse the meta string into a Document
        const parsed = parser.parseFromString(metaData.meta, 'text/html');
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
        this.meta.updateTag({ name: 'description', content: slug });
        this.meta.updateTag({ name: 'keywords', content: slug });
      }
    });
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  getCategory(slug: string) {
    this.location.replaceState('/category/' + slug);
    this.commonService.getRequest(`attribute/get_category/${slug}`).subscribe((result) => {

      (window as any).dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
      (window as any).dataLayer.push({
        event: "view_item_list",
        ecommerce: {
          value: result.data.length,
          items: result.data.map((item: any, index: number) => ({
            item_id: item.id,
            item_name: item.name,
            index: index - 1,
            // Include other properties as needed
          })),
        },
      });

      if (result.status) {
        if (result.attributes != undefined) {
          localStorage.setItem('attr_type', JSON.stringify(result.attributes));
        }
        if (result?.data?.primary) {
          this.router.navigate(['products', slug], { replaceUrl: true });
          return;
        }
        this.categoryAttrHolder = result.data;
        this.handleCategoryListGA4(slug);
        this.titleService.setTitle(slug + ' | Unicorn Store');
      } else {
        this.messageService.add({ severity: 'error', detail: result.message });
      }
    });
  }

  handleCategoryListGA4(slug: string) {
    let items: any = [];
    this.categoryAttrHolder.forEach((item: any, index: number) => {
      items.push({
        item_id: item.id,
        item_name: item.name,
      });
    });
    // this.dataLayerService.push({ecommerce: null});  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: 'from_main_menu',
        item_list_name: 'From Main Menu',
        items: items
      },
    });
  }

  onClickCategoryItem(slug: string) {
    this.commonService.getRequest(`attribute/get_category/${slug}`)?.subscribe((result) => {
      console.log('attribute/get_category : ', result);
      if (result.status) {
        if (result.attributes && result.attributes.length > 0) {
          this.router.navigate(['type', slug])
        } else if (result.product_type === 'simple') {
          this.router.navigate(['accessories', slug]);
        } else {
          this.getCategory(slug)
        }
      } else {
        this.messageService.add({ severity: 'error', detail: result.message });
      }
    });
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
      limit_per_page: event?.rows,
      order_by: event?.sortField,
      skip: event?.first,
      sort: event?.sortOrder,
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


    // console.log('convertedEvent : ', convertedEvent);

    this.subscription = this.route.paramMap.subscribe((resp: any) => {
      this.title = resp.params.slug;
      this.commonService.postRequest(`attribute/get_category/products/${resp.params.slug}`, convertedEvent).pipe(map((resp) => {
        // console.log('Map Resp : ', resp);
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
        // console.log('Typeof : ', Array.isArray(result.attributes));

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

        // if (this.attributesHolder && this.attributesHolder.length > 0) {
        //   localStorage.removeItem('filterable-attributes');
        // }
        console.log('attributesHolder : ', this.attributesHolder);
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
    console.log('Click on Product : ', Id);
    this.dataLayerService.push({ "ecommerce": null }); // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: name,
        item_list_name: name,
        items: [
          {
            item_id: Id,
            item_name: name,
          }
        ]
      }
    });
  }

}

export interface City {
  name: string,
  code: string
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
