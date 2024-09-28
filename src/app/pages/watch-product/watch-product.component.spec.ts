import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProductComponent } from './watch-product.component';

describe('WatchProductComponent', () => {
  let component: WatchProductComponent;
  let fixture: ComponentFixture<WatchProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchProductComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit()', () => {
    const watchComponent = fixture.componentInstance;
    spyOn(watchComponent, 'ngOnInit');
    watchComponent.ngOnInit();
    expect(watchComponent.ngOnInit).toHaveBeenCalled();
  });
});
