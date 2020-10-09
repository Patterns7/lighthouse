import { Injectable } from '@angular/core';
import { Api } from 'src/app/providers/common-services/api';
import { Settings } from 'src/app/providers/common-services/settings';

@Injectable()
export class PasswordService {

  constructor(private api: Api, private settings: Settings) {

  }

  forgotPassword(request: any) {
    const body = `email=${request.email}&channelType=WEB`;
    const result = this.api.post(this.settings.userRootPath + 'user/forgotPassword', body);
    return result;
  }

  newPassword(request: any) {
    const body = `hashKey=${request.hashKey}&password=${request.password}&channelType=WEB`;
    const result = this.api.post(this.settings.userRootPath + 'user/setPassword', body);
    return result;
  }

  changePassword(request: any) {

  }

}