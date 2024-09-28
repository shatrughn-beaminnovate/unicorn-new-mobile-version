import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FindStoreComponent } from './find-store.component';

describe('FindStoreComponent', () => {
  let component: FindStoreComponent;
  let fixture: ComponentFixture<FindStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindStoreComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ConfirmationService, MessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Component initializes successfully and calls getStatesOfAllStores() method
  it('should initialize component and call getStatesOfAllStores()', function () {
    // Arrange
    const commonServiceMock = jasmine.createSpyObj('CommonService', ['postRequest']);
    const sanitizerMock = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    const component = new FindStoreComponent(commonServiceMock, sanitizerMock);

    // Act
    component.ngOnInit();

    // Assert
    expect(commonServiceMock.postRequest).toHaveBeenCalledWith('stores/get_all_states', {});
  });
});
