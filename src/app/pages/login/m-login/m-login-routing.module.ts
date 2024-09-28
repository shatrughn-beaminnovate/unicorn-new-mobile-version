import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MLoginComponent } from './m-login.component';

const routes: Routes = [
  { path: '', component: MLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MLoginRoutingModule { }
