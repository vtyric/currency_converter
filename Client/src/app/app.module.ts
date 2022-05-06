import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyService } from './modules/shared/shared/services/currency.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./modules/shared/authentification/guards/auth.guard";
import { AuthService } from "./modules/shared/authentification/services/auth.service";
import { UserService } from "./modules/shared/shared/services/user.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['localhost:7262']
      }
    })
  ],
  providers: [
    CurrencyService,
    AuthService,
    AuthGuard,
    UserService,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
