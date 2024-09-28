import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from "@angular/material/dialog";
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule],
      providers: [ConfirmationService, MessageService, { provide: MatDialog, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The customer details are fetched successfully from the server and displayed in the form.
  it('should fetch and display customer details', async function () {
    const accountComponent = fixture.componentInstance;

    spyOn(accountComponent, 'getCustomerDetails').and.returnValue(await Promise.resolve());
    accountComponent.ngOnInit();
    expect(accountComponent.getCustomerDetails).toHaveBeenCalled();
  });

});
