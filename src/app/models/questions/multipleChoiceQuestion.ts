import {Question} from "./question";
import {Choice} from "./choice";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class MultipleChoiceQuestion<T = string> implements Question {
  public type: "multipleChoice" = "multipleChoice";
  public hint: string;
  public id: string;
  public text: string;
  public choices: Choice<T>[];
  public documentRequests: DocumentRequest[];
  public placeholder: string;

  public constructor(config: QuestionOptions & {
    choices: Choice<T>[]
  }) {
    config = {
      documents: [],
      ...config
    };

    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.choices = config.choices;
    this.documentRequests = config.documents;
    this.placeholder = config.placeholder;
  }
}
