import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookingTerms } from './prebooking-terms.component';

describe('BuyBackComponent', () => {
  let component: PrebookingTerms;
  let fixture: ComponentFixture<PrebookingTerms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrebookingTerms]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookingTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(PrebookingTerms);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
