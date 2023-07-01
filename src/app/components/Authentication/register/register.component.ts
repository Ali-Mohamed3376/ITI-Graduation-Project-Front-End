import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/Dtos/user/RegisterDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthenticationService,
    private routerService: Router
  ) {}

  form = new FormGroup({
    fname: new FormControl<string>(''),
    lname: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  Register() {
    var credentials = new RegisterDto();
    credentials.fname = this.form.controls.fname.value ?? '';
    credentials.lname = this.form.controls.lname.value ?? '';
    credentials.email = this.form.controls.email.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Register(credentials).subscribe((result: any) => {
      console.log(result);
    });

    this.routerService.navigateByUrl('/Authentication/ConfirmEmail');
  }
}
