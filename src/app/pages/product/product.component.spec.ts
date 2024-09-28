import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product data and display it', function () {
    let route = TestBed.inject(ActivatedRoute)
    let router = TestBed.inject(Router)
    let cartService = TestBed.inject(CartService)
    let commonService = TestBed.inject(CommonService)
    let messageService = TestBed.inject(MessageService)
    const productComponent = new ProductComponent(commonService, cartService, route, router, messageService);

    // Mock the route param map
    const paramMap = new Map();
    paramMap.set('slug', 'example-slug');
    spyOnProperty(route, 'paramMap').and.returnValue(of(paramMap));

    // Mock the commonService.getData method
    const productData = { status: true, product: { id: 1, name: 'Example Product' } };
    spyOn(commonService, 'getData').and.returnValue(of(productData));

    // Call the ngOnInit method
    productComponent.ngOnInit();

    // Expect the product data to be set correctly
    expect(productComponent.product).toEqual(productData.product);
  });

});
