import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly AllUsersAPI = "https://localhost:7064/api/AdminDashboard/GetAllUsers";
  public GetAllUsers() {
    return this.myClient.get(this.AllUsersAPI);
  }

  private readonly UserDetailsAPI = "https://localhost:7064/api/AdminDashboard/User/";
  public GetUserDetails(userId: string) {
    return this.myClient.get(this.UserDetailsAPI + userId);
  }

  private readonly DeleteUserAPI = "https://localhost:7064/api/AdminDashboard/DeleteUser/";
  public DeleteUser(userId: string) {
    return this.myClient.delete(this.DeleteUserAPI + userId)
  }
}
