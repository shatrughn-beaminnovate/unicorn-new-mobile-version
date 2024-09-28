import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceComponent } from './price.component';

describe('PriceComponent', () => {
  let component: PriceComponent;
  let fixture: ComponentFixture<PriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Display price with default style class 'price'
  it('should display price with default style class \'price\' when price is provided', function () {
    // Arrange
    const component = new PriceComponent();
    component.price = 10;

    // Act
    // No action required

    // Assert
    expect(component.price).toBe(10);
    expect(component.priceStyleClass).toBe('price');
  });
});
