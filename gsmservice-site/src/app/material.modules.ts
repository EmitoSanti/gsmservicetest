import {NgModule} from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class CustomMaterialModule {}
