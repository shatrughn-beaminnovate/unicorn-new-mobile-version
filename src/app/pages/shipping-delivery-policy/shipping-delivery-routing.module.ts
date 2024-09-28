import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingDelivery } from "./shipping-delivery.component";

const routes: Routes = [
  { path: '', component: ShippingDelivery },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingDeliveryRoutingModule { }
