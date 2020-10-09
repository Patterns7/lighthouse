import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { PasswordService } from 'src/app/providers/page-services/authentication/password.service';
import { ToasterService } from 'src/app/providers/common-services/toaster-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loader: boolean = false;
  currentDate = new Date();
  sucessFlag: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router, private settings: Settings,
    private _sharedService: SharedService, private passwordService: PasswordService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.createPasswordForm();
  }

  forgotPassword() {
    this.loader = true;
    this.passwordService.forgotPassword(this.passwordForm.value).subscribe(response => {
      this.loader = false;
      if (response.status === 'SUCCESS') {
        this.sucessFlag = true;
      } else {
        this.toasterService.error(response.message, 'Error!');
      }
    }, error => {
      this.loader = false;
    });
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(this.settings.emailPattern )]],
    });
  }

}
