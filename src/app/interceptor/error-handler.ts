import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Settings } from 'src/app/providers/common-services/settings';
import { ToasterService } from '../providers/common-services/toaster-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private settings: Settings, private toasterService: ToasterService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.toasterService.warning(err.error.message, 'Warning!');
          this.settings.logOut();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }));
    }
}
