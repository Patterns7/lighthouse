import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../providers/page-services/authentication/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenValue = this.loginService.currentUserValue;
    if (tokenValue) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${tokenValue}`,
        }
      });
    }
    return next.handle(request);
  }
}
