import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PersonalAreaPageComponent } from './pages/personal-area-page/personal-area-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { NewsDescriptionPageComponent } from './pages/news-description-page/news-description-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { PredictionsPageComponent } from './pages/predictions-page/predictions-page.component';
import { PredictionPageComponent } from './pages/prediction-page/prediction-page.component';
import { ConverterElementComponent } from './components/converter-element/converter-element.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NumericSeparatorPipe } from './pipes/numeric-separator.pipe';
import { CurrencyService } from "./services/currency.service";
import { HttpClientModule } from "@angular/common/http";
import { CurrencyMainButtonsComponent } from './components/converter-top-panel/currency-main-buttons.component';
import { AngularYandexMapsModule } from "angular8-yandex-maps";
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    MainPageComponent,
    PersonalAreaPageComponent,
    MainLayoutComponent,
    ErrorPageComponent,
    NewsPageComponent,
    NewsDescriptionPageComponent,
    MapPageComponent,
    PredictionsPageComponent,
    PredictionPageComponent,
    ConverterElementComponent,
    NumericSeparatorPipe,
    CurrencyMainButtonsComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularYandexMapsModule
  ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
