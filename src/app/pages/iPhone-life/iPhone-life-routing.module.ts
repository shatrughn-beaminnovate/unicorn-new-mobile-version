import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IphoneLifeComponent } from './iPhone-life.component';

const routes: Routes = [
  { path: '', component: IphoneLifeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotDealsRoutingModule { }
