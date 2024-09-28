import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {CommonService} from "../../core/services/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AlertService} from "../../core/shared/alert";
import {CartService} from "../../core/services/cart.service";
import {FormBuilder} from "@angular/forms";
import {Location} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {
  isQuickViewProduct = false;
  product: any;
  imgUrl = environment.imgUrl;
  productId!: number;
  productName!: string;


  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private alertService: AlertService,
    private cartService: CartService,
    private fb: FormBuilder,
    private location: Location,
    private titleService: Title,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
  }

  show(product: any) {
    console.log("show: ", product);
    this.isQuickViewProduct = true;
    this.product = product;
  }

  addToWishlist(productId: number, productName: string): void {

  }
}
