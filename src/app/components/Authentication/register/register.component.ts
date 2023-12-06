import { identifierName } from '@angular/compiler';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import{accounts} from 'google-one-tap'
import { RegisterDto } from 'src/app/Dtos/user/RegisterDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { GoogleSigninService } from 'src/app/services/Authentication/google-signin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('buttonContainer', { static: true }) buttonContainer!: ElementRef;

  hide = true;
  respomseError: any = [];
  constructor(
    private authService: AuthenticationService,
    private routerService: Router,
    private _ngZone: NgZone,
    private googleSignInService: GoogleSigninService,
    

  ) {}

  form = new FormGroup({
    fname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    lname: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  Register() {
    var credentials = new RegisterDto();
    credentials.fname = this.form.controls.fname.value ?? '';
    credentials.lname = this.form.controls.lname.value ?? '';
    credentials.email = this.form.controls.email.value ?? '';
    credentials.password = this.form.controls.password.value ?? '';

    this.authService.Register(credentials).subscribe(
      (result: any) => {
        console.log(result);
        this.routerService.navigateByUrl('/');
      },
      (r) => {
        console.log(r.error);
        this.respomseError = [];
        // let test: any = r.error;
        for (let i of r.error) {
          if (i.code == 'DuplicateUserName') {
            continue;
          }
          this.respomseError.push(i.description);
          console.log(i);
        }
        console.log(this.respomseError);
      }
    );
  }


  ngOnInit(): void {

    this.googleSignInService.initialize();
    // Render the Google Sign-In button in this component
    this.googleSignInService.renderRegisterButton(document.getElementById('GoogleRegisterBtn')!);
    this.googleSignInService.setActionType('register');

  } 

  onRegisterButtonClicked()
  {
    this.googleSignInService.setActionType('register');
  }
}
