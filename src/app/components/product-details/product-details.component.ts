import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  relatedProducts: any;
  ratingOptions = [1, 2, 3, 4, 5];

  constructor(myRoute: ActivatedRoute, public ProductDetailsService: ProductService) {
    this.ID = myRoute.snapshot.params["id"];
  }



  ngOnInit(): void {
    this.ProductDetailsService.GetProductDetailsById(this.ID).subscribe({
      next: (data) => {
        this.product = data;
        this.fetchRelatedProducts(this.product.categoryName);
      },
      error: (error) => { console.log(error) }
    });
  }



  openTab(tabId: string) {
    const tabElement = document.getElementById(tabId);

    if (tabElement) {
      const activeTab = document.querySelector('.nav-link.active');
      const activeTabPane = document.querySelector('.tab-pane.show.active');

      // Remove 'active' class from the currently active tab and tab pane
      if (activeTab) {
        activeTab.classList.remove('active');
      }
      if (activeTabPane) {
        activeTabPane.classList.remove('show', 'active');
      }

      // Add 'active' class to the selected tab and tab pane
      tabElement.classList.add('active');
      const targetTabPane = document.querySelector(tabElement.getAttribute('href') as string);
      if (targetTabPane) {
        targetTabPane.classList.add('show', 'active');
      }
    }
  }



  fetchRelatedProducts(brand: string) {
    this.ProductDetailsService.GetRelatedProducts(brand).subscribe({
      next: (RelatedData) => {

         this.relatedProducts = RelatedData;

         this.relatedProducts = this.relatedProducts.filter((product:any) => product.id != this.product.id);
         },
      error: (err) => { console.log(err) }
    });
  }
 


  openRelatedProductDetails(clickedProduct: any) {
    this.product.id = clickedProduct.id; // Assign the ID of the clicked product
    this.ProductDetailsService.GetProductDetailsById(this.product.id).subscribe({
      next: (data) => {
        this.product = data;
        this.fetchRelatedProducts(this.product.categoryName) ;
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




}
