import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let token_key = localStorage.getItem('token');
    const parsedToken = token_key ? JSON.parse(token_key) : null;
    if (parsedToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
    }
    return next.handle(request);
  }
}
