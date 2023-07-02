import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/Dashboard/Adel/users/users.component';
import { UserDetailsComponent } from './components/Dashboard/Adel/user-details/user-details.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  // Abdo
  { path: '', component: HomeComponent },

  // Ali

  // Making an Lazy Loading
  {
    path: 'Authentication',
    loadChildren: () =>
      import('./components/Authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },

  // Adel
  { path: 'dashboard/users', component: UsersComponent },
  { path: 'dashboard/users/:id', component: UserDetailsComponent },
  // Reham Abdelrhman
  { path: "Home", component: HomeComponent },
  { path: "Products", component: ProductComponent },
  { path: "Products/:id", component: ProductDetailsComponent },

  // Reham Sayed

  // Ahmed Hamdi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
