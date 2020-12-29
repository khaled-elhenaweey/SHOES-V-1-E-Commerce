import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../admin-panel/admin-content/admin-product/product.service';
import { Product } from './../../admin-panel/admin-content/admin-product/Product';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-week-offer',
  templateUrl: './week-offer.component.html',
  styleUrls: ['./week-offer.component.scss']
})
export class WeekOfferComponent implements OnInit {
  products: Product[];
  constructor(private productSerivce: ProductService) { }

  ngOnInit(): void {
    this.getOffers();
    $('h2').on("touchstart",function (){
  //simply starts listening for touchstart - allows for hover state on touch devices
});
  }
  async getOffers(): Promise<any> {
    let resualt = await this.productSerivce.getOffers();
    resualt.subscribe(
      data => {
        this.products=data;
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}
