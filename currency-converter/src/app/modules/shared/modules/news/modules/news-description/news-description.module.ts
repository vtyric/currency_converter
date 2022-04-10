import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsDescriptionComponent } from './news-description.component';


@NgModule({
  declarations: [
    NewsDescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: NewsDescriptionComponent}]),
  ],

})
export class NewsDescriptionModule {}
