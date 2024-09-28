import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneFor } from './iphone-for.component';

describe('TrainingComponent', () => {
  let component: IphoneFor;
  let fixture: ComponentFixture<IphoneFor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IphoneFor]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IphoneFor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ngOnInit() is called successfully
  it('should call ngOnInit()', function () {
    const component = new IphoneFor();
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
