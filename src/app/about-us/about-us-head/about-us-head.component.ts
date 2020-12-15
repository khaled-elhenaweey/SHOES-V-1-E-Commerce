import { ScrollService } from './../../_services/scroll.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us-head',
  templateUrl: './about-us-head.component.html',
  styleUrls: ['./about-us-head.component.scss']
})
export class AboutUsHeadComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
  }
  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }
}
