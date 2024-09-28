import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MLoginRoutingModule } from './m-login-routing.module';
import { MLoginComponent } from './m-login.component';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [
    MLoginComponent
  ],
  imports: [
    CommonModule,
    MLoginRoutingModule,
    SharedModule
  ]
})
export class MLoginModule { }
