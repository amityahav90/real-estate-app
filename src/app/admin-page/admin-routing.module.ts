import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {SignupComponent} from '../auth/signup/signup.component';
import {NgModule} from '@angular/core';
import {AssetsTableComponent} from '../core/assets-table/assets-table.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminPageComponent, children: [
      { path: 'signup', component: SignupComponent },
      { path: 'assets', component: AssetsTableComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
