import {Component, OnInit} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {filter, first, map} from "rxjs/operators";
import {ROUTE_PARAMETER_CURRENT_QUESTIONARY, ROUTE_PARAMETER_CURRENT_STEP} from "./routing-params";
import {ActivatedRoute, Router} from "@angular/router";
import {Questionary, QuestionContainer} from "../../../models/questions/questionContainer";
import {questions} from "../../../questions/questions";
import {SafeSubscriptionComponent} from "../../../shared/safe-subscription-component";
import {FormService} from "./form.service";
import {HttpClient} from "@angular/common/http";
import {Dict} from "../../../shared/dict";


@Component({
  selector: "app-app-page",
  templateUrl: "./app-page.component.html",
  styleUrls: ["./app-page.component.scss"]
})
export class AppPageComponent extends SafeSubscriptionComponent implements OnInit {

  public questionary$: Observable<Questionary>;
  public currentStep$: Observable<QuestionContainer>;
  private data = {};

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formService: FormService, private http: HttpClient) {
    super();
  }

  ngOnInit() {
    this.data = this.restoreFromLocalStorage();

    this.questionary$ = this.activatedRoute.paramMap.pipe(
      map(params => questions.find(q => q.id === params.get(ROUTE_PARAMETER_CURRENT_QUESTIONARY))),
    );

    const step$ = combineLatest([
      this.activatedRoute.paramMap.pipe(map(params => params.get(ROUTE_PARAMETER_CURRENT_STEP))),
      this.questionary$
    ]);

    this.currentStep$ = step$.pipe(
      filter(([id]) => id !== "start"),
      map(([currentStep, questionary]) => questionary.questionContainers.find(c => c.id === currentStep)),
    );

    this.subscribe(step$.pipe(
      filter(([id]) => id === "start"),
    ), ([, questionary]) => {
      console.log(questionary.questionContainers[0]);
      this.router.navigate(["../", questionary.questionContainers[0].id], {relativeTo: this.activatedRoute});
    });
  }

  public stepChanged(container: QuestionContainer) {
    this.router.navigate(["../", container.id], {relativeTo: this.activatedRoute});
  }

  public save() {
    // this.http.get("/assets/forms/Formblatt_1.pdf", {responseType: "arraybuffer"})
    this.formService.fillQuestionary("/assets/forms/Formblatt_1.pdf", {
      "Name_Eingabe": "questions.part1.about_me.lastname",
      "Vorname_Eingabe": "questions.part1.about_me.firstname"
    }, this.data)
      .pipe(
        first(),
      ).subscribe(data => {
      const blob = new Blob([data], {type: "application/pdf"});
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = window.URL.createObjectURL(blob);
      link.download = "Formblatt_1.pdf";
      link.click();
    });
  }

  public storeToLocalStorage(data: Dict) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  public restoreFromLocalStorage(): Dict {
    return JSON.parse(localStorage.getItem("data") || "{}");
  }

  public dataChanged(data: Dict) {
    this.data = data;
    this.storeToLocalStorage(data);
  }
}
