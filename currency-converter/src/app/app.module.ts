import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {PersonalAreaPageComponent} from './pages/personal-area-page/personal-area-page.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {NewsPageComponent} from './pages/news-page/news-page.component';
import {NewsDescriptionPageComponent} from './pages/news-description-page/news-description-page.component';
import {MapPageComponent} from './pages/map-page/map-page.component';
import {PredictionsPageComponent} from './pages/predictions-page/predictions-page.component';
import {PredictionPageComponent} from './pages/prediction-page/prediction-page.component';
import {ConverterElementComponent} from './components/converter-element/converter-element.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NumericSeparatorPipe} from './pipes/numeric-separator.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
