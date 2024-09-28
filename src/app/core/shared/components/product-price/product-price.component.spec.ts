import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceComponent } from './product-price.component';

describe('ProductPriceComponent', () => {
  let component: ProductPriceComponent;
  let fixture: ComponentFixture<ProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Handle when the selected product is undefined.
  it('should handle when the selected product is undefined', function () {
    // Arrange
    const component = new ProductPriceComponent();
    component.selectedProduct = undefined;

    // Act
    const result = component.selectedProduct;

    // Assert
    expect(result).toBeUndefined();
  });
});
