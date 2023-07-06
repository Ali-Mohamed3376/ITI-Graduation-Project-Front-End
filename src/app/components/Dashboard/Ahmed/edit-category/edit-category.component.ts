import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryEditDto } from 'src/app/Dtos/Dashboard/CategoryEditDto';
import { CategoryService } from 'src/app/services/Dashboard/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  Data :any
  Name :any 
  constructor(
    private categoryService: CategoryService, 
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Id : any }
    ){
      this.fetchCategory(data.Id)
  }

  public fetchCategory(id :any){
    this.categoryService.GetById(id).subscribe({
      next: (data) =>{
        this.Data = data;
        this.Name = this.Data.name
      }
    })
  }

  // form = new FormGroup({
  //   CategoryName: new FormControl<string>(''),
  // });

  EditCategory() {
    var credentials = new CategoryEditDto();
    credentials.name = this.Name
    credentials.id = this.data.Id

    this.categoryService.EditCategory(credentials).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
