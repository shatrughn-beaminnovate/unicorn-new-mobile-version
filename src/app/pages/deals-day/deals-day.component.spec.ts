import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsDayComponent } from './deals-day.component';

describe('DealsDayComponent', () => {
  let component: DealsDayComponent;
  let fixture: ComponentFixture<DealsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
