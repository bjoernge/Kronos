import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleChoiceQuestionComponent} from './multiple-choice/multiple-choice-question.component';
import {QuestionSelectorComponent} from './question-selector/question-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionaryComponent} from './questionary/questionary.component';
import {TextQuestionComponent} from './text-question/text-question.component';

@NgModule({
  declarations: [MultipleChoiceQuestionComponent, QuestionSelectorComponent, QuestionaryComponent, TextQuestionComponent],
  exports: [MultipleChoiceQuestionComponent, QuestionSelectorComponent, QuestionaryComponent, TextQuestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule {
}
