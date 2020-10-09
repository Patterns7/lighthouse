import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/providers/page-services/authentication/login.service';
import { ToasterService } from 'src/app/providers/common-services/toaster-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginLoader: boolean = false;
  currentDate = new Date();

  constructor(private fb: FormBuilder,
    private router: Router, public settings: Settings,
    private _sharedService: SharedService, private loginService: LoginService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(255)/* , Validators.pattern(this.settings.emailPattern )*/]],
      password: ['', [Validators.required/* , Validators.minLength(8), Validators.maxLength(12) */]]
    });
  }

  login() {
    this.loginLoader = true;
    if (this.loginForm.controls['userName'].value === 'info@patterns7tech.com' && this.loginForm.controls['password'].value === 'Info@123456') {
      this.loginService.login(this.loginForm.value).pipe(first()).subscribe(response =>{
        this.loginLoader = false;
        response = {
          "status": "SUCCESS",
          "message": "User signed in successfully",
          "errorCode": null,
          "userWithProfile": {
            "userProfile": {
              "id": "",
              "profileId": "",
              "userId": "",
              "address": "",
              "emailId": "info@patterns7tech.com",
              "userName": "Patterns7 Lighthouse",
              "projectId": "",
              "language": "English"
            },
            "users": {
              "id": "",
              "userId": "",
              "userName": "Patterns7 Lighthouse",
              "password": "",
              "emailId": "info@patterns7tech.com",
              "role": "ADMIN",
              "hashKey": "1220af154a45383b955ffa4e6041b76b",
              "status": "ACTIVE",
              "channelType": "WEB",
              "profileId": "",
              "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmc2FkbWluQGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9BRE1JTiJdLCJpYXQiOjE2MDIyMzE0MjEsImV4cCI6MTYwMjIzODYyMX0.wmFM0cjPlZmxSz0gcLfjTVK-I2lZj36EAmPTXhtyNbA",
              "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmc2FkbWluQGdtYWlsLmNvbSIsImF1dGgiOlsiUk9MRV9BRE1JTiJdLCJpYXQiOjE2MDIyMzE0MjEsImV4cCI6MTYwMjQwNDIyMX0.nntGUOS7N3szULU7ORqX7WsYZLK87R-G4VgGp0BiEdg",
              
            }
          }
        };
        if (response.status === 'SUCCESS') {
          if (response.userWithProfile) {
            this.settings.isLoggedIn = true;
            this.settings.setValue('userData', response.userWithProfile);
            this._sharedService.emitChange('userLoggedIn');
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.toasterService.error(response.message, 'Error!');
        }
      }, error => {
        this.loginLoader = false;
      });
    } else {
      this.loginLoader = false;
      this.toasterService.error('Please check username and password.', 'Error!');
    }
    
  }

  forgotPassword() {
    this.router.navigate(['/forgotPassword']);
  }

}
