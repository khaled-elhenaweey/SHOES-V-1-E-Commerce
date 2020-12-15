import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 200;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }



  ngOnInit(): void { }
  next(): void {
    const items = $('.carousel-item');
    for (let i = 0, length = items.length; i < length; i += 1) {
      const element = items[i];
      if ($(element).hasClass('active')) {
        if (i === length - 1) {
          const first = items[0];
          $(element).removeClass('active');
          $(first).addClass('active');
          break;
        } else {
          const nextElement = items[i + 1];
          $(element).removeClass('active');
          $(nextElement).addClass('active');
          break;
        }
      }
    }
  }

  prev(): void {
    const items = $('.carousel-item');
    for (let i = 0, length = items.length; i < length; i += 1) {
      const element = items[i];
      if ($(element).hasClass('active')) {
        if (i === 0) {
          const last = items[length - 1];
          $(element).removeClass('active');
          $(last).addClass('active');
          break;
        }
        else {
          const prevElement = items[i - 1];
          $(element).removeClass('active');
          $(prevElement).addClass('active');
          break;
        }
      }
    }
  }

}


