import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { TokenDto } from 'src/app/Dtos/user/TokenDto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  constructor(private client: HttpClient) {}

  // Login
  public Login(credentials: LoginDto): Observable<TokenDto> {
    return this.client.post<TokenDto>(
      'https://localhost:7064/api/User/Login',
      credentials
    );
  }
}
