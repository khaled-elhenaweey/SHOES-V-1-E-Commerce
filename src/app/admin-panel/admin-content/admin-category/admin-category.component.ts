import { CategoryServiceService } from './category-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Category } from './Category';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
declare var $: any;
declare var jQuery: any;
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
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
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  CategoryName: string;
  CategoryId = 0;
  categories: Category[];

  constructor(private categorySerivce: CategoryServiceService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      autoWidth: true,
    };
    this.http.get<Category[]>('http://localhost:52934/api/Categories')
      .subscribe(categories => {
        this.categories = categories;
        this.dtTrigger.next();
      });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async saveCategory(): Promise<void> {
    let categoryName = this.CategoryName;
    let categoryId = 0;
    let newCategory = new Category(categoryId, categoryName);
    let resualt = await this.categorySerivce.saveCategory(newCategory);
    if (resualt == true) {
      Swal.fire(
        'Category Saved Successfully',
        '',
        'success'
      );
      this.CategoryId = 0;
      this.resetControls();
      this.reload();
    } else {
      Swal.fire(
        'Failed to Save Category',
        '',
        'error'
      );
      console.log(resualt);
    }
  }

  editCategory(category: Category): void {
    this.CategoryName = category.categoryName;
    this.CategoryId = category.categoryId;
    $("#save").hide();
    $("#edit").show();
    }
  async saveAfterEditCategory(): Promise<void> {
    let categoryName = this.CategoryName;
    let categoryId = this.CategoryId;
    let editedCategory = new Category(categoryId, categoryName);
    let resualt = await this.categorySerivce.editCategory(editedCategory, editedCategory.CategoryId);
    if (resualt == true) {
      Swal.fire(
        'Category Saved Successfully',
        '',
        'success'
      );
      this.CategoryId = 0;
      $("#edit").hide();
      $("#save").show();
      this.resetControls();
      this.reload();
    } else {
      Swal.fire(
        'Failed to Save Category',
        '',
        'error'
      );
      console.log(resualt);
    }
  }

  async deleteCategory(id: Number): Promise<void> {
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
        await this.categorySerivce.deleteCategory(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        this.reload();
      }
    });

}

  async getCategories(): Promise<any> {
    let resualt = await this.categorySerivce.getCategories();
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
    this.CategoryName = "";
    this.CategoryId = 0;
  }

  async reload(): Promise<void> {
    this.categories = await this.categorySerivce.getCategories();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
