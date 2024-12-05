import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private user: LoginService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.user.getAccessToken();
    console.log(accessToken);

 
    if (accessToken) {
      // Clone the request and add the Authorization header
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `${accessToken}`, // Ensure format is correct
        },
      });

      console.log('Cloned Request Headers:', clonedRequest.headers); // Debug cloned request headers

      return next.handle(clonedRequest);
    } else {
      return new Observable<HttpEvent<unknown>>(); // Empty observable
    }
  }
}
