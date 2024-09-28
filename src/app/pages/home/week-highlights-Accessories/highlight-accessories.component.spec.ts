import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightAccessories } from './highlight-accessories.component';


describe('HighlightAccessories', () => {
  let component: HighlightAccessories;
  let fixture: ComponentFixture<HighlightAccessories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightAccessories]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightAccessories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
