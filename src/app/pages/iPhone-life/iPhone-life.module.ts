import { NgModule } from '@angular/core';

import { HotDealsRoutingModule } from './iPhone-life-routing.module';
import { IphoneLifeComponent } from './iPhone-life.component';
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    IphoneLifeComponent
  ],
  imports: [
    HotDealsRoutingModule,
    SharedModule
  ]
})
export class IphoneLifeModule {
}
