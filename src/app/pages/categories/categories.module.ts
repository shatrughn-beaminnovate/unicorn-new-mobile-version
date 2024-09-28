import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from "./categories.component";
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {
  constructor(){
    console.log('CategoriesModule is Loaded');
  }
}
