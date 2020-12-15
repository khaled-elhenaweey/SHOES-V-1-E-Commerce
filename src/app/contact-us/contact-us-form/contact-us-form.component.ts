import { Component, OnInit, NgModule } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  body: string ;
  subject: string ;
  name: string;
  email: string;
  constructor() { }

  ngOnInit(): void {
  }
  sendMail(): void {
    var email = "khaledelhenaweey@gmail.com";
    var link = 'mailto:' + email + "?subject=" + this.subject + "&body=" +"Name Is:  "+this.name + "     From:  "+ this.email + "     The Problem Is: "+ this.body ;
    $("#btnContactUs").attr("href", link);
    $("#btnContactUs").trigger("click");
  }

}
