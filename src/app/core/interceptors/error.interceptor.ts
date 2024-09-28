import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResp: HttpErrorResponse) => this.handleError(errorResp))
    );
  }

  private handleError(errorResp: HttpErrorResponse): Observable<never> {
    let errorText = this.getErrorText(errorResp);
    console.log('HTTP Error : ', errorText);
    Swal.fire({
      title: 'Error!',
      text: errorText,
      icon: 'error',
    });
    return throwError(errorText);
  }

  private getErrorText(errorResp: HttpErrorResponse): string {
    if (errorResp.error instanceof ErrorEvent) {
      // Client Side Error
      console.log('Client Side Error : ', errorResp);
      return errorResp.error.message;
    } else {
      // Server Side Error
      console.log('Server Side Error : ', errorResp);
      return errorResp.status === 0 ? 'Something went wrong!' : errorResp.statusText;
    }
  }
}