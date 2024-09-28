import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FindStoreRoutingModule} from './find-store-routing.module';
import {FindStoreComponent} from './find-store.component';
import {SharedModule} from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    FindStoreComponent
  ],
  imports: [
    FindStoreRoutingModule,
    SharedModule
  ]
})
export class FindStoreModule {
}
