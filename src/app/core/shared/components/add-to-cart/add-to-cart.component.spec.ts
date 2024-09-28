import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AlertService } from '../../alert';

import { AddToCartComponent } from './add-to-cart.component';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let commonService: CommonService
  let cartService: CartService
  let messageService: MessageService
  let authService: AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToCartComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService)
    cartService = TestBed.inject(CartService)
    messageService = TestBed.inject(MessageService)
    authService = TestBed.inject(AuthService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Add product to cart when user is logged in
  it('should add product to cart when user is logged in', function () {
    let route = TestBed.inject(ActivatedRoute);
    let router = TestBed.inject(Router);
    let alertService = TestBed.inject(AlertService);
    let fb = TestBed.inject(FormBuilder);
    let location = TestBed.inject(Location);
    let titleService = TestBed.inject(Title);


    // Mock dependencies
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['getRequestWithToken', 'postRequestWithToken']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);
    const messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    const authServiceMock = jasmine.createSpyObj('AuthService', [], { isLoggedIn: true });

    // Set up test data
    const product = {
      id: 1,
      name: 'Product 1'
    };

    // Set up mock responses
    const addToCartResponse = {
      status: true,
      message: 'Product added to cart successfully'
    };
    cartServiceMock.addToCart.and.returnValue(of(addToCartResponse));

    // Create instance of AddToCartComponent with mock dependencies
    const addToCartComponent = new AddToCartComponent(
      commonServiceMock,
      route,
      router,
      messageServiceMock,
      alertService,
      cartServiceMock,
      fb,
      location,
      titleService,

      authServiceMock
    );

    // Set product property
    addToCartComponent.product = product;

    // Call addToCart method
    addToCartComponent.addToCart();

    // Verify that the addToCart method called the correct methods with the correct arguments
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith({
      product_id: product.id,
      quantity: 1
    });

    // Verify that the success message was displayed
    expect(messageServiceMock.add).toHaveBeenCalledWith({ severity: 'success', detail: addToCartResponse.message });
  });
});
