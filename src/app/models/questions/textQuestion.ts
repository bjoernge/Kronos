import {Question} from "./question";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class TextQuestion implements Question {
  public readonly type: "text" = "text";
  public placeholder: string;
  public hint: string;
  public id: string;
  public text: string;
  public documentRequests: DocumentRequest[] = [];

  public constructor(config: QuestionOptions) {
    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.placeholder = config.placeholder;
    this.placeholder = config.placeholder;

  }
}
