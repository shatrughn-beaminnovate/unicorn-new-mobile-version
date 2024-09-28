import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightMac } from './highlight-mac.component';


describe('HighlightMac', () => {
  let component: HighlightMac;
  let fixture: ComponentFixture<HighlightMac>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightMac]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightMac);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
