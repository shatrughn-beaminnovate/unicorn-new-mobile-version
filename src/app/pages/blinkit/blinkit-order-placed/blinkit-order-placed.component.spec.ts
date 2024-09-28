import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkitOrderPlacedComponent } from './blinkit-order-placed.component';

describe('BlinkitOrderPlacedComponent', () => {
  let component: BlinkitOrderPlacedComponent;
  let fixture: ComponentFixture<BlinkitOrderPlacedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlinkitOrderPlacedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkitOrderPlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
