import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {QuestionContainer} from "../../../models/questions/questionContainer";
import {FormControl, FormGroup} from "@angular/forms";
import {SafeSubscriptionComponent} from "../../../shared/safe-subscription-component";
import {prevCurNextAnimation} from "./questionary.animation";
import {Dict} from "../../../shared/dict";
import {Questionary} from "../../../models/questions/questionary";

@Component({
  selector: "app-questionary",
  templateUrl: "./questionary.component.html",
  styleUrls: ["./questionary.component.scss"],
  animations: [prevCurNextAnimation]
})
export class QuestionaryComponent extends SafeSubscriptionComponent implements OnInit {

  @Input()
  public questionary: Questionary;
  @Output()
  public dataChanged: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  public formGroup: FormGroup;
  @Input()
  public currentStep: QuestionContainer;
  @Output()
  public stepChanged: EventEmitter<QuestionContainer> = new EventEmitter<QuestionContainer>();
  public state: "next" | "cur" | "prev" = "cur";
  @ViewChild("containerRef")
  public containerRef: ElementRef;

  constructor() {
    super();
  }

  private _data: Dict;

  @Input()
  public set data(value: Dict) {
    this._data = value;
    if (this.formGroup && this._data !== value) {
      const newVal = this.questionary.questionContainers.reduce((prev, cur) => ({
        ...prev,
        [cur.namespace]: Object.entries(value)
          .filter(([key]) => key.startsWith(cur.namespace))
          .reduce((p, [key, val]) => ({...p, [key]: val}), {})
      }), {});
      this.formGroup.patchValue(newVal);
    }
  }

  public get next(): QuestionContainer | null {
    return this.nextVisible();
  }

  public get previous(): QuestionContainer | null {
    return this.nextVisible(-1);
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
            [c.question.id]: new FormControl(c.defaultValue && c.defaultValue(null) || this._data && this._data[c.question.id])
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

      this.dataChanged.emit(Object.values(context).reduce((prev: object, cur: object) => ({...prev, ...cur}), {}));
    });
  }

  public animationStarting() {
    this.containerRef.nativeElement.scrollTo({top: 0, behavior: "smooth"});
  }

  public animationDone() {
    if (this.state === "cur") {
      return;
    }

    const next = this.nextVisible(this.state === "next" ? 1 : -1);

    this.stepChanged.emit(next);
    this.state = "cur";
  }

  public nextVisible(amount: number = 1): QuestionContainer | null {
    if (!this.questionary.questionContainers) {
      return null;
    }

    if (amount == 0) {
      return this.currentStep;
    }

    const direction = amount < 0 ? -1 : 1;
    let next = this.questionary.questionContainers.indexOf(this.currentStep);
    while (amount !== 0) {
      next += direction;

      if (next < 0 || next >= this.questionary.questionContainers.length) {
        return null;
      }

      if (!(this.questionary.questionContainers[next].isHidden && this.questionary.questionContainers[next].isHidden(this.context))) {
        amount -= direction;
      }
    }

    return this.questionary.questionContainers[next];
  }
}
