import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { TokenDto } from 'src/app/Dtos/user/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // declear for logged state for subscripers
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {}

  // Login
  public Login(credentials: LoginDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://localhost:7064/api/User/Login', credentials)
      .pipe(
        tap((TokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', TokenDto.token);
          localStorage.setItem('role', TokenDto.role);
        })
      );
  }
}
