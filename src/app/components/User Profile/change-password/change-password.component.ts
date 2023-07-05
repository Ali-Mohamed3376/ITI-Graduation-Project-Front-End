import { Component} from '@angular/core';
import { ChangePasswordDto } from 'src/app/Dtos/user/ChangePasswordDto';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  respomseError = false;
constructor(public service:UserProfileService,public auth:AuthenticationService, private routerService: Router){}
pass=new LoginDto();
checkk=this.pass.password;
form=new FormGroup({
  oldPassword:new FormControl<string>(''),
  newPassword:new FormControl<string>('', [Validators.required]),

})
change(){
var credentials=new ChangePasswordDto();
credentials.OldPassword=this.form.controls.oldPassword.value??'';
credentials.NewPassword=this.form.controls.newPassword.value??'';
console.log(credentials)
this.service.changePassword(credentials).subscribe((result : any) => {
  console.log(result)
  this.routerService.navigateByUrl('Sidebar')
},
(e : any) =>{
  console.log(e.error)
  this.respomseError = e.error;
});

}}

