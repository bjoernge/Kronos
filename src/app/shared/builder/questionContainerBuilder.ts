import {
  CalendarQuestion,
  MultipleChoiceQuestion,
  Question,
  QuestionContainer,
  QuestionContainerEntry,
  TextBlockQuestion,
  TextQuestion,
  YesNoQuestion
} from "@models/questions";
import {QuestionBuilder} from "@shared/builder/questionBuilder";
import {QuestionContext} from "@shared/builder/questionContext";
import {QuestionContextInternal} from "@shared/builder/questionContextInternal";
import {CalendarQuestionBuilder} from "@shared/builder/calendarQuestionBuilder";
import {TextQuestionBuilder} from "@shared/builder/textQuestionBuilder";
import {YesNoQuestionBuilder} from "@shared/builder/yesNoQuestionBuilder";
import {MultipleChoiceQuestionBuilder} from "@shared/builder/multipleChoiceQuestionBuilder";
import {TextBlockQuestionBuilder} from "@shared/builder/textBlockQuestionBuilder";
import {FormBuilder} from "@shared/builder/formBuilder";


type BuilderCallBack<T extends Question, B extends QuestionBuilder<T>> = (builder: B) => B;

export class QuestionContainerBuilder {
  protected questionContextCallback: (ctx: any) => QuestionContext;
  protected hiddenCondition: QuestionContainer["isHidden"];
  private description: string;
  private title: string;
  private questionEntries: QuestionContainerEntry[] = [];
  private nextText: string = "app.next";
  private previousText: string = "app.previous";

  public constructor(private id: string, private namespace: string = id, private formBuilder: FormBuilder) {
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

  public askText(id: string, callback?: BuilderCallBack<TextQuestion, TextQuestionBuilder>): this {
    return this.ask(new TextQuestionBuilder(id, this.namespace, this.formBuilder), callback);
  }

  public printInfo(id: string, callback?: BuilderCallBack<TextBlockQuestion, TextBlockQuestionBuilder>): this {
    return this.ask(new TextBlockQuestionBuilder(id, this.namespace, this.formBuilder), callback);
  }

  public askYesNoQuestion(id: string, callback?: BuilderCallBack<YesNoQuestion, YesNoQuestionBuilder>): this {
    return this.ask(new YesNoQuestionBuilder(id, this.namespace, this.formBuilder), callback);
  }

  public askMultipleChoiceQuestion<T>(id: string,
                                      callback?: BuilderCallBack<MultipleChoiceQuestion<T>, MultipleChoiceQuestionBuilder<T>>): this {
    return this.ask(new MultipleChoiceQuestionBuilder(id, this.namespace, this.formBuilder), callback);
  }

  public askForDate(id: string, callback?: BuilderCallBack<CalendarQuestion, CalendarQuestionBuilder>): this {
    return this.ask(new CalendarQuestionBuilder(id, this.namespace, this.formBuilder), callback);
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
      questionEntries: this.questionEntries,
      isHidden: this.hiddenCondition
    };
  }

  protected contextCallback(callback: (context: QuestionContext) => boolean): (ctx) => boolean {
    return ctx => callback(this.questionContextCallback(ctx));
  }

  private ask<Q extends Question, B extends QuestionBuilder<Q>>(builder: B, callback?: BuilderCallBack<Q, B>): this {
    const entry = (callback ? callback(builder) : builder).buildEntry();
    this.questionEntries.push(entry);
    return this;
  }
}
