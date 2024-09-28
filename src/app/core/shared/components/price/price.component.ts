import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() price: number = 0;
  @Input() saleprice: number = 0;
  @Input() prebookPrice: number = 0;
  @Input() onlyShowStrikePrice: boolean = false;
  @Input() priceStyleClass: string | 'price' | 'price-sm' | 'price-md' | 'price-lg' = 'price';
  @Input() priceCurrency: string = 'INR';
  @Input() priceLabel!: string | null;
  @Input() strikePrice!: number | null;
  @Input() isInlinePrice: boolean = false;
  @Input() isVerticalPrice: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
