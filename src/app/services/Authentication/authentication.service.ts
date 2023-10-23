import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserManagerResponse } from 'src/app/Dtos/Response/UserManagerResponse';
import { ConfirmCodeDto } from 'src/app/Dtos/user/ConfirmCodeDto';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { RegisterDto } from 'src/app/Dtos/user/RegisterDto';
import { ResetPasswordDto } from 'src/app/Dtos/user/ResetPasswordDto';
import { TokenDto } from 'src/app/Dtos/user/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // declear for logged state for subscripers
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {}

  // Login
  public Login(credentials: LoginDto): Observable<UserManagerResponse> {
    return this.client
      .post<UserManagerResponse>('https://localhost:7064/api/User/Login', credentials)
      .pipe(
        tap((Response) => {
          this.isLoggedIn$.next(true);
          if (Response.data.role === 'Admin') {
            this.isAdmin$.next(true);
          }
          localStorage.setItem('token', Response.data.token);
          localStorage.setItem('role', Response.data.role);
        })
      );
  }

  // Forget Password
  public Forget_Password(email: string): Observable<UserManagerResponse> {
    const formData = new FormData();
    formData.append('email', email);
    return this.client.post<UserManagerResponse>(
      'https://localhost:7064/api/User/ForgetPassword',
      formData
    );
  }

  //Verify code
  public Verify_Code(credentials: ConfirmCodeDto): Observable<UserManagerResponse> {
    return this.client.post<UserManagerResponse>(
      'https://localhost:7064/api/User/CheckCode',
      credentials
    );
  }

  // Reset Password
  public Reset_Password(credentials: ResetPasswordDto): Observable<UserManagerResponse> {
    return this.client.post<UserManagerResponse>(
      'https://localhost:7064/api/User/ResetPassword',
      credentials
    );
  }

  // Register
  public Register(credentials: RegisterDto): Observable<UserManagerResponse> {
    return this.client
      .post<UserManagerResponse>('https://localhost:7064/api/User/Register', credentials)
      .pipe(
        tap((Response) => {
          this.isLoggedIn$.next(true);
          if (Response.data.role === 'Admin') {
            this.isAdmin$.next(true);
          }
          localStorage.setItem('token', Response.data.token);
          localStorage.setItem('role', Response.data.role);
        })
      );
  }
}
