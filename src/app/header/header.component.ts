import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").addClass("active");
      });

      $("#sidebarCollapseX").on("click", function() {
        $("#sidebar").removeClass("active");
      });

      $("#sidebarCollapse").on("click", function() {
        if ($("#sidebar").hasClass("active")) {
          $(".overlay").addClass("visible");
          console.log("it's working!");
        }
      });

      $("#sidebarCollapseX").on("click", function() {
        $(".overlay").removeClass("visible");
      });
      $("#cart").on("click", function() {
        $(".shopping-cart").fadeToggle( "fast");
      });

    });


  }

}
