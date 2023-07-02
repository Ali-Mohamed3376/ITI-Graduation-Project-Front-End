import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/Dtos/Cart/cart';
import { orderAddress } from 'src/app/Dtos/OrderCheckout/OrderCheckout';
import { OrderService } from 'src/app/services/Order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartProducts:CartProduct[]=[];
  userAddresses:orderAddress[]=[];
  choosenAddressId:number=0;
  totalPrice:number=0;
  constructor(private router:Router,private orderService:OrderService){}
  ngOnInit(): void {
   this.getAllProductsInCart();
  //  if (  !(this.cartProducts.length>0))  //( not working?? )check cart has products or not 
  //   {
  //     this.router.navigate(["/cart"]);
  //   }
   this.getAllUserAddresess(); 
  }

  getAllUserAddresess()
  {
    this.orderService.GetAllUserAddresses().subscribe({
      next:(data)=>{
        this.userAddresses=data;
        console.log(this.userAddresses);
      },
      error:(error)=>{console.log(error)}
    });
  }
  
  getAllProductsInCart()
  {
    this.orderService.GetAllProductsInCart().subscribe({
      next:(data)=>{
        this.cartProducts=data;
        console.log(this.cartProducts);
        for(let product of this.cartProducts)
        {
          this.totalPrice+=product.price*product.quantity;
        }
      },
      error:(error)=>{console.log(error)}
    });
  }
  

  AddnewOrder()
  {
    console.log(`choosenAddress id = ${this.choosenAddressId}`);
    //check user choose address and cart has items
    if(this.choosenAddressId>0 && this.cartProducts.length>0)
    {
      this.orderService.AddnewOrder(this.choosenAddressId).subscribe({
        next:(data)=>{
          console.log(data);
          console.log("next");
        },
        error:(error)=>{  // why he enter the error path?
          console.log(error);
          console.log("error");
          alert("order Added Successfull ... redirect to cart page");
          this.router.navigate(["/cart"]);

        }
      });     
    }
    //check cart has products or not 
    else if (!(this.cartProducts.length>0))
    {
      this.router.navigate(["/cart"]);
    }
    //check user choose address or not
    else if ( !(this.choosenAddressId>0) )
    {
      alert("choose address");
    }
    

  }

}
