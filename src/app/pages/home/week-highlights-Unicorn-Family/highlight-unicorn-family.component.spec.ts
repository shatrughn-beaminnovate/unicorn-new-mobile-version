import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightUnicornFamily } from './highlight-unicorn-family.component';


describe('HighlightUnicornFamily', () => {
  let component: HighlightUnicornFamily;
  let fixture: ComponentFixture<HighlightUnicornFamily>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightUnicornFamily]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightUnicornFamily);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
