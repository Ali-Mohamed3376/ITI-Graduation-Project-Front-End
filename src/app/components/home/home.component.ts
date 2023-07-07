import { Component,OnInit } from '@angular/core';
import { CartService } from 'src/app/services/Cart/cart.service';
import { HomeService } from 'src/app/services/Home/home.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

specialProducts:any;
topProducts:any;
constructor(
  private HomeService:HomeService,
  private cartService:CartService
  )
  {}
  


ngOnInit(): void {
    this.HomeService.GetSpecialOffers().subscribe({
      next:(data)=>{this.specialProducts=data;},
      error:(error)=>{console.log(error);}
    }),
    this.HomeService.GetTopProducts().subscribe({
      next:(data)=>{this.topProducts=data;console.log(this.topProducts[0])},
      error:(error)=>{console.log(error);}
    });
    this.cartService.getCartProductsCounter();
    
      
  }


  
  ratingOptions = [1, 2, 3, 4, 5];

  generateStars(avgRating: number): string[] {
    const stars = [];
    const roundedRating = Math.floor(avgRating);
    const hasHalfStar = avgRating - roundedRating >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push('full');
      } else if (i === roundedRating && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  }























  
}


