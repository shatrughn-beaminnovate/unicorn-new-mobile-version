import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from 'src/app/core/services/common.service';
import { AddressFormComponent } from './address-form.component';

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressFormComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }, {
          provide: MatDialogRef, useValue: {}
        }, {
          provide: MatDialog, useValue: {},
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Form initializes with default values
  it('should initialize form with default values', function () {
    const dialogRef = fixture.componentInstance;
    dialogRef.customerForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
      country_id: new FormControl(''),
      zone_id: new FormControl(''),
      country: new FormControl(''),
      country_code: new FormControl(''),
      zone: new FormControl('')
    });
    dialogRef.ngOnInit();
    expect(dialogRef.customerForm.value).toEqual({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      zip: '',
      country_id: '',
      zone_id: '',
      country: '',
      country_code: '',
      zone: ''
    });
  });
});
