import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsConditionsRoutingModule, } from './terms-conditions-routing.module';
import { TermsConditions } from "./terms-conditions.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    TermsConditions
  ],
  imports: [
    TermsConditionsRoutingModule,
    SharedModule
  ]
})
export class TermsConditionsModule {
}
