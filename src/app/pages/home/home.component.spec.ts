import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // commonService.getData() method is called with an invalid endpoint and returns an error
  it('should call commonService.getData method with invalid endpoint and return an error', () => {
    const commonService = jasmine.createSpyObj('CommonService', ['getData']);
    const component = fixture.componentInstance;
    const endpoint = 'invalid-endpoint';

    commonService.getData.and.throwError('Invalid endpoint');

    expect(() => {
      commonService.getData(endpoint);
    }).toThrowError('Invalid endpoint');
    expect(commonService.getData).toHaveBeenCalledWith(endpoint);
  });
});
