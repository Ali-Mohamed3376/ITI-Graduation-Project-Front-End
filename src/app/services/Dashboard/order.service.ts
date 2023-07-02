import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private readonly myClient:HttpClient) { }

  private readonly AllOrders = "https://localhost:7064/api/AdminDashboard/GetAllUsers";
  GetAllOrders(){
    return this.myClient.get(this.AllOrders);
  }
}
