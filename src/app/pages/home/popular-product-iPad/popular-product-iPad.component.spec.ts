import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularProductiPad } from './popular-product-iPad.component';



describe('PopularProductiPad', () => {
  let component: PopularProductiPad;
  let fixture: ComponentFixture<PopularProductiPad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularProductiPad]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductiPad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 