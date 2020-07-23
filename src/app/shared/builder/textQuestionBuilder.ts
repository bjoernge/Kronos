import {TextQuestion} from "@models/questions";
import {QuestionBuilder} from "@shared/builder/questionBuilder";

export class TextQuestionBuilder extends QuestionBuilder<TextQuestion> {
  public build(): TextQuestion {
    return new TextQuestion({
      id: this.fqn,
      text: this.text,
      hint: this.hintText,
      documents: this.documents,
      placeholder: this.placeholder
    });
  }
}


