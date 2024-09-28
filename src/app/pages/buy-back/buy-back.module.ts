import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BuyBackRoutingModule} from './buy-back-routing.module';
import {BuyBackComponent} from "./buy-back.component";
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    BuyBackComponent
  ],
  imports: [
    BuyBackRoutingModule,
    SharedModule
  ]
})
export class BuyBackModule {
}
