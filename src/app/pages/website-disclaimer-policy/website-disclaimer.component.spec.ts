import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDisclaimer } from './website-disclaimer.component';

describe('BuyBackComponent', () => {
  let component: WebsiteDisclaimer;
  let fixture: ComponentFixture<WebsiteDisclaimer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteDisclaimer]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDisclaimer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check selector', () => {
    const fixture = TestBed.createComponent(WebsiteDisclaimer);
    const appComponent = fixture.componentInstance;
    expect(appComponent.selector).toBeDefined();
  });

});
