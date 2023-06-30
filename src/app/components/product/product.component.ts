import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products:any;
constructor(ProductService:ProductService){
  ProductService.GetAllProducts().subscribe(
    {
      next:(data)=>{this.products=data},
      error:(error)=>{console.log(error)}
    })
} 
}
