import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AlertComponent } from './alert.component';
import { AlertType } from './alert.model';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Alert is shown with message, title and type
  it('should show alert with message, title, and type', function () {
    const alertComponent = fixture.componentInstance;
    const message = 'Test message';
    const title = 'Test title';
    const type = AlertType.success;
    const delay = 5000;
    const id = 'test-id';

    const alertId = alertComponent.show(message, title, type, delay, id);

    expect(alertComponent.alerts.length).toBe(1);
    expect(alertComponent.alerts[0].message).toBe(message);
    expect(alertComponent.alerts[0].title).toBe(title);
    expect(alertComponent.alerts[0].type).toBe(type);
    expect(alertComponent.alerts[0].delay).toBe(delay);
    expect(alertComponent.alerts[0].id).toBe(id);
    expect(alertId).toBe(id);
  });
});
