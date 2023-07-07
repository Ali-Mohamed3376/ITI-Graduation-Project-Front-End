import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { productOperation} from 'src/app/services/Dashboard/productOperation.service';
import{CategoryService} from 'src/app/services/Dashboard/category.service'
import{AddProductDto} from 'src/app/Dtos/Dashboard/AddProductDto';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
ImageUrls:string[]=[];
categories:any;
selectedCategory:number=0;
constructor(private productService:productOperation,private snackBar : MatSnackBar,private categoriesService:CategoryService,private router:Router){}

// form = new  FormGroup({
//   productName : new FormControl<string>(''),
//   price : new FormControl<number>(0),
//   description : new FormControl<string>(''),
//   image : new FormControl<any>(''),
//   model : new FormControl<string>(''),
//   discount : new FormControl<number>(0),
//   categories : new FormControl<any>(''),
// })
product: AddProductDto=new AddProductDto();
addProduct(productForm:NgForm):void{
  if(productForm.invalid)return;
  this.product.Name=this.product.Name.trim(),
  this.product.Price=+this.product.Price;
  this.product.Description=this.product.Description;
  this.product.Image=this.ImageUrls;

  this.product.Model=this.product.Model.trim();
  this.product.Discount=this.product.Discount;
  this.product.CategoryID=this.selectedCategory;
  this.productService.AddProduct(this.product).subscribe(
    {
      next:(data)=>{console.log(data);this.router.navigate(["dashboard/products"])},
      error:(err)=>{console.log(err)},
      complete:()=>{console.log("product adding success")}
    }
  )
}
ngOnInit(): void {
    this.categoriesService.GetAllCategories().subscribe({
      next:(data)=>{this.categories=data},
      error:(err)=>{console.log(err)}
    })
}

uploadPhotos(e:Event){
  const input= e.target as HTMLInputElement  ;
  const files=Array.prototype.slice.call(input.files) as File[];
   if(files.length===0)return;
  const uploadObservables=files.map((file)=>{
    return this.productService.Upload(file);
  });
 forkJoin(uploadObservables).subscribe((responses :any)=>{
  console.log(responses);
  this.ImageUrls=responses.map((response: any)=>response.url);
  console.log(this.ImageUrls);
  },
  (error)=>{console.log("error uploading photos:",error);
 
    } )  
  }
}
// uploadPhotos(e:Event)
// {
//   const input= e.target as HTMLInputElement  
  
//    this.imageService.Upload(input).subscribe({
//     next:(data)=>{
//       console.log(data);
//     },
//     error:(error)=>{
//       console.log(error)
//     }
//    });
//   };
 
// this.snackBar.open(error.error.message,"Close",{
//   duration:4000,
//   verticalposition:"top",


// openImagePopup():void{
//   const dialogRef=this.dialog.open(ImagePopupComponent,{
//     data:{imageUrls:this.ImageUrls},
//   });
//   dialogRef.afterClosed().subscribe((result)=>{
//     console.log('Dialog result :${result}');
  // })



  // AddProduct(){
  //   var credentials = new AddProductDto();

  //   credentials.Name = this.form.controls.productName.value ?? '';
  //   credentials.Description = this.form.controls.description.value ?? '';
  //   credentials.Image = this.ImageUrls?? '';
  //   credentials.Model = this.form.controls.model.value ?? '';
  //   credentials.Price = this.form.controls.price.value ?? 0;
  //   credentials.Discount = this.form.controls.discount.value ?? 0 ;
  //   credentials.CategoryID = this.form.controls.categories.value ?? 0 ;

  //   console.log(credentials)
  //   this.productService.AddProduct(credentials).subscribe({
  //     next(){
  //       console.log("done")
  //     }

