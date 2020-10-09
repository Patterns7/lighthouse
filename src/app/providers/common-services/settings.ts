import { Injectable, Inject } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


@Injectable()
export class Settings implements CanActivate {
  alphanumericPattern: any = /^[a-zA-Z\d- _]+$/;
  alphabetPattern: any = '[a-zA-Z][a-zA-Z ]+';
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern: any = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  mobilePattern: any = /^[1-9][0-9]{0,9}$/;
  zipPattern: any = /^[1-9][0-9]{4,9}$/;
  datePattern: any = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;
  isLoggedIn: boolean = false;

  userRootPath: any = 'user/v1/';

  modalWidth: any = screen.width + 'px';
  modalHeight: any = 100 - 1 + '%';

  constructor(private router: Router, @Inject(SESSION_STORAGE) private storage: StorageService) {

  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return true;
  }

  getValue(key: string) {
    return this.storage.get(key);
  }

  setValue(key: string, value: any) {
    return this.storage.set(key, value);
  }

  logOut() {
    this.isLoggedIn = false;
    this.setValue('userData', null);
    this.router.navigate(['/login']);
  }
}
