import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { CartService } from 'src/app/services/Cart/cart.service';
import { WishListService } from 'src/app/services/WishList/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from 'chart.js';
import { GoogleSigninService } from 'src/app/services/Authentication/google-signin.service';

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
    private wishListService: WishListService,
    private _ngZone: NgZone,
    private googleSignInService: GoogleSigninService,

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








  

  

  
    ngOnInit(): void {

    this.googleSignInService.initialize();
    // Render the Google Sign-In button in this component
    this.googleSignInService.renderLoginButton(document.getElementById('GoogleLoginBtn')!);
    this.googleSignInService.setActionType('login');

    }

    onLoginButtonClicked()
  {
    console.log("onLoginButtonClicked")
    this.googleSignInService.setActionType('login');
  }

  // async onSubmit() {
  //   //this.formSubmitAttempt = false;
  //   if (this.form.valid) {
  //     try {
  //       this.service.login(this.form.value).subscribe((x: any) => {
  //         this.routeService.navigateByUrl('/');
  //                   console.log("Login Successful");         
  //       },
  //         (error: any) => {
  //           console.error(error);
  //           console.log("Error with Username or Password");
  //         });
  //     } catch (err) {
  //       console.log("Error with Username or Password");
        
  //     }
  //   } else {
  //     //this.formSubmitAttempt = true;
  //   }
  // }


  
    
  }

