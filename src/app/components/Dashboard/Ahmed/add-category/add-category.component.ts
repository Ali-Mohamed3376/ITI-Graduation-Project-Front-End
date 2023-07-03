import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryAddDto } from 'src/app/Dtos/Dashboard/CategoryAddDto';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(private categoryService: CategoryService, private routerService: Router) {

  }

  form = new FormGroup({
    CategoryName: new FormControl<string>('')
  });

  addCategory() {
    var credentials = new CategoryAddDto();
    credentials.name = this.form.controls.CategoryName.value ?? '';

    this.categoryService.AddCategory(credentials).subscribe({
      next: () => {
        this.routerService.navigateByUrl('/dashboard/categories');
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
