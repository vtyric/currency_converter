import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from "./breadcrumbs.component";
import { RouterModule } from "@angular/router";
import { BreadcrumbService } from "./services/breadcrumb.service";


@NgModule({
  providers: [
    BreadcrumbService,
  ],
  declarations: [
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbsComponent,
  ]
})
export class BreadcrumbsModule {
}
