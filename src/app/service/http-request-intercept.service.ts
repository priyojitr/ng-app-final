import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptService implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // bypass login & register api for bearer token header
    if (this.router.url !== '/login' && this.router.url !== '/register') {
      console.log(`router url -- ${this.router.url}`);
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getBearerToken(),
          'Content-Type': 'application/json',
          username: `${this.authService.getUserId()}`
        }
      });
    }
    return next.handle(request);
  }
}
