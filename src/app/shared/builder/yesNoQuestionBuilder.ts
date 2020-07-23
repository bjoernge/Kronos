import {QuestionBuilder} from "@shared/builder/questionBuilder";
import {YesNoQuestion} from "@models/questions";

export class YesNoQuestionBuilder extends QuestionBuilder<YesNoQuestion> {
  private yesText: string = "answers.yes";
  private noText: string = "answers.no";

  public insteadOfYesSay(yesText: string): this {
    this.yesText = `${this.namespace}.${yesText}`;
    return this;
  }

  public insteadOfNoSay(noText: string): this {
    this.noText = `${this.namespace}.${noText}`;
    return this;
  }

  public build(): YesNoQuestion {
    return new YesNoQuestion({
      id: this.fqn,
      text: this.text,
      hint: this.hintText,
      documents: this.documents,
      yesText: this.yesText,
      noText: this.noText,
      placeholder: this.placeholder
    });
  }
}
