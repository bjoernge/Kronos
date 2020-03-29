import {Component, Input, OnInit} from "@angular/core";
import {Questionary} from "../../../models/questions/questionContainer";
import {FormControl, FormGroup} from "@angular/forms";
import {SafeSubscriptionComponent} from "../../../shared/safe-subscription-component";

@Component({
  selector: "app-questionary",
  templateUrl: "./questionary.component.html",
  styleUrls: ["./questionary.component.scss"]
})
export class QuestionaryComponent extends SafeSubscriptionComponent implements OnInit {

  @Input()
  public questionary: Questionary;

  public formGroup: FormGroup;

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

}
