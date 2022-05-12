import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateNewsComponent } from './update-news.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    UpdateNewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UpdateNewsComponent}])
  ]
})
export class UpdateNewsModule {
}
