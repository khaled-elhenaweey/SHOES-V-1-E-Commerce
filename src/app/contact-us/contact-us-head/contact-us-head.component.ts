import { ScrollService } from './../../_services/scroll.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us-head',
  templateUrl: './contact-us-head.component.html',
  styleUrls: ['./contact-us-head.component.scss']
})
export class ContactUsHeadComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
  }
  scrollToId(id: string) {
    console.log("element id : ", id);
    this.scrollService.scrollToElementById(id);
  }

}
