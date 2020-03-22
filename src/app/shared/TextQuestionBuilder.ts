import {QuestionBuilder} from "./QuestionBuilder";
import {TextQuestion} from "../models/questions/textQuestion";

export class TextQuestionBuilder extends QuestionBuilder<TextQuestion> {
  public build(): TextQuestion {
    return new TextQuestion({
      id: this.id,
      text: this.text,
      hint: this.hintText,
      documents: this.documents
    });
  }
}


