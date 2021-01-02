import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../admin-panel/admin-content/admin-product/product.service';
import { Product } from './../../admin-panel/admin-content/admin-product/Product';
import * as $ from 'jquery';
import 'owl.carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-best-seller2',
  templateUrl: './best-seller2.component.html',
  styleUrls: ['./best-seller2.component.scss']
})
export class BestSeller2Component implements OnInit {
  products: Product[];
  filesToConvert : any[] ;
  constructor(private productSerivce: ProductService) { }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    dotsData: true,
    dotsEach: true,
    navSpeed: 4000,
    fluidSpeed: true,
    smartSpeed: 2000,
    // navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1

      },
      400: {
        items: 1
      },
      540: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3,
      },
      1223: {
        items: 4,
      },
      2560: {
        items: 6,
      }
    },
    // nav: true
  };
  ngOnInit(): void {
    this.getNewArrival();
  }
  async getNewArrival(): Promise<any> {
    let res = await this.productSerivce.getNewArrival();
    this.filesToConvert=res.image;
    console.log(res);
    this.products = res;
  }
}
