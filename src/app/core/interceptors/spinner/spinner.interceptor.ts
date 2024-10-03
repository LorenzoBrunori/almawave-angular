import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  callCounter = 0;

  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.callCounter++;
    setTimeout(() => {
      this.spinnerService.isLoading$.next(true);
    });
    return next.handle(req).pipe(
      finalize(() => {
        this.callCounter--;
        if (this.callCounter === 0) {
            this.spinnerService.isLoading$.next(false);
        }
      })
    );
  }}
