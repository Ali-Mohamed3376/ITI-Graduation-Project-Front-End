import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEditDto } from 'src/app/Dtos/Dashboard/CategoryEditDto';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {
  Id: any;

  constructor(private categoryService: CategoryService, private routerService: Router,private readonly route: ActivatedRoute) {
    this.Id = this.route.snapshot.params['id'];
  }

  form = new FormGroup({
    CategoryName: new FormControl<string>(''),
  });

  EditCategory() {
    var credentials = new CategoryEditDto();
    credentials.name = this.form.controls.CategoryName.value ?? '';
    credentials.id = this.Id

    this.categoryService.EditCategory(credentials).subscribe({
      next: () => {
        this.routerService.navigateByUrl('/dashboard/categories');
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
