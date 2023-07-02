import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  isAdmin = false;
  isUser = false;

  constructor(private authService: AuthenticationService) {
    if (localStorage.getItem('role') == 'Admin') {
      this.isAdmin = true;
    } else if (localStorage.getItem('role') == 'Customer') {
      this.isUser = true;
    }
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((islogged) => {
      this.isUserLoggedIn = islogged;
    });
  }

  // log Out
  LogOut() {
    localStorage.clear();
    window.location.reload();
  }
}
