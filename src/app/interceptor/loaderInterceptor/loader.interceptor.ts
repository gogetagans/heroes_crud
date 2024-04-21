import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../../services/loader/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
   // console.log('LoaderInterceptor: Show loader');
    
    return next.handle(request).pipe(
      finalize(() => {
       // console.log('LoaderInterceptor: Hide loader');
        
        this.loaderService.hideLoader();
      })
    );
  }
}