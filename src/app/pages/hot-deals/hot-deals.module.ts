import { NgModule } from '@angular/core';

import { HotDealsRoutingModule } from './hot-deals-routing.module';
import { HotDealsComponent } from './hot-deals.component';
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    HotDealsComponent
  ],
  imports: [
    HotDealsRoutingModule,
    SharedModule
  ]
})
export class HotDealsModule {
}
