import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private commonService: CommonService,
    private router: Router
  ) {
  }

  // Intercept every request and show the loading spinner
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    this.loaderService.show();
    return next.handle(request).pipe(
      tap((resp) => {
        if (resp instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }, () => {
        this.loaderService.hide();
      }));
  }
}
