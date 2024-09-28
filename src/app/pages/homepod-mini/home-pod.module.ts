import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePodRoutingModule } from './home-pod-routing.module';
import { HomePod } from "./home-pod.component";
import { SharedModule } from "../../core/shared/shared.module";


@NgModule({
  declarations: [
    HomePod
  ],
  imports: [
    HomePodRoutingModule,
    SharedModule
  ]
})
export class HomePodModule {
}
