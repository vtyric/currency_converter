import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedRoutingModule } from './authorized-routing.module';
import { AuthorizedLayoutComponent } from './authorized-layout/authorized-layout.component';


@NgModule({
    declarations: [
        AuthorizedLayoutComponent
    ],
    imports: [
        CommonModule,
        AuthorizedRoutingModule,
    ]
})
export class AuthorizedModule {
}
