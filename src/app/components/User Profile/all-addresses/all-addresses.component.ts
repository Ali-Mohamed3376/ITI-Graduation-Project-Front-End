import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-all-addresses',
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.css'],
})
export class AllAddressesComponent {
  address: any;
  id: any;
  constructor(
    myRoute: ActivatedRoute,
    public service: UserProfileService,
    public auth: AuthenticationService
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
  delete(id: any) {
    let msg = `Do yow want to delete this address?`;
    if (confirm(msg) == true) {
      this.service.deleteAddress(id).subscribe();
    }
    window.location.reload();
  }
  update(id: any, city: any, street: any, phone: any) {
    this.service.GetAddressById(this.id).subscribe();
    let updatedData = { id, city, street, phone };
    this.service.EditUserAddress(updatedData).subscribe({
      next: () => {
        this.address[this.id] = updatedData;
        // this.router.navigateByUrl('/Address');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  default(id: any) {
    this.service.setAddressDefault(id).subscribe({
      next: (data) => {
        console.log(data);
        if (this.address.defaultAddress == 'true') {
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
