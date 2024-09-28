import { NgModule } from '@angular/core';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { TypeProductRoutingModule } from './type-product-routing.module';
import { TypeProductComponent } from "./type-product.component";
import { SharedModule } from "../../core/shared/shared.module";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { CashifyModalComponent } from "../cashify-modal/cashify-modal.component";
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { RadioButtonModule } from 'primeng/radiobutton';
import {GalleriaModule} from 'primeng/galleria';
import {ProgressBarModule} from 'primeng/progressbar';
@NgModule({
  declarations: [
    TypeProductComponent,
    CashifyModalComponent
  ],
  imports: [
    TypeProductRoutingModule,
    SharedModule,
    NgxImageZoomModule,
    CheckboxModule,
    RippleModule,
    RatingModule,
    CarouselModule,
    RadioButtonModule,
    GalleriaModule,
    ProgressBarModule
  ],
})

export class TypeProductModule {
}
