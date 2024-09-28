import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDelivery } from './shipping-delivery.component';

describe('BuyBackComponent', () => {
  let component: ShippingDelivery;
  let fixture: ComponentFixture<ShippingDelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingDelivery]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDelivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(ShippingDelivery);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
