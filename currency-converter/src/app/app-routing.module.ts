import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegistrationPageComponent } from "./pages/registration-page/registration-page.component";
import { ErrorPageComponent } from "./pages/error-page/error-page.component";
import { NewsPageComponent } from "./pages/news-page/news-page.component";
import { NewsDescriptionPageComponent } from "./pages/news-description-page/news-description-page.component";
import { MapPageComponent } from "./pages/map-page/map-page.component";
import { PredictionsPageComponent } from "./pages/predictions-page/predictions-page.component";
import { PredictionPageComponent } from "./pages/prediction-page/prediction-page.component";

const routes: Routes = [
  /** Роуты давай писать в таком формате, так читабельнее и легче их воспринимать */
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'reg',
        component: RegistrationPageComponent
      },
      {
        path: 'news',
        component: NewsPageComponent
      },
      {
        path: 'news/:id',
        component: NewsDescriptionPageComponent
      },
      {
        path: 'map',
        component: MapPageComponent
      },
      {
        path: 'predictions',
        component: PredictionsPageComponent
      },
      {
        path: 'predictions/:id',
        component: PredictionPageComponent
      },
      {
        path: '**',
        component: ErrorPageComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
