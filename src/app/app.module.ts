import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { CarouselComponent } from './content/carousel/carousel.component';
import { CategoryCardComponent } from './content/category-card/category-card.component';
import { BestSellerComponent } from './content/best-seller/best-seller.component';
import { BestSeller2Component } from './content/best-seller2/best-seller2.component';
import { WeekOfferComponent } from './content/week-offer/week-offer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsHeadComponent } from './about-us/about-us-head/about-us-head.component';
import { AboutUsBodyComponent } from './about-us/about-us-body/about-us-body.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsHeadComponent } from './contact-us/contact-us-head/contact-us-head.component';
import { ContactUsInfoComponent } from './contact-us/contact-us-info/contact-us-info.component';
import { ContactUsFormComponent } from './contact-us/contact-us-form/contact-us-form.component';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line: quotemark
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminMainComponent } from './admin-panel/admin-main/admin-main.component';
import { AdminContentComponent } from './admin-panel/admin-content/admin-content.component';
import { AdminProductComponent } from './admin-panel/admin-content/admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-panel/admin-content/admin-category/admin-category.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxPopper } from 'angular-popper';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ScrollService } from "../app/_services/scroll.service";
import { UserProductComponent } from './user-product/user-product.component';
import { UserProductMainComponent } from './user-product/user-product-main/user-product-main.component';
import { UserProductCommentComponent } from './user-product/user-product-comment/user-product-comment.component';
import { UserProductCarouselComponent } from './user-product/user-product-carousel/user-product-carousel.component';
import { UserProductListComponent } from './user-product-list/user-product-list.component';
import { AdminOfferComponent } from './admin-panel/admin-content/admin-offer/admin-offer.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginPageComponent } from './login-signup/login-page/login-page.component';
import { SignupPageComponent } from './login-signup/signup-page/signup-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    CarouselComponent,
    CategoryCardComponent,
    BestSellerComponent,
    BestSeller2Component,
    WeekOfferComponent,
    AboutUsComponent,
    AboutUsHeadComponent,
    AboutUsBodyComponent,
    ContactUsComponent,
    ContactUsHeadComponent,
    ContactUsInfoComponent,
    ContactUsFormComponent,
    PageNotFoundComponent,
    AdminPanelComponent,
    AdminMainComponent,
    AdminContentComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    UserPanelComponent,
    UserProductComponent,
    UserProductMainComponent,
    UserProductCommentComponent,
    UserProductCarouselComponent,
    UserProductListComponent,
    AdminOfferComponent,
    LoginSignupComponent,
    LoginPageComponent,
    SignupPageComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    OwlModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule.forRoot(),
    NgxPopper


  ],
  providers: [ScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
