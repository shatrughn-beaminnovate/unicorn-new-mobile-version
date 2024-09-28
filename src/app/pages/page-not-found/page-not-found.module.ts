import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from "./page-not-found.component";
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    PageNotFoundRoutingModule,
    SharedModule
  ]
})
export class PageNotFoundModule {
  constructor() {
    console.log('PageNotFoundModule is loaded');
  }
}
