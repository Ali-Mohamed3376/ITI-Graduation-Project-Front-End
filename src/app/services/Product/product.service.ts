import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly myClient:HttpClient) { }
 private readonly Base_URl="https://localhost:7064/api/Home/AllProducts";
  
private readonly ProductDetails_URL="https://localhost:7064/api/Products/"
  



GetAllProducts(){
      return this.myClient.get(this.Base_URl);
  }

  GetProductDetailsById(id:any){
    return this.myClient.get(this.ProductDetails_URL+id);
  }



}
