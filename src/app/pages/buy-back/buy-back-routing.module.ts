import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BuyBackComponent} from "./buy-back.component";

const routes: Routes = [
  { path: '', component: BuyBackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyBackRoutingModule { }
