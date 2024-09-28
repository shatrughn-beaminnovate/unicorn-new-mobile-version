import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let fb: FormBuilder

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fb = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Form is valid and submitted successfully
  it('should submit form when it is valid', function () {
    // Arrange
    const component = fixture.componentInstance;
    component.form = fb.group({
      first_name: ['John', [Validators.required]],
      last_name: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required]],
      primary_phone: ['1234567890', [Validators.required]],
      secondary_phone: [],
      how_did_you_hear: [],
      comment: []
    });

    // Act
    component.onSubmit();

    // Assert
    expect(component.isSubmitted).toBe(true);
    expect(component.isLoading).toBe(true);
  });
});
