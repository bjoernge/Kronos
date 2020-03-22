import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page/main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {AboutPageComponent} from './about-page/about-page.component';
import {AppPageComponent} from './app-page/app-page.component';
import {QuestionsModule} from '../questions/questions.module';
import {AppBarModule} from '../app-bar/app-bar.module';
import {MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    MainPageComponent,
    AboutPageComponent,
    AppPageComponent
  ],
  imports: [
    SharedModule,
    QuestionsModule,
    AppBarModule,
    MatToolbarModule
  ],
  exports: [
    MainPageComponent,
    AboutPageComponent,
    AppPageComponent
  ]
})
export class PagesModule {
}
