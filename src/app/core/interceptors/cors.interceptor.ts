import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreInterceptor implements HttpInterceptor {
  constructor(
    // private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    /* const httpHeaders: HttpHeaders = new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ',
    });
    req = req.clone({
      // headers: httpHeaders,
      url: environment.proxyUrl + req.url,
    }); */
    return next.handle(req);
  }
}
