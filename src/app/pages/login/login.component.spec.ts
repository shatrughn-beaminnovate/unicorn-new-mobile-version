import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Login with valid email and password
  it('should login successfully when valid email and password are provided', function () {
    let fb = TestBed.inject(FormBuilder)
    let http = TestBed.inject(HttpClient)
    let cartService = TestBed.inject(CartService)
    // Mock dependencies
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    authServiceMock.login.and.returnValue(of({ status: true }));

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    const alertServiceMock = jasmine.createSpyObj('AlertService', ['success']);


    // Create instance of LoginComponent with mocked dependencies
    const loginComponent = new LoginComponent(
      new CommonService(http),
      authServiceMock,
      new FormBuilder(),
      routerMock,
      new ActivatedRoute(),
      alertServiceMock,
      cartService
    );

    // Set form values
    loginComponent.loginForm = fb.group({
      email_id: ['test@example.com'],
      password: ['password123']
    });

    // Invoke login form submit method
    loginComponent.onLoginFormSubmit();

    // Verify that the login method of AuthService is called with the correct arguments
    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');

    // Verify that the user is redirected to the account page
    expect(routerMock.navigate).toHaveBeenCalledWith(['/account']);
  });


});
