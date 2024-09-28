import {NgModule} from '@angular/core';

import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from "./product.component";
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule {
}
