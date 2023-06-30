import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
ID=0;
product:any;
  constructor(myRoute:ActivatedRoute,public ProductDetailsService:ProductService){
    this.ID=myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
this.ProductDetailsService.GetProductDetailsById(this.ID).subscribe({
  next:(data)=>{this.product=data},
  error:(error)=>{console.log(error)}
})  }
}
