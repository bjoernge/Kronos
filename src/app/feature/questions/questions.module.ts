import {NgModule} from '@angular/core';
import {MultipleChoiceQuestionComponent} from './multiple-choice/multiple-choice-question.component';
import {QuestionSelectorComponent} from './question-selector/question-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionContainerComponent} from './question-container/question-container.component';
import {TextQuestionComponent} from './text-question/text-question.component';
import {QuestionaryComponent} from './questionary/questionary.component';
import {SharedModule} from '../../shared/shared.module';
import {MatCardModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    QuestionaryComponent
  ],
  exports: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    QuestionaryComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule
  ]
})
export class QuestionsModule {
}
