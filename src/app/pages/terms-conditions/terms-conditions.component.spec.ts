import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditions } from './terms-conditions.component';

describe('BuyBackComponent', () => {
  let component: TermsConditions;
  let fixture: ComponentFixture<TermsConditions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsConditions]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(TermsConditions);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
