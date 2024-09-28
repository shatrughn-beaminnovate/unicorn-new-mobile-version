import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from "./checkout.component";
import {PlaceOrderComponent} from "./place-order/place-order.component";
import {SharedModule} from "../../core/shared/shared.module";
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    CheckoutComponent,
    PlaceOrderComponent,
  ],
  imports: [
    CheckoutRoutingModule,
    SharedModule,
    SkeletonModule
  ]
})
export class CheckoutModule {
}
