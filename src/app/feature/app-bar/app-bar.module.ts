import {NgModule} from '@angular/core';
import {AppBarComponent} from './app-bar.component';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppBarComponent
  ],
  imports: [
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [AppBarComponent]
})
export class AppBarModule {
}
