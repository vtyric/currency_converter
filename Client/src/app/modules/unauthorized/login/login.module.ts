import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        ReactiveFormsModule,
    ],
    exports: []
})
export class LoginModule {
}
