import { CategoryServiceService } from './../admin-category/category-service.service';
import { ProductService } from './../admin-product/product.service';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from './../admin-product/Product';
import { Category } from '../admin-category/Category';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;
declare var jQuery: any;
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
  $($.fn.dataTable.tables(true)).DataTable()
  .columns.adjust();
})();
@Component({
  selector: 'app-admin-offer',
  templateUrl: './admin-offer.component.html',
  styleUrls: ['./admin-offer.component.scss']
})
export class AdminOfferComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  uploadForm: FormGroup;

  productId: number;
  productName: string;
  productPrice: number;
  qty: number;
  description: string;
  rate: number | null;
  categoryId: number | null;
  products: Product[];
  categories: Category[];
  urls = [];
  filesToConvert : any[] ;
  fileType:string;
  image : string[];
  public message: string;
  public progress: number;
  formData = new FormData();
  offerPrice:number;
  inOffer:boolean;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private productSerivce: ProductService, private CategoryService: CategoryServiceService, private http: HttpClient,private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,

    };
    this.http.get<any>('http://ashrafayman85-001-site1.dtempurl.com/api/products')
      .subscribe(products => {
        this.products = products;
        this.dtTrigger.next();
      });
    this.http.get<Category[]>('http://ashrafayman85-001-site1.dtempurl.com/api/Categories')
      .subscribe(categories => {
        this.categories = categories;
      });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async getProductbyid(product: Product){
    let resualt = await this.productSerivce.getProductById(product.productId);
    this.productName = product.productName;
    this.productId = product.productId;
    this.productPrice = product.productPrice;
    this.qty = product.qty;
    this.description = product.description;
    this.categoryId = product.categoryId;
    this.filesToConvert = resualt.images;
    console.log(resualt);
    console.log( product.productId);

  }
  editProduct(product: Product): void {
    this.productName = product.productName;
    this.productId = product.productId;
    this.productPrice = product.productPrice;
    this.qty = product.qty;
    this.description = product.description;
    this.categoryId = product.categoryId;
  }
  async saveAfterEditProduct(): Promise<void> {
    var list = await this.http.post('http://ashrafayman85-001-site1.dtempurl.com/api/products/PostImage',this.formData).toPromise();
    let productName = this.productName;
    let productId = this.productId;
    let productPrice = this.productPrice;
    let qty = this.qty;
    let description = this.description;
    let categoryId = Number(this.categoryId);
    let image = this.image;
    let fileType = this.fileType;
    let offerPrice=this.offerPrice;
    let inOffer=this.inOffer;
    let editedProduct = new Product(productId, productName, productPrice, qty, description, categoryId,image,fileType,offerPrice,inOffer);
    editedProduct.imgsList = list as number[];
    console.log(editedProduct);

    let resualt = await this.productSerivce.editProduct(editedProduct, editedProduct.productId);
    if (resualt == true) {
      Swal.fire(
        'Product Saved Successfully',
        '',
        'success'
      );
      this.productId = 0;
      this.resetControls();
      this.reload();

      //
    } else {
      Swal.fire(
        'Failed to Save Product',
        '',
        'error'
      );
      console.log(resualt);
    }
  }
  async deleteProduct(id: Number): Promise<void> {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.productSerivce.deleteProduct(id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.reload();
        }
      });
    }
  async getProduct(): Promise<any> {
    let resualt = await this.productSerivce.getProduct();
    resualt.subscribe(
      data => {
        console.log(data);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
  resetControls(): void {
    this.productName = "";
    this.productId = 0;
    this.productPrice = null;
    this.qty = null ;
    this.description = "";
    this.categoryId = null ;
    this.urls = [];
  }
  async reload(): Promise<void> {
    this.products = await this.productSerivce.getProduct();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
