import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewsComponent } from './create-news.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CreateNewsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CreateNewsComponent}]),
    ReactiveFormsModule,
  ]
})
export class CreateNewsModule {
}
