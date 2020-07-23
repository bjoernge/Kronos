import {Question} from "./question";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class TextBlockQuestion implements Question {

  public readonly type: "textBlock" = "textBlock";
  public placeholder: string;
  public hint: string;
  public id: string;
  public text: string;
  public documentRequests: DocumentRequest[] = [];

  constructor(config: QuestionOptions) {

    config = {
      documents: [],
      ...config
    };

    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.documentRequests = config.documents;
    this.placeholder = config.placeholder;
  }
}
