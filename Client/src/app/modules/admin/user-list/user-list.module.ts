import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { RouterModule } from "@angular/router";
import { UserItemComponent } from './components/user-item/user-item.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../../shared/pipes/pipes.module";


@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserListComponent}]),
    ReactiveFormsModule,
    PipesModule,
  ]
})
export class UserListModule {
}
