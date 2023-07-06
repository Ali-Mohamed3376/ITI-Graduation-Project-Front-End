import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-addresses',
  templateUrl: './edit-addresses.component.html',
  styleUrls: ['./edit-addresses.component.css'],
})
export class EditAddressesComponent {
  address: any;
  id: any;
  constructor(
    public service: UserProfileService,
    public auth: AuthenticationService,
    myRoute: ActivatedRoute,
    private routerService: Router
  ) {
    this.service.getUserAddress().subscribe({
      next: (data) => {
        console.log(data);
        this.address = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.id = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.service.GetAddressById(this.id).subscribe({
      next: (data) => {
        this.address = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(id: any, city: any, street: any, phone: any) {
    this.service.GetAddressById(this.id).subscribe();
    let updatedData = { id, city, street, phone };
    this.service.EditUserAddress(updatedData).subscribe({
      next: () => {
        console.log(updatedData);
        this.address[this.id] = updatedData;
        this.routerService.navigateByUrl('/Address');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
