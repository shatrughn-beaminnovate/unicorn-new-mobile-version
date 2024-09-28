import {NgModule} from '@angular/core';

import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {RateAndReviewComponent} from "./rate-and-review/rate-and-review.component";
import {SharedModule} from "../../core/shared/shared.module";
import {AddressFormComponent} from "./address-form/address-form.component";


@NgModule({
  declarations: [
    AccountComponent,
    RateAndReviewComponent,
    AddressFormComponent
  ],
  imports: [
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule {
}
