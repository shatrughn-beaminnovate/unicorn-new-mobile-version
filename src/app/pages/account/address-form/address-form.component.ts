import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonService} from "../../../core/services/common.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../../core/shared/confirm-dialog/confirm-dialog.component";
import { DummyDataService } from 'src/app/core/services/dummy-data.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  isLoading = false;
  isFormSubmitted = false;
  customerForm!: FormGroup;
  customerAddress!: ICustomerAddress;
  countryHolder!: ICountry[];
  stateHolder!: IStates[];


  constructor(
    public dialogRef: MatDialogRef<AddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private commonService: CommonService,
    private fb: FormBuilder,
    private dummyService: DummyDataService
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.getCustomerAddress(this.data.id);
    }

    let pinCodeRegex = /^[0-9]{6}$/;

    this.customerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern(pinCodeRegex)]],
      country_id: ['', [Validators.required]],
      zone_id: ['', [Validators.required]],
      country: [''],
      country_code: [''],
      zone: [''],
    });
    this.getCountry();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.customerForm.invalid) return;
    if (this.data) {
      let formData = {
        ...this.customerForm.value,
        address_id: this.data.id
      };
      console.log('Update Address Form Data : ', formData);
      this.isLoading = true;
      this.commonService.postRequestWithToken('update_address_bank', formData).pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe((resp) => {
        if (resp) {
          console.log('%cAddress Updated Successfully : ', 'color: green', resp);
          this.dialogRef.close({
            status: true,
            text: 'Address Updated Successfully'
          })
        }
      })
    } else {
      let formData = {
        ...this.customerForm.value,
      };
      console.log('Create Address Form Data : ', formData);
      this.isLoading = true;
      this.commonService.postRequestWithToken('add_address_bank', formData).pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe((resp) => {
        if (resp) {
          console.log('%cAddress Created Successfully : ', 'color: green', resp);
          this.dialogRef.close({
            status: true,
            text: 'Address Created Successfully'
          })
        }
      })
    }
  }

  getCustomerAddress(Id: number): void {
    this.commonService.getRequestWithToken(`edit_address_bank/?address_id=${Id}`).subscribe((result) => {
      console.log('Customer Address : ', result);
      this.customerAddress = result.data.field_data;
      this.getStates(this.customerAddress.country_id);
      this.customerForm.patchValue({
        firstname: this.customerAddress.firstname,
        lastname: this.customerAddress.lastname,
        email: this.customerAddress.email,
        phone: this.customerAddress.phone,
        address1: this.customerAddress.address1,
        address2: this.customerAddress.address2,
        city: this.customerAddress.city,
        zip: this.customerAddress.zip,
        country_id: this.customerAddress.country_id,
        zone_id: this.customerAddress.zone_id,
        country: this.customerAddress.country,
        country_code: this.customerAddress.country_code,
        zone: this.customerAddress.zone,
      })
    })
  }

  getCountry() {
    // this.commonService.getData('master_country').subscribe((result) => {
    this.dummyService.getMasterCountryList().subscribe((result) => {
      this.countryHolder = result.data;
    })
  }

  onChangeCountry(event: any) {
    this.getStates(event.target.value);
    if (event.target.options[event.target.options.selectedIndex].text) {
      this.customerForm.patchValue({
        country: event.target.options[event.target.options.selectedIndex].text
      });
    }
    this.countryHolder.find((item) => {
      if (+item.id === +event.target.value) {
        this.customerForm.patchValue({
          country_code: item.iso_code_2
        });
      }
    })
  }

  onChangeState(event: any) {
    this.customerForm.patchValue({
      zone: event.target.options[event.target.options.selectedIndex].text
    });
  }

  getStates(id: number) {
    this.commonService.getData(`master_state/${id}`).subscribe((result) => {
      this.stateHolder = result.data;
    })
  }

  confirmDialog(): void {
    const message = `Are you sure? You want to Close this dialog.`;

    const dialogData = new ConfirmDialogModel("Discard Unsaved Changes?", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('Confirm Dialog After Closed : ', dialogResult);
      if (dialogResult) {
        this.dialogRef.close()
      }
    });
  }
}

export interface ICustomerAddress {
  address1: string;
  address2: string;
  city: string;
  country: string;
  country_code: string;
  country_id: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: number;
  zip: number;
  zone: string;
  zone_id: number;
}

export interface IStates {
  id: number;
  country_id: number;
  code: string;
  name: string;
  status: number;
  tax: number;
}

export interface ICountry {
  address_format: string;
  id: number;
  iso_code_2: string;
  iso_code_3: string;
  name: string;
  sequence: number;
  status: number;
  tax: number;
  zip_required: number;
}


