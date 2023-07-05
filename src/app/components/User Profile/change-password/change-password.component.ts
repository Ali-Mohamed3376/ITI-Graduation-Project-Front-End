import { Component} from '@angular/core';
import { ChangePasswordDto } from 'src/app/Dtos/user/ChangePasswordDto';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginDto } from 'src/app/Dtos/user/LoginDto';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
constructor(public service:UserProfileService,public auth:AuthenticationService){}
pass=new LoginDto();
checkk=this.pass.password;
form=new FormGroup({
  oldPassword:new FormControl<string>(''),
  newPassword:new FormControl<string>(''),

})
change(){
var credentials=new ChangePasswordDto();
credentials.OldPassword=this.form.controls.oldPassword.value??'';
credentials.NewPassword=this.form.controls.newPassword.value??'';
console.log(credentials)
this.service.changePassword(credentials).subscribe((result : any) => {
  console.log(result)
},
(e : any) =>{
  console.log(e.error)

});

}
check(){
  var pass=new LoginDto();
  if (this.form.controls.oldPassword.value!=pass.password){
    this.checkk='false';
  }

}

}


