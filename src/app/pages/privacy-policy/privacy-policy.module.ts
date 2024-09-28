import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule, } from './privacy-policy-routing.module';
import { PrivacyPolicy } from "./privacy-policy.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    PrivacyPolicy
  ],
  imports: [
    PrivacyPolicyRoutingModule,
    SharedModule
  ]
})
export class PrivacyPolicyModule {
}
