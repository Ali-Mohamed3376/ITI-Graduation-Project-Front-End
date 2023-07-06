import { Component } from '@angular/core';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  Users: any;

  constructor(private UserSrv: UserService) { }

  ngOnInit(): void {
    this.fetchuser();
  }


  fetchuser(): void {
    this.UserSrv.GetAllUsers().subscribe({
      next: (data) => {
        this.Users = data;
      },
      error(error) {
        console.log(error)
      }
    })
  }

  del(id: string) {
    if (confirm("Are you sure you want to delete this User?")) {
      this.UserSrv.DeleteUser(id).subscribe({
        next: () => {
        this.fetchuser();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
