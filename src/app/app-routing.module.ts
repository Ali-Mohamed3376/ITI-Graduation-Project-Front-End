import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/Dashboard/Adel/users/users.component';
import { OrderDetailsComponent } from './components/User Profile/order-details/order-details.component';
import { ReviewComponent } from './components/User Profile/review/review.component';
import { AddAddressesComponent } from './components/User Profile/add-addresses/add-addresses.component';
import { AllAddressesComponent } from './components/User Profile/all-addresses/all-addresses.component';
import { EditAddressesComponent } from './components/User Profile/edit-addresses/edit-addresses.component';
import { MainProfileComponent } from './components/User Profile/main-profile/main-profile.component';
import { ChangePasswordComponent } from './components/User Profile/change-password/change-password.component';
import { ProfileComponent } from './components/User Profile/profile/profile.component';
import { AuthenticationGuardGuard } from './Guards/authentication.guard';
import { OrdersComponent } from './components/User Profile/orders/orders.component';
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
  // Reham Abdelrhman

  // Reham Sayed
  { path: 'Orders',canActivate:[AuthenticationGuardGuard], component:OrdersComponent },
  { path: 'Order/Details/:id', component: OrderDetailsComponent },
  { path: 'Profile',canActivate:[AuthenticationGuardGuard], component: MainProfileComponent },
  { path: 'Sidebar', component: ProfileComponent },
  { path: 'Address',canActivate:[AuthenticationGuardGuard], component: AllAddressesComponent },
  { path: 'Address/update',canActivate:[AuthenticationGuardGuard], component: EditAddressesComponent },
  { path: 'Address/Add',canActivate:[AuthenticationGuardGuard], component: AddAddressesComponent },
  { path: 'Review', component: ReviewComponent },
  { path: 'Change-password',canActivate:[AuthenticationGuardGuard], component: ChangePasswordComponent },


  // Ahmed Hamdi
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
