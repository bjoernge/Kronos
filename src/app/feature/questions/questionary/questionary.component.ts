import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Questionary} from "../../../models/questions/questionContainer";
import {FormControl, FormGroup} from "@angular/forms";
import {SafeSubscriptionComponent} from "../../../shared/safe-subscription-component";
import {prevCurNextAnimation} from "./questionary.animation";

@Component({
  selector: "app-questionary",
  templateUrl: "./questionary.component.html",
  styleUrls: ["./questionary.component.scss"],
  animations: [prevCurNextAnimation]
})
export class QuestionaryComponent extends SafeSubscriptionComponent implements OnInit {

  @Input()
  public questionary: Questionary;

  public formGroup: FormGroup;

  @Input()
  public currentStep: number;

  @Output()
  public stepChanged: EventEmitter<number> = new EventEmitter<number>();
  public state: "next" | "cur" | "prev" = "cur";

  @ViewChild("containerRef")
  public containerRef: ElementRef;

  constructor() {
    super();
  }

  public get context(): { [key: string]: any } {
    return this.formGroup && Object.values(this.formGroup.controls)
      .reduce((prev, cur: FormGroup) => ({...prev, ...cur.value}), {});
  }

  ngOnInit() {
    this.formGroup =
      new FormGroup(this.questionary.questionContainers.reduce((prev, cur) =>
        ({
          ...prev,
          [cur.namespace]: new FormGroup(cur.questionEntries.reduce((p, c) => ({
            ...p,
            [c.question.id]: new FormControl(c.defaultValue && c.defaultValue(null))
          }), {}))
        }), {}));

    this.subscribe(this.formGroup.valueChanges, context => {
      for (const container of this.questionary.questionContainers) {
        const group = this.formGroup.controls[container.namespace] as FormGroup;
        for (const question of container.questionEntries) {
          const control = group.controls[question.question.id];

          // reevaluate the default value
          if (question.defaultValue && control.pristine) {
            const defaultValue = question.defaultValue(context);
            if (defaultValue !== control.value) {
              control.setValue(defaultValue);
            }
          }
        }
      }
    });
  }

  public animationStarting() {
    this.containerRef.nativeElement.scrollTo({top: 0, behavior: "smooth"});
  }

  public animationDone() {
    if (this.state === "cur") {
      return;
    }

    this.stepChanged.emit(this.currentStep + (this.state === "next" ? 1 : -1));
    this.state = "cur";
  }
}
