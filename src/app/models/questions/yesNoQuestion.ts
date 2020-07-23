import {Question} from "./question";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class YesNoQuestion implements Question {
  public readonly type: "yesno" = "yesno";
  public hint: string;
  public placeholder: string;
  public id: string;
  public text: string;
  public yesText: string;
  public noText: string;
  public documentRequests: DocumentRequest[] = [];

  constructor(config: QuestionOptions & { yesText?: string, noText?: string }) {
    config = {
      documents: [],
      ...config
    };

    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.yesText = config.yesText;
    this.noText = config.noText;

    this.documentRequests = config.documents;
    this.placeholder = config.placeholder;
  }
}
