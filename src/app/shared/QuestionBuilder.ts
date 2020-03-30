import {Question} from "../models/questions/question";
import {QuestionContainerEntry} from "../models/questions/questionContainer";
import {DocumentRequest} from "../models/questions/documentRequest";
import {v4 as uuid} from "uuid";

interface QuestionContext {
  raw: any;

  get(id: string, namespace?: string);
}

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
    this.questionContextCallback = ctx => ({
      raw: ctx,
      get: (i: string, n?: string) => ctx && ctx[`${n || namespace}.${i}`]
    });
  }

  public showHint(): this {
    this.hintText = `${this.id}.hint`;
    return this;
  }

  public hideIf(callback: (context: QuestionContext) => boolean): this {
    this.hiddenCondition = ctx => {
      console.log({ctx, context: this.questionContextCallback(ctx), ns: this.namespace});
      return callback(this.questionContextCallback(ctx));
    };

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

  public defaultTo(defaultValue: ((context: QuestionContext) => string) | string): this {
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
}
