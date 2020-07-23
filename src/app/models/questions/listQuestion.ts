import {Question} from "@models/questions/question";
import {DocumentRequest} from "@models/questions/documentRequest";
import {QuestionOptions} from "@models/questions/questionOptions";
import {QuestionEntry} from "@models/questions/questionEntry";

export class ListQuestion implements Question {
  public documentRequests: DocumentRequest[];
  public hint: string;
  public id: string;
  public placeholder: string;
  public text: string;
  public readonly type: "list" = "list";
  public itemQuestions: QuestionEntry[];
  public itemCaption: string;
  public addCaption: string;


  public constructor(config: QuestionOptions & {
    itemQuestions: QuestionEntry[];
    itemCaption?: string;
    addCaption?: string;
  }) {
    config = {
      documents: [],
      addCaption: "app.questions.__default.list.add",
      ...config
    };

    this.hint = config.hint;
    this.id = config.id;
    this.text = config.text;
    this.documentRequests = config.documents;
    this.placeholder = config.placeholder;

    this.itemQuestions = config.itemQuestions;
    this.addCaption = config.addCaption;
    this.itemCaption = config.itemCaption;
  }

}
