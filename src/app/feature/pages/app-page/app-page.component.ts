import {Component, OnInit} from "@angular/core";
import {part1} from "../../../questions/questions";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ROUTE_PARAMETER_CURRENT_STEP} from "./routing-params";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-app-page",
  templateUrl: "./app-page.component.html",
  styleUrls: ["./app-page.component.scss"]
})
export class AppPageComponent implements OnInit {

  public questionary = part1;
  public currentStep$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.currentStep$ = this.activatedRoute.paramMap.pipe(map(params => +params.get(ROUTE_PARAMETER_CURRENT_STEP)));
  }


  public stepChanged(step: number) {
    this.router.navigate(["../", step]);
  }

}
