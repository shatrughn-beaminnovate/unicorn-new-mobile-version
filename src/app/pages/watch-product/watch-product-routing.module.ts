import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchProductComponent } from './watch-product.component';

const routes: Routes = [
  { path: '', component: WatchProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchProductRoutingModule { }
