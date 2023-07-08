import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/Dashboard/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ToastrService ,IndividualConfig} from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  Categories : any

  constructor(private toastr: ToastrService,private readonly CategoryService: CategoryService, private dialog : MatDialog) {
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
    // if (confirm("Are you sure you want to delete this Category?")) {
    //   this.CategoryService.DeleteCategory(id).subscribe({
    //     next: () => {
    //       this.fetchCategory()
       
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   })
    // }

    const confirmed = this.toastr.show(
      `
        <div>
          <div>Are you sure you want to delete this Category?</div>
          <div>
            <button type="button" class="btn btn-danger" id="toastr-yes-button">Yes</button>
            <button type="button" class="btn btn-secondary" id="toastr-no-button">No</button>
          </div>
        </div>
      `,
      'Confirm',
      {
        enableHtml: true, // enable HTML in the message
        closeButton: true, // show the close button
        positionClass: 'toast-top-right', // set the position
        tapToDismiss: false, // disable tapping to dismiss
        onActivateTick: true, // enable the onActivateTick event
      },
      'confirm'
    );

    const yesButton = document.getElementById('toastr-yes-button');
    if (yesButton) {
      yesButton.addEventListener('click', () => {
        this.toastr.clear(confirmed.toastId);
        this.CategoryService.DeleteCategory(id).subscribe({
          next: () => {
            this.fetchCategory();
          },
          error: (error) => {
            console.log(error);
          }
        });
      });
    }
    
    const noButton = document.getElementById('toastr-no-button');
    if (noButton) {
      noButton.addEventListener('click', () => {
        this.toastr.clear(confirmed.toastId);
      });
  }
  }


  openAddPopup() {
    this.dialog.open(AddCategoryComponent).addPanelClass("popupComponent");
  }

  openEditPopup(id : any) {
    this.dialog.open(EditCategoryComponent, {data:{Id : id}}).addPanelClass("popupComponent");
  }
}
