import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularProductWatch } from './popular-product-watch.component';



describe('PopularProductWatch', () => {
  let component: PopularProductWatch;
  let fixture: ComponentFixture<PopularProductWatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularProductWatch]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductWatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 