import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  constructor(
    private authService: AuthenticationService,
    private routeService: Router
  ) {}

  form = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  handelSubmit(e: Event) {
    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Login(credentials).subscribe((TokenDto) => {
      console.log(TokenDto);

      // Make Any Logic Like Redirect user to any page like home
      this.routeService.navigateByUrl('/');
    });
  }
}
