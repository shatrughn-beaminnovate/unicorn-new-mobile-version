import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { HotDealsComponent } from './hot-deals.component';

describe('HotDealsComponent', () => {
  let component: HotDealsComponent;
  let fixture: ComponentFixture<HotDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotDealsComponent],
      imports: [HttpClientModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Component is created successfully with default values
  it('should create component with default values', function () {
    // Arrange
    const component = fixture.componentInstance;

    // Act
    // No action required

    // Assert
    expect(component.hotDealsHolder).toEqual([]);
    expect(component.imgUrl).toEqual(environment.imgUrl);
    expect(component.customOptions).toEqual({
      loop: true,
      margin: 15,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      stagePadding: 50,
      dots: true,
      navSpeed: 700,
      navText: ['<', '>'],
      responsive: {
        0: {
          items: 1,
          nav: false,
          stagePadding: 30,
        },
        425: {
          items: 2,
          nav: false,
          stagePadding: 30,
        },
        768: {
          items: 3,
          nav: false,
          stagePadding: 30,
        },
        1024: {
          items: 4,
          nav: true,
        },
        1440: {
          items: 5,
          nav: true,
        }
      }
    });
  });
});
