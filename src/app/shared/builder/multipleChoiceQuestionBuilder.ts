import {Choice, MultipleChoiceQuestion} from "@models/questions";
import {QuestionBuilder} from "@shared/builder/questionBuilder";
import {QuestionContext} from "@shared/builder/questionContext";


export class MultipleChoiceQuestionBuilder<T = any> extends QuestionBuilder<MultipleChoiceQuestion<T>> {

  private choices: Choice<T>[] = [];

  public option(text: string, value: T, hideIf?: (context: QuestionContext) => boolean): MultipleChoiceQuestionBuilder {
    this.choices.push({text: `${this.fqn}.choices.${text}`, value, hideIf: hideIf && this.contextCallback(hideIf)});
    return this;
  }

  public build(): MultipleChoiceQuestion<T> {
    return new MultipleChoiceQuestion({
      id: this.fqn,
      text: this.text,
      choices: this.choices,
      hint: this.hintText,
      documents: this.documents,
      placeholder: this.placeholder
    });
  }

}
