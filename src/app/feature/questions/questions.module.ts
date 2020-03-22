import {NgModule} from "@angular/core";
import {MultipleChoiceQuestionComponent} from "./multiple-choice/multiple-choice-question.component";
import {QuestionSelectorComponent} from "./question-selector/question-selector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionContainerComponent} from "./question-container/question-container.component";
import {TextQuestionComponent} from "./text-question/text-question.component";
import {QuestionaryComponent} from "./questionary/questionary.component";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule, MatCardModule, MatInputModule} from "@angular/material";
import {YesNoQuestionComponent} from "./yest-no-question/yes-no-question.component";
import { TextBlockQuestionComponent } from './text-block-question/text-block-question.component';

@NgModule({
  declarations: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    QuestionaryComponent,
    YesNoQuestionComponent,
    TextBlockQuestionComponent,
  ],
  exports: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    YesNoQuestionComponent,
    QuestionaryComponent,
    TextBlockQuestionComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class QuestionsModule {
}
