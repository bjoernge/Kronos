import {QuestionContainer, Questions} from "@models/questions";
import {QuestionBuilder} from "@shared/builder/questionBuilder";
import {QuestionContext} from "@shared/builder/questionContext";
import {QuestionContextInternal} from "@shared/builder/questionContextInternal";
import {FormBuilder} from "@shared/builder/formBuilder";
import {QuestionEntryBuilder} from "@shared/builder/questionEntryBuilder";
import {BuilderCallBack} from "@shared/builder/builderCallBack";


export class QuestionContainerBuilder extends QuestionEntryBuilder {
  protected questionContextCallback: (ctx: any) => QuestionContext;
  protected hiddenCondition: QuestionContainer["isHidden"];
  private description: string;
  private title: string;
  private nextText: string = "app.next";
  private previousText: string = "app.previous";

  public constructor(id: string, namespace: string = id, formBuilder: FormBuilder) {
    super(id, namespace, formBuilder);
    this.questionContextCallback = ctx => new QuestionContextInternal(ctx, namespace);
  }

  public withTitle(title: string) {
    this.title = title;
  }

  public withDescription(description: string) {
    this.description = description;
  }

  public insteadOfNextSay(nextText: string) {
    this.nextText = `${this.namespace}.${nextText}`;
  }

  public insteadOfPreviousSay(previousText: string) {
    this.nextText = `${this.namespace}.${previousText}`;
  }

  public hideIf(callback: (context: QuestionContext) => boolean): this {
    this.hiddenCondition = this.contextCallback(callback);

    return this;
  }

  public build(): QuestionContainer {
    return {
      id: this.id,
      nextText: this.nextText,
      previousText: this.previousText,
      namespace: this.namespace,
      description: this.description,
      title: this.title,
      questionEntries: this.entries,
      isHidden: this.hiddenCondition
    };
  }

  protected contextCallback(callback: (context: QuestionContext) => boolean): (ctx) => boolean {
    return ctx => callback(this.questionContextCallback(ctx));
  }
}

export class BlockedQuestionContainerBuilder extends QuestionContainerBuilder {
  constructor(id: string, namespace: string, formBuilder: FormBuilder, private translationNamespace: string) {
    super(id, namespace, formBuilder);
  }

  protected ask<Q extends Questions, B extends QuestionBuilder<Q>>(builder: B, callback?: BuilderCallBack<Q, B>): this {
    return super.ask(builder.setTranslationPrefix(this.translationNamespace), callback);
  }
}
