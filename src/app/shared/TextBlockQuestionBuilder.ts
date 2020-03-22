import {QuestionBuilder} from "./QuestionBuilder";
import {TextBlockQuestion} from "../models/questions/textBlockQuestion";

export class TextBlockQuestionBuilder extends QuestionBuilder<TextBlockQuestion> {
  public build(): TextBlockQuestion {
    return new TextBlockQuestion({
      id: this.id,
      text: this.text,
      hint: this.hintText,
      documents: this.documents
    });
  }
}
