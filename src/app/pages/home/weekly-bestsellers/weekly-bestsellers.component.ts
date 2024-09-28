import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weekly-bestsellers',
  templateUrl: './weekly-bestsellers.component.html',
  styleUrls: ['./weekly-bestsellers.component.scss']
})
export class WeeklyBestsellersComponent implements OnInit {
  swiperConfigs = {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      368: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      }, 380: {
        slidesPerView: 1,
        spaceBetween: 1,
        navigator: false
      },
      508: {
        slidesPerView: 1,
        spaceBetween: 5,
        navigator: false
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigator: false
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigator: false
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
        navigator: false
      },
      1030: {
        slidesPerView: 4,
        spaceBetween: 20,
        navigator: false
      },
      1600: {
        slidesPerView: 6,
        spaceBetween: 20,
        navigator: false
      }
    }
  }
  bts = [
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },
    {
      "id": "37",
      "name": "iPhone 15 Pink 128GB",
      "slug": "iphone-15-pink-128-gb",
      "sku": "MTP13HN\/A",
      "images": [
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "a57ab34d757a2e01f95d858d7.jpg"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "60090eb5a66b59a2188fa07db.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "842347060bf7f0728b14176c6.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "241fffbce0548f09f6f767993.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "c615869bf3a9b47f66decf313.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "08049c56ea4fb734981cc58b8.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "8efc8941b128e47b2d06a6812.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "62e721cea4b9a173125521ae4.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "b7434b904fe633f7c7e82cf92.png"
        },
        {
          "alt": "",
          "caption": "",
          "sequence": 0,
          "filename": "1b764daffcd5942a69b1563dd.png"
        }
      ],
      "price": "79900.00",
      "saleprice": "71111.00",
      "average_rating": "0",
      "product_type": "configurable",
      "total_quantity_sold": "1",
      "product": true
    },

  ]
  bestsellers_weekly = [
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/full/327eb5e3d3f6926684347d77bb0977dc.jpg',
      rating: 4.5,
      id: '5',
      name: 'iPhone 14 Plus Blue 128GB ',
      sale: 'Sale 12% off',
      actual_price: ' 79,900',
      sel_price: ' 70,312',
      href: 'https://shop.unicornstore.in/type/iphone-14-plus1',
      backgroung_color: 'gray',
    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/53fc4228f9a526775205a562c08778c3.jpg',
      rating: 3.8,
      name: ' iPhone 15 Pro 128GB White Titanium ',
      sale: 'Sale 3% off',
      id: '8',
      href: 'https://shop.unicornstore.in/type/iphone-15-pro2',
      actual_price: '134,900',
      sel_price: ' 130,853 ',
      backgroung_color: '#4e4f51',

    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/dd98802c7d8c8452596fc474a3de339d.jpg',
      rating: 3.8,
      id: '6',
      name: 'iPhone 14 Plus Starlight 256GB',
      sale: 'Sale 13% off',
      actual_price: ' 89,900',
      sel_price: ' 84,506',
      backgroung_color: '#e9818b',
      href: 'https://shop.unicornstore.in/type/iphone-14',
    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/db9ac0af367a3f42e5fa366935c47d07.jpg',
      rating: 4.5,
      id: '5',
      name: 'iPhone 15 Pro Max 256GB Black  ',
      sale: 'Sale 3% off',
      actual_price: ' 159,900',
      sel_price: ' 155,103',
      backgroung_color: 'gray',
      href: 'https://shop.unicornstore.in/type/iphone-15-pro-max2',

    },
    {
      image: 'https://shop.unicornstore.in/uploads/images/medium/e0693bc32b3f66ede6b6ec2eb54d6b29.jpg',
      rating: 3.8,
      name: 'iPhone 15 Plus 256GB Blue ',
      sale: 'Sale 12% off',
      id: '8',
      actual_price: ' 99,900',
      sel_price: ' 87,413',
      href: 'https://shop.unicornstore.in/type/iphone-15-plus2',
      backgroung_color: '#4e4f51',

    },
    {
      image: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/full/a29f63d9981815669025580b09db59cf.jpg',
      rating: 4.5,
      id: '5',
      name: 'iPhone 14 Purple 128GB ',
      sale: 'Sale 13% off',
      actual_price: ' 69,900',
      sel_price: '60,813',
      backgroung_color: 'gray',
      href: 'https://shop.unicornstore.in/type/iphone-14',
    },
  ];
  weekly_bestsellersHolder: any[] = [];

  constructor(private commonService: CommonService, private dataLayerService: DataLayerService) { }
  loading: boolean = true;
  imgUrl = environment.imgUrl;
  ngOnInit(): void {
    this.fetchDataWithDates();
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
  }


  fireWeeklyBestsellersGA4Event(data: any) {
    let items: any = [];
    data.forEach((item: any) => {
      items.push({
        item_id: item.sku,
        item_name: item.name,
        item_category: "Weekly Bestsellers",
        item_variant: item.name,
        price: item.saleprice,
        quantity: item.quantity,
      });
    });
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: "weekly_bestsellers",
        item_list_name: "Weekly Bestsellers",
        items: items
      }
    });
  }

  fireWeeklyBestsellersSelectGA4Event(item: any) {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "select_item",
      ecommerce: {
        item_list_id: "weekly_bestsellers",
        item_list_name: "Weekly Bestsellers",
        items: [{
          item_id: item.sku,
          item_name: item.name,
          item_category: "Weekly Bestsellers",
          item_variant: item.name,
          price: item.saleprice,
          quantity: item.quantity,
        }]
      }
    });
  }


  fireVerticalBannerPromotionGA4Event() {
    // this.dataLayerService.push({ ecommerce: null });  // Clear the previous ecommerce object.
    this.dataLayerService.push({
      event: "view_promotion",
      ecommerce: {
        creative_name: "Buy an AirPods Pro",
        creative_slot: "vertical_banner_1",
        promotion_id: "vertical_banner_1",
        promotion_name: "AirPods Pro",
      }
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
      // console.log("weekly", this.weekly_bestsellersHolder);

      // Calculate sale percentage for each product
      this.weekly_bestsellersHolder.forEach((product: any) => {
        product.salePercentage = this.calculateSalePercentage(product);
      });

      // Set loading to false once data is fetched
      this.loading = false;
      this.fireWeeklyBestsellersGA4Event(this.weekly_bestsellersHolder);
      this.fireVerticalBannerPromotionGA4Event()
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
  getRouterLink(re_product: any): any[] {
    let type: string;
    if (re_product.product) {
      type = 'product';
    } else if (re_product.accessory) {
      type = 'accessories';
    } else {
      type = '';
    }
    return ['/', type, re_product.slug];
  }


}




