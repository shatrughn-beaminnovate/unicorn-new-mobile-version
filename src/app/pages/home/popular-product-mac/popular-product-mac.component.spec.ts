import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularProductMac } from './popular-product-mac.component';



describe('PopularProductMac', () => {
  let component: PopularProductMac;
  let fixture: ComponentFixture<PopularProductMac>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularProductMac]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductMac);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 