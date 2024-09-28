import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './support.component';
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
