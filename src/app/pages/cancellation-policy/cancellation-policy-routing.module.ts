import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationPolicy } from "./cancellation-policy.component";

const routes: Routes = [
  { path: '', component: CancellationPolicy },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancellationPolicyRoutingModule { }
