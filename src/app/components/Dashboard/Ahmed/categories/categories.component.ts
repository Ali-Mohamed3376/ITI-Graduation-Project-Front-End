import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  Categories : any

  constructor(private readonly CategoryService: CategoryService, private dialog : MatDialog) {
    this.fetchCategory()
  }

  public fetchCategory() {
    this.CategoryService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public del(id: any) {
    if (confirm("Are you sure you want to delete this Category?")) {
      this.CategoryService.DeleteCategory(id).subscribe({
        next: () => {
          this.fetchCategory()
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  openAddPopup() {
    this.dialog.open(AddCategoryComponent).addPanelClass("popupComponent");
  }

  openEditPopup(id : any) {
    this.dialog.open(EditCategoryComponent, {data:{Id : id}}).addPanelClass("popupComponent");
  }
}
