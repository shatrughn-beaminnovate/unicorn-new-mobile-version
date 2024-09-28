import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WatchCategoryRoutingModule} from './watch-category-routing.module';
import {WatchCategoryComponent} from "./watch-category.component";
import {SharedModule} from "../../core/shared/shared.module";
import {ImageModule} from "primeng/image";


@NgModule({
  declarations: [
    WatchCategoryComponent
  ],
  imports: [
    CommonModule,
    WatchCategoryRoutingModule,
    SharedModule,
    ImageModule
  ]
})
export class WatchCategoryModule {
}
