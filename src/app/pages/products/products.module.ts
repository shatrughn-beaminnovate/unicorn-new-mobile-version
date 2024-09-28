import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    TooltipModule,
  ]
})
export class ProductsModule { }
