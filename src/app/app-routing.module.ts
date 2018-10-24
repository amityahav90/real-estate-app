import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ContactComponent} from './contact/contact.component';
import {AssetListComponent} from './assets/asset-list/asset-list.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {CreateAssetComponent} from './assets/create-asset/create-asset.component';
import {AssetDetailComponent} from './assets/asset-detail/asset-detail.component';
import {ContactFormComponent} from './contact/contact-form/contact-form.component';
import {AdminPageComponent} from './admin-page/admin-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'assets/create', component: CreateAssetComponent },
  { path: 'assets/detail/:id', component: AssetDetailComponent },
  { path: 'assets/:type', component: AssetListComponent, runGuardsAndResolvers: 'paramsChange' },
  { path: 'contact', component: ContactComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'send', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
