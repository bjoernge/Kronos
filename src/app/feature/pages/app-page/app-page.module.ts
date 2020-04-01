import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AppPageRoutingModule} from "./app-page-routing.module";
import {AppPageComponent} from "./app-page.component";
import {QuestionsModule} from "../../questions/questions.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppPageComponent
  ],
  exports: [
    AppPageComponent
  ],
  imports: [
    CommonModule,
    AppPageRoutingModule,
    QuestionsModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
  ]
})
export class AppPageModule {
}
