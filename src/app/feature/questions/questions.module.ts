import {NgModule} from "@angular/core";
import {MultipleChoiceQuestionComponent} from "./multiple-choice/multiple-choice-question.component";
import {QuestionSelectorComponent} from "./question-selector/question-selector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionContainerComponent} from "./question-container/question-container.component";
import {TextQuestionComponent} from "./text-question/text-question.component";
import {QuestionaryComponent} from "./questionary/questionary.component";
import {SharedModule} from "../../shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import {YesNoQuestionComponent} from "./yes-no-question/yes-no-question.component";
import {TextBlockQuestionComponent} from "./text-block-question/text-block-question.component";
import {CalendarQuestionComponent} from "./calendar-question/calendar-question.component";
import { BaseQuestionComponent } from './base-question/base-question.component';

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
    BaseQuestionComponent,
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
    MatSelectModule,
    MatTooltipModule
  ]
})
export class QuestionsModule {
}
