import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
@Component({
  selector: 'app-edit-addresses',
  templateUrl: './edit-addresses.component.html',
  styleUrls: ['./edit-addresses.component.css']
})
export class EditAddressesComponent {
  address:any;
  constructor(public service:UserProfileService, public auth:AuthenticationService){
    this.service.getUserAddress().subscribe({
      next:(data)=>{
        console.log(data)
        this.address=data;
      },
            error:(err)=>{console.log(err)}
  })
  }
  
  update(id:any,city:any, street:any, phone:any) {
    let updatedA = {city,street,phone};
    this.service.EditUserAddress(updatedA).subscribe(
      {
        next:()=>{
          this.address[id]=updatedA;
          console.log(updatedA);
        },
        error:(err)=>{console.log(err)}
      }
    ); 
  }
}
