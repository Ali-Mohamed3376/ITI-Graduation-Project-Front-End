import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { TokenDto } from 'src/app/Dtos/user/TokenDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthenticationService) {}

  form = new FormGroup({
    username: new FormControl<string>('string'),
    password: new FormControl<string>('string'),
  });

  handelSubmit(e: Event) {
    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Login(credentials).subscribe((TokenDto) => {
      console.log(TokenDto);

      // Make Any Logic Like Redirect user to any page
    });
  }
}
