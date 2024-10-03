import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/response/response';
import { LoginService } from '../../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService : LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let user: User | null = JSON.parse(localStorage.getItem('user')!);

    if (user && user.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }else{
      this.loginService.logOut();
    }
    return next.handle(req);
  }
}
