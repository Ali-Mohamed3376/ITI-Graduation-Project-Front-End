import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  // Abdo
  { path: '', component: HomeComponent },

  // Ali

  // Adel

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
export class AppRoutingModule {}
