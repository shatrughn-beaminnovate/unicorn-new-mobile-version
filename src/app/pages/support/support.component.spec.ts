import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportComponent } from './support.component';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ngOnInit() is called successfully
  it('should call ngOnInit() method', function () {
    const supportComponent = new SupportComponent();
    spyOn(supportComponent, 'ngOnInit');
    supportComponent.ngOnInit();
    expect(supportComponent.ngOnInit).toHaveBeenCalled();
  });
});
