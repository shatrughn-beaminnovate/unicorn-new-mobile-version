import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: CartService;
  let commonService: CommonService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartService = TestBed.inject(CartService);
    commonService = TestBed.inject(CommonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Category navbar is loaded successfully
  it('should load category navbar successfully', function () {
    // Mock the commonService.getData method to return a result with category data
    spyOn(commonService, 'getData').and.returnValue(of([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ]));

    const headerComponent = fixture.componentInstance;

    // Call the ngOnInit method of HeaderComponent
    headerComponent.ngOnInit();

    // Assert that the categoryHolder property has been set correctly
    expect(headerComponent.categoryHolder).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ]);
  });

});
