import {NgModule} from '@angular/core';

import {WatchProductRoutingModule} from './watch-product-routing.module';
import {WatchProductComponent} from './watch-product.component';
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    WatchProductComponent
  ],
  imports: [
    WatchProductRoutingModule,
    SharedModule
  ]
})
export class WatchProductModule {
}
