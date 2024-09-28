import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmDialogComponent, ConfirmDialogModel } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [HttpClientModule, RouterTestingModule, MatDialogModule, BrowserModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Clicking 'Confirm' button closes dialog with true value
  it('should close dialog with true value when \'Confirm\' button is clicked', function () {
    // Arrange
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const data = new ConfirmDialogModel('Test Title', 'Test Message');
    const component = new ConfirmDialogComponent(dialogRef, data);

    // Act
    component.onConfirm();

    // Assert
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
