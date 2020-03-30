import {QuestionBuilder} from "./QuestionBuilder";
import {MultipleChoiceQuestion} from "../models/questions/multipleChoiceQuestion";
import {Choice} from "../models/questions/choice";

export class MultipleChoiceQuestionBuilder<T = any> extends QuestionBuilder<MultipleChoiceQuestion<T>> {

  private choices: Choice<T>[] = [];

  public option(text: string, value: T): MultipleChoiceQuestionBuilder {
    this.choices.push({text: `${this.id}.choices.${text}`, value});
    return this;
  }

  public build(): MultipleChoiceQuestion<T> {
    return new MultipleChoiceQuestion({
      id: this.id,
      text: this.text,
      choices: this.choices,
      hint: this.hintText,
      documents: this.documents
    });
  }

}
