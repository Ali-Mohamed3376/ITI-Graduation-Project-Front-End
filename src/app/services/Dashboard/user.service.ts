import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly BaseUrl = "https://localhost:7064/api/AdminDashboard/";
  public GetAllUsers() {
    return this.myClient.get(this.BaseUrl + "GetAllUsers");
  }

  public GetUserDetails(userId: string) {
    return this.myClient.get(this.BaseUrl + "User/" + userId);
  }

  public DeleteUser(userId: string) {
    return this.myClient.delete(this.BaseUrl + "DeleteUser/" + userId)
  }
}
