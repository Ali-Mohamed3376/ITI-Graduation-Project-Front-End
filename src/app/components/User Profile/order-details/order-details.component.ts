import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/services/User Profile/user-profile.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  id:any;
  details:any;
constructor(myRoute:ActivatedRoute,public service:UserProfileService){
  this.id = myRoute.snapshot.params["id"];
}
ngOnInit(): void {
  this.service.getOrderDetails(this.id).subscribe(
    { 
      next:(data)=>{
        console.log("hi");
        this.details=data;
      },
      error:(err)=>{console.log(err)}
    }
  )
}}