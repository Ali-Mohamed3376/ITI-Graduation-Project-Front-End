import { Component,OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.css']
})
export class MainProfileComponent{
 user:any;
 constructor(public service:UserProfileService, public auth:AuthenticationService,
  private routeService: Router
  ){
  this.service.getUser().subscribe({
    next:(data)=>{
      console.log(data)
      this.user=data;
    },
          error:(err)=>{console.log(err)}
})
 }
 update(fname:any, lname:any) {
  let updatedU = {fname,lname};
  this.service.EditUser(updatedU).subscribe(
    {
      next:()=>{
        this.user=updatedU;
      },
     error:(err)=>{console.log(err)}
      }
  );  
  window.location.reload();
}
delete(){
  let msg = `Do yow want to delete your account?`;
  if(confirm(msg) == true) {
    this.service.deleteUser().subscribe();
    localStorage.clear();
    this.routeService.navigateByUrl('');
  }
}
}
