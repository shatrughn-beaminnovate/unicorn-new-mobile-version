import {NgModule} from '@angular/core';

import {TrainingRoutingModule} from './training-routing.module';
import {TrainingComponent} from './training.component';
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    TrainingComponent
  ],
  imports: [
    TrainingRoutingModule,
    SharedModule
  ]
})
export class TrainingModule {
}
