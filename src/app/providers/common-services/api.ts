import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from './settings';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class Api {
  header: any;
  tokenValue: any = '';

  constructor(private http: HttpClient, private settings: Settings, private sharedService: SharedService) {
  }

  // tslint:disable-next-line: deprecation
  get(endpoint: string, params?: any): any {
    const header = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('X-Version', environment.apiVersion)
      .append('Accept', 'application/json');
    const httpOptionssss = {
      headers: header
    };
    return this.http.get(environment.apiUrl + '/' + endpoint, httpOptionssss);
  }

  // tslint:disable-next-line: deprecation
  post(endpoint: string, body: any): any {
    const header = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('X-Version', environment.apiVersion)
      .append('Accept', 'application/json');
    const httpOptionssss = {
      headers: header
    };
    return this.http.post(environment.apiUrl + '/' + endpoint, body, httpOptionssss);
  }

  uploadDocuments(endpoint: string, formData: FormData) {
    const header = new HttpHeaders()
      .append('X-Version', environment.apiVersion);
    const httpOptions = { headers: header };
    return this.http.post(environment.apiUrl + '/' + endpoint, formData, httpOptions);
  }

  downloadDocument(endpoint: string) {
    const header = new HttpHeaders()
      .append('X-Version', environment.apiVersion)
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const httpOptions = {
      headers: header,
      responseType: 'arraybuffer' as 'arraybuffer'
    };

    const result = this.http.get(environment.apiUrl + '/' + endpoint, httpOptions);
    return result;
  }

  exportToExcel(endpoint: string, body: any): any {
    const header = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const httpOptionssss = {
      headers: header,
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.post(environment.apiUrl + '/' + endpoint, body, httpOptionssss);
  }

}
