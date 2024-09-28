import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { BtsComponent } from './bts.component';

describe('BtsComponent', () => {
  let component: BtsComponent;
  let fixture: ComponentFixture<BtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtsComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The form controls are created and initialized correctly.
  it('should create and initialize form controls correctly', function () {
    const btsComponent = fixture.componentInstance;
    btsComponent.onInitForm();
    expect(btsComponent.stdRegisterForm).toBeTruthy();
    expect(btsComponent.LoginForm).toBeTruthy();
    expect(btsComponent.documentsForm).toBeTruthy();
  });
});
