import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyService } from './modules/shared/shared/services/currency.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './modules/shared/shared/services/user.service';
import { RedirectRoleGuard } from './guards/redirect-role.guard';
import { NewsRequestService } from './modules/shared/news/services/news-request.service';
import { AuthentificationModule } from './modules/shared/authentification/authentification.module';
import { NewsService } from './modules/shared/news/services/news.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthentificationModule,
        NgbModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('accessToken'),
                allowedDomains: ['localhost:7262']
            }
        })
    ],
    providers: [
        CurrencyService,
        AuthGuard,
        RedirectRoleGuard,
        UserService,
        NewsRequestService,
        NewsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
