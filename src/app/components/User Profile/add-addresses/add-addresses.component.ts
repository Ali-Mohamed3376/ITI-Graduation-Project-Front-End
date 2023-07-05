import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-addresses',
  templateUrl: './add-addresses.component.html',
  styleUrls: ['./add-addresses.component.css']
})
export class AddAddressesComponent {
  address:any;
  constructor(public service:UserProfileService, public auth:AuthenticationService,private router: Router){
   this.service.getUserAddress().subscribe({
     next:(data)=>{
       console.log(data)
       this.address=data;
     },
           error:(err)=>{console.log(err)}
 })
  }
  add(city:any,street:any,phone:any){
    let newad={city,street,phone};
     this.service.addAddress(newad).subscribe();
     this.router.navigateByUrl('/Address');
    
   }
}
