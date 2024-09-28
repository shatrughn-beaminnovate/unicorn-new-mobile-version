import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { PaymentService } from 'src/app/core/services/payment.service';

import { PlaceOrderComponent } from './place-order.component';

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceOrderComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService, MessageService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // getOrderSummary method retrieves order summary successfully
  it('should retrieve order summary when valid order number is provided', function () {
    let http = TestBed.inject(HttpClient);
    const cartService = new CartService(http);
    const route = new ActivatedRoute();
    const paymentService = new PaymentService(http);
    const commonService = new CommonService(http);

    const placeOrderComponent = new PlaceOrderComponent(cartService, route, paymentService, commonService);
    spyOn(commonService, 'getRequestWithTokenAndId').and.returnValue(of({ status: true, data: {} }));

    placeOrderComponent.getOrderSummary(123);

    expect(commonService.getRequestWithTokenAndId).toHaveBeenCalledWith('order_summary', 123);
  });
});
