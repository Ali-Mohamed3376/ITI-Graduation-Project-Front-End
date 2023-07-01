import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly myClient:HttpClient) { }

  private readonly AllUsers = "https://localhost:7064/api/AdminDashboard/GetAllUsers";
  public GetAllUsers(){
    return this.myClient.get(this.AllUsers);
  }
}
