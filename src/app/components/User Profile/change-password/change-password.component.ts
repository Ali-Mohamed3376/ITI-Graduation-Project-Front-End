import { Component } from '@angular/core';
import { ChangePasswordDto } from 'src/app/Dtos/user/ChangePasswordDto';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControlOptions,
} from '@angular/forms';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  respomseError = '';
  constructor(
    public service: UserProfileService,
    public auth: AuthenticationService,
    private routerService: Router
  ) {}

  form = new FormGroup({
    oldPassword: new FormControl<string>(''),
    newPassword: new FormControl<string>('', [Validators.required]),
    confirmnewPassword: new FormControl<string>('', [Validators.required]),
  });

  // change password fun
  change() {
    var credentials = new ChangePasswordDto();
    credentials.OldPassword = this.form.controls.oldPassword.value ?? '';
    credentials.NewPassword = this.form.controls.newPassword.value ?? '';
    credentials.ConfirmNewPassword =
      this.form.controls.confirmnewPassword.value ?? '';
    console.log(credentials);
    if (credentials.NewPassword === credentials.ConfirmNewPassword) {
      this.service.changePassword(credentials).subscribe(
        (result) => {
          console.log(result);
          this.routerService.navigateByUrl('Sidebar');
        },
        (e) => {
          console.log(e.error);
          this.respomseError = 'User ' + e.error.title;
        }
      );
    } else {
      this.respomseError = 'Password Not Matched!!';
    }
  }
}
