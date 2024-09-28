import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSocialShareComponent } from './product-social-share.component';

describe('ProductSocialShareComponent', () => {
  let component: ProductSocialShareComponent;
  let fixture: ComponentFixture<ProductSocialShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSocialShareComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSocialShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Inputs are correctly assigned to component properties
  it('should assign inputs to component properties', function () {
    const component = new ProductSocialShareComponent();
    component.url = 'https://example.com';
    component.title = 'Example Title';
    component.image = 'example.jpg';
    component.description = 'Example Description';
    expect(component.url).toEqual('https://example.com');
    expect(component.title).toEqual('Example Title');
    expect(component.image).toEqual('example.jpg');
    expect(component.description).toEqual('Example Description');
  });
});
