import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularProductAirPod } from './popular-product-airpod.component';



describe('PopularProductiPad', () => {
  let component: PopularProductAirPod;
  let fixture: ComponentFixture<PopularProductAirPod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularProductAirPod]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductAirPod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 