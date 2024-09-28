import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BtsComponent} from "./bts.component";

const routes: Routes = [
  {path: '', component: BtsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BtsRoutingModule {
}
