import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PriceAfterDotSmallPipe } from 'src/app/core/pipes/price-after-dot-small.pipe';
import { CartService } from 'src/app/core/services/cart.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, PriceAfterDotSmallPipe],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService, PriceAfterDotSmallPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The `getCartItems` method is called and there are no cart items in the session storage.
  it('should call getCartItems method with no cart items in session storage', function () {
    spyOnProperty(cartService, 'getSessionCartItems', 'get').and.returnValue([]);
    const cartComponent = fixture.componentInstance;

    cartComponent.getCartItems();

    expect(cartComponent.cartItemsHolder).toEqual([]);
  });
});
