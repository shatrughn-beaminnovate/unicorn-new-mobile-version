import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealsDayComponent } from './deals-day.component';

const routes: Routes = [
  { path: '', component: DealsDayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsDayRoutingModule { }
