import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationPolicy } from './cancellation-policy.component';

describe('BuyBackComponent', () => {
  let component: CancellationPolicy;
  let fixture: ComponentFixture<CancellationPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancellationPolicy]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(CancellationPolicy);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
