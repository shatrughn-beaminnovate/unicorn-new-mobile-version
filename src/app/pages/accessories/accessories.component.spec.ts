import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CommonService } from 'src/app/core/services/common.service';
import { AlertService } from 'src/app/core/shared/alert';

import { AccessoriesComponent } from './accessories.component';

describe('AccessoriesComponent', () => {
  let component: AccessoriesComponent;
  let fixture: ComponentFixture<AccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessoriesComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // User can view quick product details
  it('should show quick product details when quickProductView is called', function () {
    // Mock the necessary dependencies
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['getData']);
    const routeMock = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    const alertServiceMock = jasmine.createSpyObj('AlertService', ['add']);
    const cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart']);
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const locationMock = jasmine.createSpyObj('Location', ['back']);
    const titleServiceMock = jasmine.createSpyObj('Title', ['setTitle']);
    const authServiceMock = jasmine.createSpyObj('AuthService', [], { isLoggedIn: true });

    // Set up the test data
    const accessoriesComponent = new AccessoriesComponent(
      commonServiceMock,
      routeMock,
      routerMock,
      messageServiceMock,
      alertServiceMock,
      cartServiceMock,
      fbMock,
      locationMock,
      titleServiceMock,
      authServiceMock
    );
    const product = { id: 1, name: 'Accessory 1' };
    const quickViewModalMock = jasmine.createSpyObj('NotifyMeModalComponent', ['show']);
    accessoriesComponent.quickViewModal = quickViewModalMock;

    // Call the method to be tested
    accessoriesComponent.quickProductView(product);

    // Check the expectations
    expect(quickViewModalMock.show).toHaveBeenCalledWith(product);
  });
});

