import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { HeaderComponent } from './header.component';
import { MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatInputModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {
}
