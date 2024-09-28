import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAndEventComponent } from './news-and-event.component';

describe('NewsAndEventComponent', () => {
  let component: NewsAndEventComponent;
  let fixture: ComponentFixture<NewsAndEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsAndEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAndEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
