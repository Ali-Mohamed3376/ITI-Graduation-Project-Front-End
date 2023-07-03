import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  Categories : any
  IsDeleted: any;

  constructor(private readonly CategoryService: CategoryService) {
    this.getCategories()
  }

  public getCategories() {
    this.CategoryService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public confirmDelete(id: any) {
    if (confirm("Are you sure you want to delete this User?")) {
      this.CategoryService.DeleteCategory(id).subscribe({
        next: () => {
          this.IsDeleted = true
          this.getCategories()
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
