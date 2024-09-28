import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightNewIn } from './highlight-new-in.component';


describe('HighlightNewIn', () => {
  let component: HighlightNewIn;
  let fixture: ComponentFixture<HighlightNewIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightNewIn]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightNewIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 