import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CashifyModalComponent } from './cashify-modal.component';

describe('CashifyModalComponent', () => {
  let component: CashifyModalComponent;
  let fixture: ComponentFixture<CashifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashifyModalComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

      // Modal opens and initializes correctly
      it('should open modal and initialize correctly', function() {
        // Create a new instance of CashifyModalComponent
        const cashifyModalComponent = fixture.componentInstance;

        // Assert that the initial values are set correctly
        expect(cashifyModalComponent.isCashifyModalShow).toBe(false);
        expect(cashifyModalComponent.isIntroStepOpen).toBe(true);
        expect(cashifyModalComponent.isFirstStepOpen).toBe(false);
        expect(cashifyModalComponent.isSecondStepOpen).toBe(false);
        expect(cashifyModalComponent.isThirdStepOpen).toBe(false);
        expect(cashifyModalComponent.isFourthStepOpen).toBe(false);
        expect(cashifyModalComponent.isFifthStepOpen).toBe(false);
        expect(cashifyModalComponent.isSixthStepOpen).toBe(false);
        expect(cashifyModalComponent.isFinalStepOpen).toBe(false);
        expect(cashifyModalComponent.isPhoneSwitchOn).toBe('Y');
        expect(cashifyModalComponent.pincode.value).toEqual(new FormControl('').value);
        expect(cashifyModalComponent.isCheckPinLoading).toBe(false);
        expect(cashifyModalComponent.isPinCodeAvailable).toBe(false);
        expect(cashifyModalComponent.isPinCodeError).toEqual({status: false, msg: ''});
      });
});
