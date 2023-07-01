import { Component } from '@angular/core';
import { UserService } from 'src/app/services/Dashboard/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  Users: any;

  constructor(private readonly UserService:UserService) {}

  ngOnInit(): void {
    this.UserService.GetAllUsers().subscribe({
      next: (data) => {
        this.Users = data
        console.log(data)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public confirmDelete() {
    if (confirm("Are you sure you want to delete this ?")) {
        var form = document.getElementById('deleteButton')
    }
}

}
