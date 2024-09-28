import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSwiperComponent } from './onboarding-swiper.component';

describe('OnboardingSwiperComponent', () => {
  let component: OnboardingSwiperComponent;
  let fixture: ComponentFixture<OnboardingSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
