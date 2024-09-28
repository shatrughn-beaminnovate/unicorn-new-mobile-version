import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertService } from '../../core/shared/alert';
import { CartService } from '../../core/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { TypeProductComponent } from './type-product.component';

describe('TypeProductComponent', () => {
  let component: TypeProductComponent;
  let fixture: ComponentFixture<TypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeProductComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The component retrieves the product data from the API and assigns it to the selectedProduct property.

  describe('TypeProductComponent', () => {
    let component: TypeProductComponent;
    let fixture: ComponentFixture<TypeProductComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TypeProductComponent],
        imports: [ReactiveFormsModule, HttpClientTestingModule],
        providers: [
          { provide: ActivatedRoute, useValue: {} },
          { provide: Router, useValue: {} },
          { provide: AlertService, useValue: {} },
          { provide: CartService, useValue: {} },
          { provide: FormBuilder, useValue: {} },
          { provide: Location, useValue: {} },
          { provide: Title, useValue: {} },
          { provide: AuthService, useValue: {} },
          { provide: MessageService, useValue: {} },
          { provide: HttpClient, useValue: {} },
          { provide: DomSanitizer, useValue: {} },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TypeProductComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form and subscriptions', () => {
      expect(component.guestForm).toBeDefined();
      expect(component.submitted).toBeFalse();
      expect(component.subscriptionHolder).toBeDefined();
    });

    it('should load PDP HTML content', () => {
      const url = 'https://example.com';
      const folderName = 'pdp';
      const fileName = 'product-details';
      component.loadPDP(url, folderName, fileName);
      // Add your assertions here
    });

    it('should trigger Google Analytics', () => {
      spyOn(component, 'googleAnalytics');
      component.ngOnInit();
      expect(component.googleAnalytics).toHaveBeenCalled();
    });

    it('should add product to cart', () => {
      const productId = 1;
      const productName = 'Test Product';
      component.addToCart(productId, productName);
      // Add your assertions here
    });

    // Add more test cases as needed

  });
});
