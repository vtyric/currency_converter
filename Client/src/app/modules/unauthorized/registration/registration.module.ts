import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RegistrationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: RegistrationComponent }]),
        ReactiveFormsModule
    ]
})
export class RegistrationModule {
}
