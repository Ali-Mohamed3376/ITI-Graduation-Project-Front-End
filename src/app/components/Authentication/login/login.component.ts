import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  respomseError: string = '';
  showComponent = false;

  constructor(private toastr: ToastrService,
    private authService: AuthenticationService,
    private routeService: Router,
    private cartService: CartService,
    private wishListService: WishListService
  ) {}

  form = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', Validators.required),
  });

  handelSubmit() {
    var credentials = new LoginDto();
    credentials.Email = this.form.controls.username.value ?? '';
    credentials.Password = this.form.controls.password.value ?? '';

    this.authService.Login(credentials).subscribe(
      (Response) => {
        console.log(Response);
        this.cartService.getCartProductsCounter();
        this.wishListService.GetWishListCount();
        // Make Any Logic Like Redirect user to any page like home
        this.routeService.navigateByUrl('/');
        this.toastr.success(`${Response.message}`, 'Success' );
      },
      (e) => {
        // handle error
        this.toastr.error(`${e.error.message}`, 'Error' );
        this.respomseError = e.error.message;
        console.log(e.error)
      }
    );
  }
}
