import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewsComponent } from './create-news.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    CreateNewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CreateNewsComponent}]),
  ]
})
export class CreateNewsModule {
}
