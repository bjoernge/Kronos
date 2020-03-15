import {Component, Input, OnInit, TrackByFunction} from '@angular/core';
import {QuestionContainer} from '../../../models/questions/questionContainer';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '../question.service';
import {Question} from '../../../models/questions/question';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss']
})
export class QuestionaryComponent implements OnInit {

  @Input()
  public questionContainer: QuestionContainer;

  public questions$: Observable<Question[]>;

  public formGroup: FormGroup;

  constructor(private questionService: QuestionService) {
  }

  public trackByQuestionId: TrackByFunction<Question> = (index, entry) => entry && entry.id;

  ngOnInit() {
    this.formGroup =
      new FormGroup(this.questionContainer.questionEntries.reduce((prev, cur) =>
        ({...prev, [cur.question.id]: new FormControl()}), {}));

    this.formGroup.valueChanges.subscribe(context => {
      for (const question of this.questionContainer.questionEntries) {
        const control = this.formGroup.controls[question.question.id];

        // reevaluate the default value
        if (question.defaultValue && control.pristine) {
          const defaultValue = question.defaultValue(context);
          if (defaultValue !== control.value) {
            control.setValue(defaultValue);
          }
        }
      }
    });

    this.questions$ = this.formGroup.valueChanges.pipe(
      startWith({}),
      map(context => this.questionContainer.questionEntries
        .filter(q => !q.isHidden || !q.isHidden(context))
        .map(q => q.question))
    );
  }

}
