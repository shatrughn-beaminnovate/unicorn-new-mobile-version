import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { WatchCategoryComponent } from './watch-category.component';

describe('WatchCategoryComponent', () => {
  let component: WatchCategoryComponent;
  let fixture: ComponentFixture<WatchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchCategoryComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule, BrowserModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Sorts data based on selected sort option
  it('should sort data when sort option is selected', function () {
    const activatedRouteMock = {
      paramMap: of({ params: { slug: 'watch' } })
    };
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['postRequest']);
    const titleServiceMock = jasmine.createSpyObj('Title', ['setTitle']);
    const changeDetectorRefMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    const watchCategoryComponent = fixture.componentInstance

    watchCategoryComponent.onSortChange({ value: 'name' });

    expect(watchCategoryComponent.sortField).toBe('name');
    expect(watchCategoryComponent.sortOrder).toBe(1);
  });
});
