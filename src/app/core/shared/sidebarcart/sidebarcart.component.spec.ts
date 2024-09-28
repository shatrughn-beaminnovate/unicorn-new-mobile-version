import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarcartComponent } from './sidebarcart.component';

describe('SidebarcartComponent', () => {
  let component: SidebarcartComponent;
  let fixture: ComponentFixture<SidebarcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarcartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
