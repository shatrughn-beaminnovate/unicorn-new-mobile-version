import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalShopperComponent } from './personal-shopper.component';

describe('PersonalShopperComponent', () => {
  let component: PersonalShopperComponent;
  let fixture: ComponentFixture<PersonalShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalShopperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Clicking on 'Next' button changes steps to 'book-appointment'
  it('should set steps to "book-appointment" when nextStep is called with "book-appointment"', function () {
    const component = new PersonalShopperComponent();
    component.nextStep('book-appointment');
    expect(component.steps).toEqual('book-appointment');
  });
});
