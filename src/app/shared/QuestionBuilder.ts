import {Question} from "../models/questions/question";
import {QuestionContainerEntry} from "../models/questions/questionContainer";
import {DocumentRequest} from "../models/questions/documentRequest";
import {v4 as uuid} from "uuid";
import {QuestionContext} from "./QuestionContext";
import {QuestionContextInternal} from "./QuestionContextInternal";

export abstract class QuestionBuilder<T extends Question> {
  protected text: string;
  protected hintText: string;
  protected hiddenCondition: QuestionContainerEntry["isHidden"];
  protected defaultValue: QuestionContainerEntry["defaultValue"];
  protected documents: DocumentRequest[] = [];

  protected questionContextCallback: (ctx: any) => QuestionContext;


  public constructor(protected readonly id: string, protected readonly namespace: string) {
    this.text = `${namespace}.${id}.text`;
    this.hintText = null;
    this.id = namespace ? `${namespace}.${id}` : id;
    this.questionContextCallback = ctx => new QuestionContextInternal(ctx, namespace);
  }

  public showHint(): this {
    this.hintText = `${this.id}.hint`;
    return this;
  }

  public hideIf(callback: (context: QuestionContext) => boolean): this {
    this.hiddenCondition = this.contextCallback(callback);

    return this;
  }

  public requireDocument(options: { name: string, description?: string, id?: string, required?: ((context: any) => boolean) | boolean }): this {
    const documentRequest: DocumentRequest = {
      id: uuid(),
      description: "",
      required: true,
      ...options
    };
    this.documents.push(documentRequest);
    return this;
  }

  public defaultTo(defaultValue: ((context: QuestionContext) => any) | any): this {
    if (typeof defaultValue === "function") {
      this.defaultValue = ctx => defaultValue(this.questionContextCallback(ctx));
    } else {
      this.defaultValue = () => defaultValue;
    }

    return this;
  }

  public abstract build(): T;

  public buildEntry(): QuestionContainerEntry<T> {
    return {
      question: this.build(),
      defaultValue: this.defaultValue,
      isHidden: this.hiddenCondition
    };
  }

  protected contextCallback(callback: (context: QuestionContext) => boolean): (ctx) => boolean {
    return ctx => callback(this.questionContextCallback(ctx));
  }
}
