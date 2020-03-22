import {QuestionBuilder} from './QuestionBuilder';
import {MultipleChoiceQuestion} from '../models/questions/multipleChoiceQuestion';
import {Choice} from '../models/questions/choice';

export class MultipleChoiceQuestionBuilder extends QuestionBuilder<MultipleChoiceQuestion> {

  private choices: Choice[] = [];

  public option(text: string, value: string): MultipleChoiceQuestionBuilder {
    this.choices.push({text, value});
    return this;
  }

  public build(): MultipleChoiceQuestion {
    return new MultipleChoiceQuestion(this.id, this.text, this.choices, this.hintText);
  }

}
