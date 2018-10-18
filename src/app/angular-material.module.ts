import {NgModule} from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule,
  MatProgressSpinnerModule, MatSelectModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule {}
