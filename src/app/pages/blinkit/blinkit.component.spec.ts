import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkitComponent } from './blinkit.component';

describe('BlinkitComponent', () => {
  let component: BlinkitComponent;
  let fixture: ComponentFixture<BlinkitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlinkitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
