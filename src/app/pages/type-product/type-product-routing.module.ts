import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeProductComponent } from './type-product.component';

const routes: Routes = [
  { path: ':slug', component: TypeProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeProductRoutingModule {
}
