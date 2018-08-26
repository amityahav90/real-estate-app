import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForSaleComponent } from './asset/for-sale/for-sale.component';
import {ContactComponent} from './contact/contact.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'sale', component: ForSaleComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
