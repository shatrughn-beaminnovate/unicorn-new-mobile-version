import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyBestsellersComponent } from './weekly-bestsellers.component';

describe('WeeklyBestsellersComponent', () => {
  let component: WeeklyBestsellersComponent;
  let fixture: ComponentFixture<WeeklyBestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyBestsellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyBestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
