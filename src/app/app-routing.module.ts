import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/User Profile/orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UsersComponent } from './components/Dashboard/Adel/users/users.component';
import { UserDetailsComponent } from './components/Dashboard/Adel/user-details/user-details.component';

const routes: Routes = [
  // Abdo
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },


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

  // Reham Sayed

  // Ahmed Hamdi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
