import { Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { CredentialResponse } from 'google-one-tap';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
  
})
export class GoogleSigninService {

  private isLibraryLoaded = false;
  private googleActionType: 'login' | 'register' | null = null;

  constructor(
    private authService: AuthenticationService,
    private routerService: Router,
    private _ngZone: NgZone,
    private toaster:ToastrService
  ) {}

  // Initialize the Google Sign-In library
  initialize() {
    console.log(this.isLibraryLoaded);
    if (!this.isLibraryLoaded) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '1047961136704-aghoigv4nqki8uj638afcck5klva3t55.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      this.isLibraryLoaded = true;
    }
  }

  // Render the Google Register button
  renderRegisterButton(element: HTMLElement) {
    console.log("lets render", element);

    // Render the Google Register button in the provided element
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      element,
      { theme: 'outline', size: 'large', width: 100, shape: 'circle', text: 'signup_with',locale:'En' }
    );
  }

    // Render the Google Login button
  renderLoginButton(element: HTMLElement) {
    console.log("lets render", element);

    // Render the Google Login button in the provided element
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      element,
      { theme: 'outline', size: 'large', width: 100, shape: 'circle', text: 'signin_with',locale:'En' }
    );
  }



  async handleCredentialResponse(response: CredentialResponse) {
    console.log("inside handleCredentialResponse");
    console.log("response from google");
    console.log(response);
    console.log(`the type of action is ${this.googleActionType}`)

    // Call register API
    if(this.googleActionType=='register')
    {
      await this.authService.RegisterWithGoogle(response.credential).subscribe(
        (next:any) => {
          console.log(next);
          this._ngZone.run(() => {
            this.routerService.navigateByUrl('/');
          })},
        (error:any) => {
          console.log(error);
          let errors="";
          for (let index = 0; index < error.error.length; index++) {
              errors+=    `\n ${error.error[index].description}`
          }
          alert(errors);
        }
        ); 
              
    // Call Login API
    }else if(this.googleActionType=='login')
    {
      await this.authService.LoginWithGoogle(response.credential).subscribe(
        (next:any) => {
          console.log(next);
          this._ngZone.run(() => {
            this.routerService.navigateByUrl('/');
          })},
        (error:any) => {
            console.log(error.error);
            alert(error.error);
          }
        ); 
    }

    // Reset the googleActionType to null
    this.googleActionType=null;
     
}

setActionType(type: 'login' | 'register') {
  console.log(`googleActionType is ${type}`)
  this.googleActionType = type;
}
}


