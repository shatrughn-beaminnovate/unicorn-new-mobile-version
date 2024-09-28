import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteDisclaimer } from "./website-disclaimer.component";

const routes: Routes = [
  { path: '', component: WebsiteDisclaimer },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteDisclaimerRoutingModule { }
