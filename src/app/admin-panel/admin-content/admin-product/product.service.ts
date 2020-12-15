import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string;
  postProductUrl: string;
  postImageUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://ashrafayman96-001-site1.btempurl.com/api/products';
    this.postProductUrl = 'http://ashrafayman96-001-site1.btempurl.com/api/products/PostProduct';
    this.postImageUrl = 'http://ashrafayman96-001-site1.btempurl.com/api/products/PostImage';
  }
  async getProduct(): Promise<any> {
    return await this.http.get<Product[]>(this.baseUrl).toPromise();
  }
  async getProductById(id:number): Promise<any> {
    return await this.http.get<Product[]>(this.baseUrl + "/" + id).toPromise();
  }
  async saveProduct(newProduct: Product): Promise<any> {
    return await this.http.post<Product>(this.postProductUrl, newProduct).toPromise();
  }
  async saveImages(files: FormData): Promise<any> {
    return await this.http.post(this.postImageUrl, files).toPromise();
  }
  async deleteProduct(id: Number): Promise<any> {
    return await this.http.delete(this.baseUrl + "/" + id).toPromise();
  }
  async editProduct(editedProduct: Product, id: number): Promise<any> {
    return await this.http.put<Product>(this.baseUrl + "/" + id, editedProduct).toPromise();
  }
}
