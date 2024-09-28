import {NgModule} from '@angular/core';

import {BtsRoutingModule} from './bts-routing.module';
import {BtsComponent} from "./bts.component";
import {SharedModule} from "../../core/shared/shared.module";
import {StepsModule} from "primeng/steps";
import {CarouselModule} from "ngx-owl-carousel-o";
import {DropdownModule} from "primeng/dropdown";



@NgModule({
  declarations: [
    BtsComponent
  ],
  imports: [
    BtsRoutingModule,
    SharedModule,
    StepsModule,
    CarouselModule,
    DropdownModule,

  ]
})
export class BtsModule {
}

