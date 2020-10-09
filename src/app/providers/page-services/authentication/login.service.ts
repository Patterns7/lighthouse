import { Injectable } from '@angular/core';
import { Api } from 'src/app/providers/common-services/api';
import { Settings } from 'src/app/providers/common-services/settings';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  private tokenSubject: BehaviorSubject<any>;

  constructor(private api: Api, private settings: Settings, private sharedService: SharedService) {
    this.sharedService.changeEmitted$.subscribe(text => {
      if (text === 'userLoggedIn') {
        this.tokenSubject = new BehaviorSubject<any>(this.settings.getValue('userData'));
      } else if (text === 'userLoggedOut') {
        this.settings.isLoggedIn = false;
        this.settings.setValue('userData', null);
        this.tokenSubject = null;
      }
    });
    this.tokenSubject = new BehaviorSubject<any>(this.settings.getValue('userData'));
  }

  public get currentUserValue(): any {
    return this.tokenSubject ? (this.tokenSubject.value ? this.tokenSubject.value.users.token : null) : null;
  }

  login(userInfo: any) {
    const body = `email=${userInfo.userName}&password=${userInfo.password}&channelType=WEB`;
    const result = this.api.post('authUser', body);
    return result;
  }
}
