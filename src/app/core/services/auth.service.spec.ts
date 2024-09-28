import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AlertService } from '../shared/alert';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Login with valid email and password
  it('should login successfully when valid email and password are provided', function () {
    let router: Router;
    let alertService: AlertService;

    router = TestBed.inject(Router);
    alertService = TestBed.inject(AlertService);
    // Mock the HttpClient and CommonService dependencies
    const httpClientMock = jasmine.createSpyObj('HttpClient', ['post']);
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['getRequestWithToken']);

    // Create a new instance of AuthService with the mocked dependencies
    const authService = new AuthService(httpClientMock, router, commonServiceMock, alertService);

    // Set up the mock response from the HttpClient
    const mockResponse = { status: true, data: { token: 'mockToken' } };
    httpClientMock.post.and.returnValue(of(mockResponse));

    // Call the login method with valid email and password
    authService.login('example@gmail.com', 'password').subscribe(response => {
      // Assert that the response is as expected
      expect(response).toEqual(mockResponse);

      // Assert that the token is stored in local storage
      expect(localStorage.getItem('customer_token')).toEqual(mockResponse.data.token);
    });

    expect(httpClientMock.post).toHaveBeenCalledWith(`${authService['apiUrl']}/login`, { email_id: 'example@gmail.com', password: 'password' }, jasmine.any(Object));
  });

});
