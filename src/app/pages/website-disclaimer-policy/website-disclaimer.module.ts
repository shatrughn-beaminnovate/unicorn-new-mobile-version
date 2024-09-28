import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteDisclaimerRoutingModule, } from './website-disclaimer-routing.module';
import { WebsiteDisclaimer } from "./website-disclaimer.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    WebsiteDisclaimer
  ],
  imports: [
    WebsiteDisclaimerRoutingModule,
    SharedModule
  ]
})
export class WebsiteDisclaimerModule {
}
