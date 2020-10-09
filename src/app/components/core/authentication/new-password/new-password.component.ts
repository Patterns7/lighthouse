import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Settings } from 'src/app/providers/common-services/settings';
import { SharedService } from 'src/app/providers/common-services/shared.service';
import { PasswordService } from 'src/app/providers/page-services/authentication/password.service';
import { ToasterService } from 'src/app/providers/common-services/toaster-service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  loader: boolean = false;
  currentDate = new Date();
  sucessFlag: boolean = false;
  hashKey: string = '';

  constructor(private fb: FormBuilder,
    private router: Router, private settings: Settings,
    private _sharedService: SharedService, private passwordService: PasswordService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute) { 
      this.hashKey = this.activatedRoute.snapshot.queryParamMap.get('hashKey')||null;
    }

  ngOnInit() {
    this.createPasswordForm();
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

  newPassword() {
    if (this.hashKey !== null) {
      if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirmPassword'].value) {
        this.toasterService.error('Both password are not matched. Please enter correct password.', 'Error!');
        return;
      }
      let requestDto = {
        hashKey: this.hashKey,
        password: this.passwordForm.controls['password'].value
      };
      this.loader = true;
      this.passwordService.newPassword(requestDto).subscribe(response => {
        if (response.status === 'SUCCESS') {
          this.toasterService.success('Password updated successfully.', 'Success!');
          this.router.navigate(['/login']);
        } else {
          this.toasterService.error(response.message, 'Error!');
        }
        this.loader = false;
      })
    } else {
      this.toasterService.warning('Please use correct link for reset password.', 'Warning!');
    }
  }

}
