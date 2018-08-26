import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ForSaleComponent } from './asset/for-sale/for-sale.component';
import { ForRentComponent } from './asset/for-rent/for-rent.component';

import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';

import { AssetService } from './asset/asset.service';
import { AssetItemComponent } from './asset/asset-item/asset-item.component';
import { ContactComponent } from './contact/contact.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForSaleComponent,
    ForRentComponent,
    AssetItemComponent,
    ContactComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTeyQ24rK9mGlPyUL0tU-C97l_nyVysiw'
    })
  ],
  providers: [AssetService],
  bootstrap: [AppComponent]
})
export class AppModule {}
