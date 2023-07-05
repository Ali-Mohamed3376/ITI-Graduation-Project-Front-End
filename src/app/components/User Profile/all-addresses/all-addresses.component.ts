import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CheckboxRequiredValidator } from '@angular/forms';
@Component({
  selector: 'app-all-addresses',
  templateUrl: './all-addresses.component.html',
  styleUrls: ['./all-addresses.component.css']
})
export class AllAddressesComponent {
  address:any;
  id:any;
  constructor(myRoute:ActivatedRoute,public service:UserProfileService, public auth:AuthenticationService){
   this.service.getUserAddress().subscribe({
     next:(data)=>{
       console.log(data)
       this.address=data;
     },
           error:(err)=>{console.log(err)}
 })
 this.id = myRoute.snapshot.params["id"];
  }
  delete(id:any){
    let msg = `Do yow want to delete this address?`;
    if(confirm(msg) == true) {
      this.service.deleteAddress(id).subscribe();
    }
    window.location.reload();
  }

  default(id:any){
    this.service.setAddressDefault(id).subscribe(
      {
        next:(data)=>{console.log(data)
          if(this.address.defaultAddress=="true"){
          }
        },
        error:(err)=>{console.log(err)}
       
      }

    );
  }
  
}
