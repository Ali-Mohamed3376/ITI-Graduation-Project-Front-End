
//import * as cuid from "cuid";
export interface CartProduct{
    id:number,
    name:string,
    price:number,
    image:string,
    quantity:number,
}

export class AddProductToCart{
    
    productId: number=0;
    quantity: number=0;
      
}
export class EditProductQuantity{
    
    productId: number=0;
    quantity: number=0;
      
}

// export interface Cart{
//     id:string,
//     products:CartProduct[]
// }


// export class Cart implements Cart{
//     id=cuid();
//     products:CartProduct[]=[];
// }