import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsConjugationPipe, SearchFilterPipe } from "./index";

@NgModule({
  declarations: [
    CommentsConjugationPipe,
    SearchFilterPipe,
  ],
  exports: [
    SearchFilterPipe,
    CommentsConjugationPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
