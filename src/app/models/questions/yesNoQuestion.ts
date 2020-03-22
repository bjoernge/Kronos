import {Question} from "./question";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class YesNoQuestion implements Question {
  public readonly type: string = "yesno";
  public hint: string;
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
    this.id = config.hint;
    this.text = config.hint;
    this.yesText = config.yesText;
    this.noText = config.noText;

    this.documentRequests = config.documents;
  }
}
