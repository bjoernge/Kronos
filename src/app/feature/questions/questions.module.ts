import {NgModule} from "@angular/core";
import {MultipleChoiceQuestionComponent} from "./multiple-choice/multiple-choice-question.component";
import {QuestionSelectorComponent} from "./question-selector/question-selector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionContainerComponent} from "./question-container/question-container.component";
import {TextQuestionComponent} from "./text-question/text-question.component";
import {QuestionaryComponent} from "./questionary/questionary.component";
import {SharedModule} from "../../shared/shared.module";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import {YesNoQuestionComponent} from "./yes-no-question/yes-no-question.component";
import {TextBlockQuestionComponent} from "./text-block-question/text-block-question.component";
import {CalendarQuestionComponent} from "./calendar-question/calendar-question.component";

@NgModule({
  declarations: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    QuestionaryComponent,
    YesNoQuestionComponent,
    TextBlockQuestionComponent,
    CalendarQuestionComponent,
  ],
  exports: [
    MultipleChoiceQuestionComponent,
    QuestionSelectorComponent,
    QuestionContainerComponent,
    TextQuestionComponent,
    YesNoQuestionComponent,
    QuestionaryComponent,
    TextBlockQuestionComponent,
    CalendarQuestionComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule
  ]
})
export class QuestionsModule {
}
