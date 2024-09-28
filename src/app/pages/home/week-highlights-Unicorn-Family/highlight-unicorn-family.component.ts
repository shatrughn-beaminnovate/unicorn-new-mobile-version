import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-week-highlights-unicorn-family',
  templateUrl: './highlight-unicorn-family.component.html',
  styleUrls: ['./highlight-unicorn-family.component.scss']
})
export class HighlightUnicornFamily implements OnInit {
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

  Bestsellers_products = [
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
  bestsellersHolder: any;
  imgUrl = environment.imgUrl;

  constructor(private commonService: CommonService,) { }
  // ngOnInit(): void {
  //   this.commonService.getData('best_seller').subscribe((result) => {
  //     this.bestsellersHolder = result;


  //   });
  // }
  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
  }


}
