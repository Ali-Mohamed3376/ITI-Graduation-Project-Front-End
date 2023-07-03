import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/Product/product.service';
import { FormsModule } from '@angular/forms';
import { ProductChildDto } from 'src/app/Dtos/Product/ProductChildDto';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: ProductChildDto[]=[];
  brands: any;
  ratingOptions = [1, 2, 3, 4, 5];
  noProductsMessage:any;

  // Selected filter options
  selectedBrandId!: any;
  selectedMinPrice!: any;
  selectedMaxPrice!: any;
  selectedRating!: any; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
  }

  loadProducts() {
    this.productService.GetAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadBrands() {
    this.productService.GetAllBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
      error: (error) => { console.log(error) }
    });
  }

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



applyFilters() {
  var filterData = {
    categotyId: this.selectedBrandId,
    productName: "",
    minPrice: this.selectedMinPrice || 0,
    maxPrice: this.selectedMaxPrice || 0,
    rating: this.selectedRating || 0
  };

this.productService.filterProducts(filterData).subscribe({
  next: (data) => {
    this.products = data;

    if (data && data.length === 0) {
      this.noProductsMessage = "No products found that match your requirements.";
    } else {
      this.noProductsMessage = "";
    }
  },
  error: (error) => {
    console.log(error);
  }
});
}

resetFilters() {
  this.selectedBrandId = null; // Reset the selected brand
  this.selectedMinPrice = null; // Reset the selected min price
  this.selectedMaxPrice = null; // Reset the selected max price
  this.selectedRating = null; // Reset the selected rating
  this.noProductsMessage = "";
 this.loadProducts();
}




}