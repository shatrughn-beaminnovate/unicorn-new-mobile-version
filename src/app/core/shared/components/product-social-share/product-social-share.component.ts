import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-social-share',
  templateUrl: './product-social-share.component.html',
  styleUrls: ['./product-social-share.component.scss']
})
export class ProductSocialShareComponent implements OnInit {
  @Input() url!: string;
  @Input() title!: string;
  @Input() image!: string;
  @Input() description!: string;
  isShowShareIcons = false;
  constructor() { }

  ngOnInit(): void {
  }

}
