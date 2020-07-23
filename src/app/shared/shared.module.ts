import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {KeysPipe} from "./keys.pipe";
import {PrefixPipe} from "./prefix.pipe";

@NgModule({
  declarations: [KeysPipe, PrefixPipe],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    KeysPipe,
    PrefixPipe
  ]
})
export class SharedModule {
}
