import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingDeliveryRoutingModule, } from './shipping-delivery-routing.module';
import { ShippingDelivery } from "./shipping-delivery.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    ShippingDelivery
  ],
  imports: [
    ShippingDeliveryRoutingModule,
    SharedModule
  ]
})
export class ShippingDeliveryModule {
}
