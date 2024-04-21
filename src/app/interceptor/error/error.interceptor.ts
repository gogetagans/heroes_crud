import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: any) => {
        
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.error('Unauthorized request:', err);
          } else {
            console.error('HTTP error:', err);
          }
        } else {
          console.error('An error occurred:', err);
        }
        return throwError(() => err); 
      })
    );
  }
}
