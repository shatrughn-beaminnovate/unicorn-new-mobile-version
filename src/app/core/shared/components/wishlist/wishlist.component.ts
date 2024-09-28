import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  addItem(arg0: string) {
    throw new Error('Method not implemented.');
  }
  wishlist: any;

  constructor() { }

  ngOnInit(): void {
  }

}
