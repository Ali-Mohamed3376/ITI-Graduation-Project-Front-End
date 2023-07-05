import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  respomseError: string = '';
  showComponent = false;

  constructor(
    private authService: AuthenticationService,
    private routeService: Router,
    private cartService:CartService
  ) {}

  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', Validators.required),
  });

  handelSubmit(e: Event) {
    var credentials = new LoginDto();
    credentials.userName = this.form.controls.username.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Login(credentials).subscribe(
      (TokenDto) => {
        console.log(TokenDto);
        this.cartService.getCartProductsCounter();


        // Make Any Logic Like Redirect user to any page like home
        this.routeService.navigateByUrl('/');
      },
      (e) => {
        // handle error
        this.respomseError = e.error;
      }
    );
  }
}
