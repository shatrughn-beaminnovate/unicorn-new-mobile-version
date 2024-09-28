import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { CategoriesComponent } from './categories.component';
import { Title } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [MessageService,
        { provide: ChangeDetectorRef, useValue: { detectChanges: () => { } } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Successfully get category products
  it('should get category products when loadData is called', function () {
    const route = new ActivatedRoute();
    const router = TestBed.inject(Router);
    const commonService = jasmine.createSpyObj('CommonService', ['postRequest']);
    const cd = TestBed.inject(ChangeDetectorRef);
    const titleService = TestBed.inject(Title)
    const messageService = new MessageService();
    const location = TestBed.inject(Location)

    const categoriesComponent = new CategoriesComponent(
      route,
      router,
      commonService,
      cd,
      titleService,
      messageService,
      location
    );

    spyOn(categoriesComponent, 'loadData');

    categoriesComponent.loadData({});

    expect(categoriesComponent.loadData).toHaveBeenCalled();
  });
});
