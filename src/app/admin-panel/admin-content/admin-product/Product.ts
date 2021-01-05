import { Category } from '../admin-category/Category';

export class Product {
  productId: number;
  productName: string;
  productPrice: number;
  qty: number;
  description: string;
  rate: number | null;
  categoryId: number | null;
  category: Category;
  imgsList: number[];
  image:string[];
  fileType :string;
  offerPrice:number;
  inOffer :boolean;
  // tslint:disable-next-line: max-line-length
  constructor(public _productId: number,
     public _productName: string,
     public _productPrice: number,
     public _qty: number,
     public _description: string,
     public _categoryId: number,
     public _image: string[],
     public _fileType:string,
     public _offerPrice:number,
     public _inOffer:boolean
     ) 
     {
    this.productId = _productId;
    this.productName = _productName;
    this.qty = _qty;
    this.description = _description;
    // this.rate = _rate;
    this.categoryId = _categoryId;
    this.productPrice = _productPrice;
    this.image = _image;
    this.fileType = _fileType;
    this.offerPrice=_offerPrice;
    this.inOffer=_inOffer;
  }
}


// export interface Product {
//   productId: number;
//   productName: string;
//   productPrice: number | null;
//   qty: number | null;
//   description: string;
//   rate: number | null;
//   categoryId: number | null;
//   reviews: Reviews[];
//   category: Category;
//   images: Image[];
// }
