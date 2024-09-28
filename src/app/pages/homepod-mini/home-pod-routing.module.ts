import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePod } from "./home-pod.component";

const routes: Routes = [
  { path: '', component: HomePod },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePodRoutingModule { }
