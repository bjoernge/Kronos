import {Question} from "./question";
import {QuestionOptions} from "./questionOptions";
import {DocumentRequest} from "./documentRequest";

export class CalendarQuestion implements Question {

  public readonly type: "calendar" = "calendar";
  public hint: string;
  public id: string;
  public text: string;
  public placeholder: string;
  public documentRequests: DocumentRequest[] = [];

  constructor(config: QuestionOptions & {
    calendarType?: "textBox" | "embedded" | "popup"
  }) {

    config = {
      calendarType: "textBox",
      documents: [],
      ...config,
    };

    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.documentRequests = config.documents;
    this.placeholder = config.placeholder;
  }
}
