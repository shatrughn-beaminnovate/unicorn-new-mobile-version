import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IphoneFor } from './iphone-for.component';

const routes: Routes = [
  { path: '', component: IphoneFor },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IphoneRoutingModule { }
