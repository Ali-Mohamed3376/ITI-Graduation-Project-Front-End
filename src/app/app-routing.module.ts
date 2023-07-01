import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/User Profile/profile/profile.component'; 
import { OrdersComponent } from './components/User Profile/orders/orders.component';
import { AllAddressesComponent } from './components/User Profile/all-addresses/all-addresses.component';
import { MainProfileComponent } from './components/User Profile/main-profile/main-profile.component';
const routes: Routes = [{ path: '', component: HomeComponent },
{path:'profile', component: ProfileComponent},
{path:'UserOrder', component:OrdersComponent},
{path:'Addresses', component:AllAddressesComponent},
{path:'main-profile', component:MainProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
