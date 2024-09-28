import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from "./login.component";
import {SharedModule} from "../../core/shared/shared.module";
import { MLoginComponent } from './m-login/m-login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule {
}
