import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotifyMeModalComponent } from './notify-me-modal.component';
import { CommonService } from 'src/app/core/services/common.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('NotifyMeModalComponent', () => {
  let component: NotifyMeModalComponent;
  let fixture: ComponentFixture<NotifyMeModalComponent>;
  let commonServiceMock: jasmine.SpyObj<CommonService>;

  beforeEach(
    waitForAsync(() => {
      const commonServiceSpy = jasmine.createSpyObj('CommonService', ['postRequest']);
      TestBed.configureTestingModule({
        declarations: [NotifyMeModalComponent],
        providers: [{ provide: CommonService, useValue: commonServiceSpy }],
      }).compileComponents();

      fixture = TestBed.createComponent(NotifyMeModalComponent);
      component = fixture.componentInstance;
      commonServiceMock = TestBed.inject(CommonService) as jasmine.SpyObj<CommonService>;
    })
  );

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send OTP', () => {
    component.customerName = 'John Doe';
    component.mobile = '1234567890';

    const mockApiResponse = { status: true };
    commonServiceMock.postRequest.and.returnValue(of(mockApiResponse));

    component.sendOtp();

    expect(commonServiceMock.postRequest).toHaveBeenCalledWith('validate_number', {
      phone: component.mobile,
    });
    expect(component.isOtpSent).toBe(true);
  });

  it('should verify OTP successfully', () => {
    component.mobile = '1234567890';
    component.otp = '123456';
    component.productId = 1;

    const mockApiResponse = { status: true, message: 'Verification successful' };
    commonServiceMock.postRequest.and.returnValue(of(mockApiResponse));

    const swalFireSpy = spyOn(Swal, 'fire') as jasmine.Spy<any>;

    component.verifyOtp();

    expect(commonServiceMock.postRequest).toHaveBeenCalledWith('verify_otp', {
      phone: component.mobile,
      otp: component.otp,
      product_id: component.productId,
    });

    const expectedSwalConfig = {
      icon: 'success',
      title: 'Success',
      html: 'Verification successful',
      timer: 5000,
    };

    expect(swalFireSpy).toHaveBeenCalledWith(expectedSwalConfig);
    expect(component.isNotifyMeModalShow).toBe(false);
  });

    // The NotifyMeModalComponent should clear the input fields.


  it('should clear input fields', () => {
    component.customerName = 'John Doe';
    component.mobile = '1234567890';
    component.otp = '123456';

    component.clearInput();

    expect(component.customerName).toBe('');
    expect(component.mobile).toBe('');
    expect(component.otp).toBe('');
  });

});
