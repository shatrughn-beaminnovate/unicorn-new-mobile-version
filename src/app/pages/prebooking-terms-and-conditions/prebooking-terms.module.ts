import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrebookingTermsRoutingModule, } from './prebooking-terms-routing.module';
import { PrebookingTerms } from "./prebooking-terms.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    PrebookingTerms
  ],
  imports: [
    PrebookingTermsRoutingModule,
    SharedModule
  ]
})
export class PrebookingTermsModule {
}
