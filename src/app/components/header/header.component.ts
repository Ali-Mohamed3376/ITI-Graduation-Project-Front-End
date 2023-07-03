import { Component, OnInit } from '@angular/core';
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
    private productServic: ProductService
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

  // serch bar
  searchTerm: string = '';
  onSubmit() {
    this.productServic.Search(this.searchTerm).subscribe({
      next: (data) => {
        if (data && data.length === 0) {
          this.noProductsMessage =
            'No products found that match your requirements.';
        } else {
          this.noProductsMessage = '';
        }
      },
      error: (error) => {},
    });
  }
}
