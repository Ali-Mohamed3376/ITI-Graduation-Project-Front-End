import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductChildDto } from 'src/app/Dtos/Product/ProductChildDto';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  isAdmin = false;
  products: ProductChildDto[] = [];
  noProductsMessage: any;

  constructor(
    private authService: AuthenticationService,
    private productServic: ProductService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((islogged) => {
      this.isUserLoggedIn = islogged;
    });
    this.authService.isAdmin$.subscribe((isAdminTrue) => {
      this.isAdmin = isAdminTrue;
    });
  }

  // log Out
  LogOut() {
    localStorage.clear();
    window.location.reload();
  }

  /*

  form = new FormGroup({
    searchTerm: new FormControl<string>('', [Validators.required]),
  });

  // serch bar
  onSearch() {
    var filter = this.form.controls.searchTerm.value ?? '';
    this.routerService.navigateByUrl(`/Products?q=${filter}`);
  }
  */
  // test search by InterKey
  onEnterKey(e: any) {
    console.log(e);
    this.routerService.navigateByUrl(`/Products?q=${e}`);
  }
}
