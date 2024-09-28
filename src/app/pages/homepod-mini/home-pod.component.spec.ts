import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePod } from './home-pod.component';

describe('BuyBackComponent', () => {
  let component: HomePod;
  let fixture: ComponentFixture<HomePod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePod]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(HomePod);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
