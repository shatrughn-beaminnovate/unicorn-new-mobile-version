import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotDealsComponent } from './hot-deals.component';

const routes: Routes = [
  { path: '', component: HotDealsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotDealsRoutingModule { }
