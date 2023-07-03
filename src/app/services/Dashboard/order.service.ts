import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private readonly myClient:HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/Orders/Dashboard/";
  
  public GetAllOrders(){
    return this.myClient.get(this.BaseUrl + "GetAllOrders");
  }

  public GetOrderDetails(OrderId : any){
    return this.myClient.get(this.BaseUrl + "GetOrderDetails/" + OrderId);
  }
}
