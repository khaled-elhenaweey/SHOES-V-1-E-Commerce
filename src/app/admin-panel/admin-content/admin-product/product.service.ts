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
  bestSellerUrl: string;
  newArrivalUrl: string;
  offersUrl: string;
  delOffersUrl:string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/products';
    this.postProductUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/products/PostProduct';
    this.postImageUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/products/PostImage';
    this.bestSellerUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/Products/bestproducts';
    this.newArrivalUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/Products/newproducts';
    this.offersUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/Products/CreateOffer';
    this.delOffersUrl = 'http://ashrafayman85-001-site1.dtempurl.com/api/Products/RemoveOffer';

  }
  async getProduct(): Promise<any> {
    return await this.http.get<Product[]>(this.baseUrl).toPromise();
  }
  async getBestSeller(): Promise<any> {
    console.log(this.bestSellerUrl);
    return await this.http.get<Product[]>(this.bestSellerUrl).toPromise();
  }
  async getNewArrival(): Promise<any> {
    console.log(this.newArrivalUrl);
    return await this.http.get<Product[]>(this.newArrivalUrl).toPromise();
  }
  async creatOffers(): Promise<any> {
    return await this.http.get<Product>(this.offersUrl).toPromise();
  }
  async deleteOffer(id: Number): Promise<any> {
    return await this.http.delete(this.delOffersUrl + "/" + id).toPromise();
  }
  async getProductById(id: number): Promise<any> {
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
