import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from './admin-page.component';
import {SignupComponent} from '../auth/signup/signup.component';
import {NgModule} from '@angular/core';
import {AssetsTableComponent} from '../core/assets-table/assets-table.component';
import {CreateAssetComponent} from '../assets/create-asset/create-asset.component';
import {UsersComponent} from '../users/users.component';
import {MessagesComponent} from '../core/messages/messages.component';
import {ReviewsComponent} from '../core/reviews/reviews.component';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminPageComponent, children: [
      { path: 'signup', component: SignupComponent },
      { path: 'signup/:id', component: SignupComponent },
      { path: 'assets/create', component: CreateAssetComponent },
      { path: 'assets/:type', component: AssetsTableComponent, runGuardsAndResolvers: 'paramsChange' },
      { path: 'users', component: UsersComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'reviews', component: ReviewsComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
