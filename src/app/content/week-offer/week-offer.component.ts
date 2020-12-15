import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-week-offer',
  templateUrl: './week-offer.component.html',
  styleUrls: ['./week-offer.component.scss']
})
export class WeekOfferComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('h2').on("touchstart",function (){
  //simply starts listening for touchstart - allows for hover state on touch devices
});
  }

}
