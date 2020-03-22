import {QuestionBuilder} from "./QuestionBuilder";
import {YesNoQuestion} from "../models/questions/yesNoQuestion";

export class YesNoQuestionBuilder extends QuestionBuilder<YesNoQuestion> {
  private yesText: string = "answers.yes";
  private noText: string = "answers.no";

  public insteadOfYesSay(yesText: string): this {
    this.yesText = yesText;
    return this;
  }

  public insteadOfNoSay(noText: string): this {
    this.noText = noText;
    return this;
  }

  public build(): YesNoQuestion {
    return new YesNoQuestion({
      id: this.id,
      text: this.text,
      hint: this.hintText,
      documents: this.documents,
      yesText: this.yesText,
      noText: this.noText,
    });
  }
}
