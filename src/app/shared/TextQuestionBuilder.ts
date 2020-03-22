import {QuestionBuilder} from './QuestionBuilder';
import {TextQuestion} from '../models/questions/textQuestion';

export class TextQuestionBuilder extends QuestionBuilder<TextQuestion> {
  public build(): TextQuestion {
    return new TextQuestion(this.id, this.text, this.hintText);
  }
}
