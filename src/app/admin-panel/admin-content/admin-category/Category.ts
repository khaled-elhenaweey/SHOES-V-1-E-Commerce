export class Category {
  CategoryName: string;
  CategoryId: number;
  constructor(public categoryId: number, public categoryName: string){
    this.CategoryName = categoryName;
    this.CategoryId = categoryId;
  }
}
