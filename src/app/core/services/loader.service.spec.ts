import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // show() should set pointerEvents to none on body element
  it('should set pointerEvents to none on body element when show() is called', function () {
    const loaderService = new LoaderService();
    loaderService.show();
    const body = document.getElementsByTagName('body');
    expect(body[0].style.pointerEvents).toBe('none');
  });
});
