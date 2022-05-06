import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { RouterModule } from "@angular/router";
import { UserItemComponent } from './components/user-item/user-item.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchFilterPipe } from "../../shared/shared/pipes/search-filter.pipe";


@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: UserListComponent}]),
    ReactiveFormsModule
  ]
})
export class UserListModule {
}
