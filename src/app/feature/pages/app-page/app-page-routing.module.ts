import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ROUTE_PARAMETER_CURRENT_STEP} from "./routing-params";
import {AppPageComponent} from "./app-page.component";


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "0"
  },
  {
    path: `:${ROUTE_PARAMETER_CURRENT_STEP}`,
    component: AppPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPageRoutingModule {
}
