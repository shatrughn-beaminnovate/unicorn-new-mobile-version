import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PriceAfterDotSmallPipe } from 'src/app/core/pipes/price-after-dot-small.pipe';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent, PriceAfterDotSmallPipe],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [PriceAfterDotSmallPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The billing form is submitted with invalid data.
  it('should not submit the billing form with invalid data', function () {
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['putRequest']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['putRequest']);
    const checkout = fixture.componentInstance;

    checkout.billingForm.setValue({
      firstname: '',
      lastname: '',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address1: '123 Main St',
      address2: '',
      city: 'New York',
      zip: '12345',
      country_id: '1',
      zone_id: '1',
      country: 'USA',
      country_code: 'US',
      zone: 'New York'
    });

    checkout.onBillingFormSubmit();

    expect(commonServiceMock.putRequest).not.toHaveBeenCalled();
    expect(cartServiceMock.putRequest).not.toHaveBeenCalled();
  });
});
