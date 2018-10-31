import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AssetService } from './assets/asset.service';
import { AssetItemComponent } from './assets/asset-list/asset-item/asset-item.component';
import { ContactComponent } from './contact/contact.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import { FilterComponent } from './core/filter/filter.component';
import { LoginComponent } from './auth/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateAssetComponent } from './assets/create-asset/create-asset.component';
import { AssetDetailComponent } from './assets/asset-detail/asset-detail.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { CarouselComponent } from './core/carousel/carousel.component';
import {ShortDatePipe} from './core/pipes/short-date.pipe';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import {AdminRoutingModule} from './admin-page/admin-routing.module';
import { AssetsTableComponent } from './core/assets-table/assets-table.component';
import {HebrewPipe} from './core/pipes/hebrew.pipe';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './core/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AssetItemComponent,
    ContactComponent,
    AssetListComponent,
    FilterComponent,
    LoginComponent,
    SignupComponent,
    AdminPageComponent,
    CreateAssetComponent,
    AssetDetailComponent,
    CarouselComponent,
    ShortDatePipe,
    ContactFormComponent,
    AssetsTableComponent,
    HebrewPipe,
    UsersComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTeyQ24rK9mGlPyUL0tU-C97l_nyVysiw'
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [AssetService],
  bootstrap: [AppComponent]
})
export class AppModule {}
