import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    });
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // checkPaymentStatus returns expected data
  it('should check payment status and return expected data', function () {
    let http = TestBed.inject(HttpClient);
    let paymentService = TestBed.inject(PaymentService)
    // Arrange
    const orderId = 123; // order ID
    const expectedData = { }; // expected data from server
    spyOn(http, 'get').and.returnValue(of(expectedData));

    // Act
    const result = paymentService.checkPaymentStatus(orderId);

    // Assert
    result.subscribe((data: any) => {
      expect(data).toEqual(expectedData);
    });
  });
});
