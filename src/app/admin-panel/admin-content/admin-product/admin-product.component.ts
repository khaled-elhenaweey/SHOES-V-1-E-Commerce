import { CategoryServiceService } from './../admin-category/category-service.service';
import { ProductService } from './product.service';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from './Product';
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
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit, OnDestroy {
  imageSource;
  imageUrl: string = "../../../../assets/default-image.jpg";
  urls = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  uploadForm: FormGroup;
  file: string;
  myFile: string[] = [];
  data: Array<Object> = [{ id: 0, name: "name1" }, { id: 1, name: "name2" }];

  // tslint:disable-next-line: typedef
  productId: number;
  productName: string;
  productPrice: number;
  qty: number;
  description: string;
  rate: number | null;
  categoryId: number | null;
  products: Product[];
  image : string[];
  selectedValue :number = 0;
  categories: Category[];
  categorySelected: number;
  modifiedValue: number;
  public message: string;
  public progress: number;
  filesToUpload: File[] ;
  filesToConvert : any[] ;
  formData = new FormData();
  imageName: string;
  fileType:string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private productSerivce: ProductService, private http: HttpClient, private CategoryService: CategoryServiceService,private sanitizer: DomSanitizer) {

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

  public uploadFile = async (files) => {
    if (files.length === 0) {
      return;
    }
    console.log(files);
    this.filesToUpload =files;
    Array.from(this.filesToUpload).map((file, index) => {
      return this.formData.append('files', file);
    });
    this.handleFileInput(files);
  }


  handleFileInput(files) {
    if (files) {
      var fileAmount = files.length;
      for (let i = 0; i < fileAmount; i++) {
        var render = new FileReader();

        render.onload = (event: any) => {
          this.urls.push(event.target.result);
        };
        render.readAsDataURL(files[i]);
        this.imageName = files[i].name;
      }
    }
  }
  onCategorySelect(event) {
    this.customFunction(event.target.value);
  }
  customFunction(val: any) {

    this.categoryId = val;
    console.log(this.categoryId);
  }

  onFileSelect(event) {
    for (let i = 0; i < (event.target.files.length); i++) {
      this.file = event.target.files[i];
      this.myFile.push(event.target.files[i]);

    }
    console.log(this.myFile);
  }
  deleteImage(indexElement): void {
   this.urls.splice(indexElement, 1);

}
  deleteImageInEdit(indexElement): void {
  this.filesToConvert.splice(indexElement, 1);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async saveProduct(): Promise<void> {
    var list = await this.http.post('http://ashrafayman85-001-site1.dtempurl.com/api/products/PostImage',this.formData).toPromise();

    let productName = this.productName;
    let productId = 0;
    let productPrice = this.productPrice;
    let qty = this.qty;
    let description = this.description;
    let categoryId = Number(this.categoryId);
    let image = this.image;
    let fileType = this.fileType;
    let newProduct = new Product(productId, productName, productPrice, qty, description, categoryId, image,fileType );
    newProduct.imgsList = list as number[];
    console.log(newProduct);
    let resualt = await this.productSerivce.saveProduct(newProduct);

    if (resualt == true) {
      Swal.fire(
        'Product Saved Successfully',
        '',
        'success'
      );
      this.productId = 0;
      this.resetControls();
      this.reload();
    } else {
      Swal.fire(
        'Failed to Save Product',
        '',
        'error'
      );
      console.log(resualt);
    }
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

      // this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${resualt.images[i]}`);
      //this.imageSource =this.sanitizer.bypassSecurityTrustUrl(resualt.images[0]);
      //this.filesToConvert.push(this.imageSource)
      $("#save").hide();
      $("#edit").show();
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
    $("#save").hide();
    $("#edit").show();
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
    let editedProduct = new Product(productId, productName, productPrice, qty, description, categoryId,image,fileType);
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
      $("#edit").hide();
      $("#save").show();
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
