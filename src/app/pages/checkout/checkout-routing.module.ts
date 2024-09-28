import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: CheckoutComponent },
      { path: 'place-order', component: PlaceOrderComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
