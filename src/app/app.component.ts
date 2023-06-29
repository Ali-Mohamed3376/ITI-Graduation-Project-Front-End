import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Final-Project-Demo';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.authService.isLoggedIn$.next(true);
    }
  }
}
