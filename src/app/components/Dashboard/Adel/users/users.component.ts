import { Component } from '@angular/core';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  Users: any;
  IsDeleted = false;

  constructor(private readonly UserService: UserService) {
    this.GetAllUsers()
  }

  public GetAllUsers() {
    this.UserService.GetAllUsers().subscribe({
      next: (data) => {
        this.Users = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public confirmDelete(id: any) {
    if (confirm("Are you sure you want to delete this User?")) {
      this.UserService.DeleteUser(id).subscribe({
        next: () => {
          this.IsDeleted = true
          this.GetAllUsers()
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
