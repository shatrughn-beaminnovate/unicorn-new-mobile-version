import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { CashifyService } from './cashify.service';

describe('CashifyService', () => {
  let service: CashifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    });
    service = TestBed.inject(CashifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getTierList returns Observable
  it('should return an Observable when calling getTierList', function () {
    let http = TestBed.inject(HttpClient)
    // Arrange
    const cashifyService = new CashifyService(http);

    // Act
    const result = cashifyService.getTierList();

    // Assert
    expect(result).toBeInstanceOf(Observable);
  });
});
