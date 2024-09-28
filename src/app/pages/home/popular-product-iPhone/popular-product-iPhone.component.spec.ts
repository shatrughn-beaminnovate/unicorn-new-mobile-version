import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductiPhone } from './popular-product-iPhone.component';

describe('PopularProductiPhone', () => {
  let component: PopularProductiPhone;
  let fixture: ComponentFixture<PopularProductiPhone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularProductiPhone]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularProductiPhone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 