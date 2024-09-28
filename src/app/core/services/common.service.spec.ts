import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getData method returns an observable of any type with token
  it('should return an observable of any type with token', function () {
    let http = TestBed.inject(HttpClient)
    const commonService = new CommonService(http);
    const apiUrlEndPoint = 'test-endpoint';
    const mockResponse = { data: 'test data' };
    spyOn(http, 'get').and.returnValue(of(mockResponse));
    spyOn(localStorage, 'getItem').and.returnValue('test-token');

    commonService.getData(apiUrlEndPoint).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  });
});
