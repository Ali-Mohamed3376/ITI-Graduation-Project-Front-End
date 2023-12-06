import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productOperation } from 'src/app/services/Dashboard/productOperation.service';
import { ProductService } from 'src/app/services/Product/product.service';


@Component({
  selector: 'app-edit-image-pop-up',
  templateUrl: './edit-image-pop-up.component.html',
  styleUrls: ['./edit-image-pop-up.component.css']
})
export class EditImagePopUpComponent {
  constructor(
    public productService:productOperation,
    public dialogRef: MatDialogRef<EditImagePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  deleteImage(imageUrl: string): void {
    console.log('Clicked deleteImage:', imageUrl);


    // Remove the image URL from the storedImages array
    this.data.storedImages = this.data.storedImages.filter((url: string) => url !== imageUrl);

    console.log('Modified storedImages:', this.data.storedImages);
  }
  deleteOldImage(imageUrl: any): void {
    console.log('Clicked deleteOldImage:', imageUrl);

    // Remove the image URL from the oldPropertyImages array
    this.data.oldPropertyImages = this.data.oldPropertyImages.filter((url: string) => url !== imageUrl);

    console.log('Modified oldPropertyImages:', this.data.oldPropertyImages);
  }


  uploadPhotosV2(e:Event){
    const input= e.target as HTMLInputElement  ;
   const newImages=Array.prototype.slice.call(input.files) as File[]; 
   console.log(newImages);
   this.productService.Upload2(newImages).subscribe((responses :any)=>{
    console.log(responses);
    this.data.storedImages=responses;
    })}
  


    //old version that encode the image as base64 it convert image to string and save that string in the database 
    //it doesnt send it to backend to save it in images file like V2 above
  uploadPhotosV1(e: Event): void {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);

    if (files.length === 0) {
      return;
    }

    const filesToUpload = files;
    console.log('filesToUpload',filesToUpload);

    filesToUpload.forEach((file) => {
      // Perform the necessary image upload logic and add the image URL to the storedImages array
      // Example code (replace with your actual logic):
      const reader = new FileReader();
      reader.onload = (event: any) => {
        console.log(event.target.result);
        console.log('before',this.data.storedImages)
        this.data.storedImages.push(event.target.result);
        console.log('after',this.data.storedImages)

      };
      reader.readAsDataURL(file);
    });

    // Reset the input element's value to clear the selected images
    input.value = '';
  }

  saveChanges(): void {
    // Pass the updated storedImages and oldPropertyImages arrays back to the parent component or service
    this.dialogRef.close({ storedImages: this.data.storedImages, oldPropertyImages: this.data.oldPropertyImages });
  }

}

