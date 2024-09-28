import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindStoreComponent } from './find-store.component';

const routes: Routes = [
  { path: '', component: FindStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindStoreRoutingModule { }
