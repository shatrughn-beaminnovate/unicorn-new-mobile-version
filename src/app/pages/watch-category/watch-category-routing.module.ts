import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WatchCategoryComponent} from "./watch-category.component";

const routes: Routes = [
  {
    path: ':slug', component: WatchCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchCategoryRoutingModule {
}
