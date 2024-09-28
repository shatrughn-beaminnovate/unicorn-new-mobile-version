import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccessoriesRoutingModule} from './accessories-routing.module';
import {AccessoriesComponent} from "./accessories.component";
import {SharedModule} from "../../core/shared/shared.module";
import {QuickViewComponent} from "../quick-view/quick-view.component";
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AccessoriesComponent,
    QuickViewComponent
  ],
  imports: [
    CommonModule,
    AccessoriesRoutingModule,
    SharedModule,
    TooltipModule,
  ]
})
export class AccessoriesModule {
}
