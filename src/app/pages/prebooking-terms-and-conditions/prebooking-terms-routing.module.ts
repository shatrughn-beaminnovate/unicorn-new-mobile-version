import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrebookingTerms } from "./prebooking-terms.component";

const routes: Routes = [
  { path: '', component: PrebookingTerms },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrebookingTermsRoutingModule { }
