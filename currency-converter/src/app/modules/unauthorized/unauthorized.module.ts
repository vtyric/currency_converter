import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedLayoutComponent } from './shared/unauthorized-layout/unauthorized-layout.component';


@NgModule({
  declarations: [
    UnauthorizedLayoutComponent,
  ],
  imports: [
    CommonModule,
    UnauthorizedRoutingModule,
  ],
  providers: [],
  exports: [],
})
export class UnauthorizedModule {
}
