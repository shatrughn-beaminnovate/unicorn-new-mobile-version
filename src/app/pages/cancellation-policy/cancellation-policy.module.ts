import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancellationPolicyRoutingModule, } from './cancellation-policy-routing.module';
import { CancellationPolicy } from "./cancellation-policy.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    CancellationPolicy
  ],
  imports: [
    CancellationPolicyRoutingModule,
    SharedModule
  ]
})
export class CancellationPolicyModule {
}
