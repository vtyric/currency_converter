import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedLayoutComponent } from './unauthorized-layout/unauthorized-layout.component';


@NgModule({
  declarations: [
    UnauthorizedLayoutComponent,
  ],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
  ],
  providers: [],
})
export class UnauthorizedModule {
}
