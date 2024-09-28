import { NgModule } from '@angular/core';

import { IphoneRoutingModule } from './iphone-for-routing.module';
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({

  imports: [
    IphoneRoutingModule,
    SharedModule
  ]
})
export class IphoneModule {
}
