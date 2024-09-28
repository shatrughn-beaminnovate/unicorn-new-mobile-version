import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

import { CategoriesWithFilters } from './categories.component';

describe('CategoriesWithFilters', () => {
  let component: CategoriesWithFilters;
  let fixture: ComponentFixture<CategoriesWithFilters>;
  let commonService : CommonService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesWithFilters],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWithFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Load data with filterable attributes
  it('should load data with filterable attributes', function () {
    const categoriesWithFilters = fixture.componentInstance;
    // Mock the response from commonService.getRequest
    spyOn(commonService, 'getRequest').and.returnValue(of({ attributes: [{ attribute_type: 'type', attribute_options: [] }] }));
    categoriesWithFilters.onAttributesSelectedForFilters();
    // Assert the expected behavior
  });
});
