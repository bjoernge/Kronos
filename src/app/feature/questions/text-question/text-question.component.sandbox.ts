import {sandboxOf} from 'angular-playground';
import {QuestionsModule} from '../questions.module';
import {TextQuestionComponent} from './text-question.component';
import {TextQuestion} from '../../../models/questions/textQuestion';
import {FormControl} from '@angular/forms';

export default sandboxOf(TextQuestionComponent, {
  declareComponent: false,
  imports: [QuestionsModule]
})
  .add('default', {
    template: `<app-text-question [question]="question" [control]="formControl"></app-text-question>`,
    context: {
      question: new TextQuestion('testTextId1', 'testTextText'),
      formControl: new FormControl()
    }
  });
