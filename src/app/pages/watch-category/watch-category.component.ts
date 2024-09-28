import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Options} from "@angular-slider/ngx-slider";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../core/services/common.service";
import {Title} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {ITypes} from "../categories/categories.component";

@Component({
  selector: 'app-watch-category',
  templateUrl: './watch-category.component.html',
  styleUrls: ['./watch-category.component.scss']
})
export class WatchCategoryComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Output() scrollingFinished = new EventEmitter<void>();

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
    private titleService: Title,
    private cd: ChangeDetectorRef
  ) {
    this.sortOptions = [
      {label: 'Name: A to Z', value: 'name'},
      {label: 'Name: Z to A', value: '!name'},
      {label: 'Price: Low to High', value: 'saleprice'},
      {label: 'Price: High to Low', value: '!saleprice'}
    ];

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((resp: any) => {
      this.commonService.postRequest(`attribute/get_category/products/${resp.params.slug}`, {
        "limit_per_page": "10",
        "order_by": "id",
        "skip": "0",
        "sort": "1",
        "filter_text": "",
        "is_filter": true
      }).subscribe((result) => {
        console.log('Attributes in Category Page : ', result);
        if (result.attributes != undefined) {
          localStorage.setItem('attr_type', JSON.stringify(result.attributes));
        }
        if (result?.data?.primary) {
          this.router.navigate(['/products/', resp.params.slug], {replaceUrl: true});
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
    if (this.attributesHolder && this.attributesHolder.length > 0) {
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
    let filterableAttrHolder = JSON.parse(localStorage.getItem('filterable-attributes')!);

    if (filterableAttrHolder && filterableAttrHolder.length > 0 && filterableAttrHolder !== 'undefined') {
      this.attributesHolder = filterableAttrHolder;
    } else {
      this.isFilterApplied = false;
    }

    this.defaultPaginateEvent = event;
    let convertedEvent: any = {
      limit_per_page: event?.rows,
      order_by: event?.sortField ? event?.sortField : 'id',
      skip: event?.first ? event?.first : 0,
      sort: event?.sortOrder ? event?.sortOrder : 1,
      filter_text: "",
      is_filter: true
    };

    let attributesArr: any[] = [];
    this.attributesHolder.forEach((item) => {
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
        if (filterableAttrHolder && filterableAttrHolder.length > 0 && filterableAttrHolder !== 'undefined') {

        } else {
          this.attributesHolder = result.attributes;
          /** Reset if Attributes is available */
          localStorage.setItem('filterable-attributes', JSON.stringify(result.attributes));
        }

        setTimeout(() => {
          if (Array.isArray(result.attributes)) {
            localStorage.setItem('attr_type', JSON.stringify(result.attributes));
          }
        }, 1000);
        console.log('Attributes Holder : ', result.attributes);
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
    // @ts-ignore
    window.dataLayer.push({"ecommerce": null}); // Clear the previous ecommerce object.
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
