import {Question} from "./question";
import {Choice} from "./choice";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class MultipleChoiceQuestion implements Question {
  public type = "multipleChoice";
  public hint: string;
  public id: string;
  public text: string;
  public choices: Choice[];
  public documentRequests: DocumentRequest[];

  public constructor(config: QuestionOptions & {
    choices: Choice[]
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
  }
}
