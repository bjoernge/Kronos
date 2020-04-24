import {QuestionContainer, QuestionContainerEntry} from "../models/questions/questionContainer";
import {MultipleChoiceQuestionBuilder} from "./MultipleChoiceQuestionBuilder";
import {TextQuestionBuilder} from "./TextQuestionBuilder";
import {TextQuestion} from "../models/questions/textQuestion";
import {TextBlockQuestion} from "../models/questions/textBlockQuestion";
import {TextBlockQuestionBuilder} from "./TextBlockQuestionBuilder";
import {YesNoQuestionBuilder} from "./YesNoQuestionBuilder";
import {YesNoQuestion} from "../models/questions/yesNoQuestion";
import {QuestionBuilder} from "./QuestionBuilder";
import {Question} from "../models/questions/question";
import {CalendarQuestionBuilder} from "./CalendarQuestionBuilder";
import {CalendarQuestion} from "../models/questions/calendarQuestion";
import {MultipleChoiceQuestion} from "../models/questions/multipleChoiceQuestion";
import {QuestionContext} from "./QuestionContext";
import {QuestionContextInternal} from "./QuestionContextInternal";

type BuilderCallBack<T extends Question, B extends QuestionBuilder<T>> = (builder: B) => B;

export class QuestionContainerBuilder {
  protected questionContextCallback: (ctx: any) => QuestionContext;
  protected hiddenCondition: QuestionContainer["isHidden"];
  private description: string;
  private title: string;
  private questionEntries: QuestionContainerEntry[] = [];
  private nextText: string = "app.next";
  private previousText: string = "app.previous";

  public constructor(private id: string, private namespace: string = id) {
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
    return this.ask(new TextQuestionBuilder(id, this.namespace), callback);
  }

  public printInfo(id: string, callback?: BuilderCallBack<TextBlockQuestion, TextBlockQuestionBuilder>): this {
    return this.ask(new TextBlockQuestionBuilder(id, this.namespace), callback);
  }

  public askYesNoQuestion(id: string, callback?: BuilderCallBack<YesNoQuestion, YesNoQuestionBuilder>): this {
    return this.ask(new YesNoQuestionBuilder(id, this.namespace), callback);
  }

  public askMultipleChoiceQuestion<T>(id: string,
                                      callback?: BuilderCallBack<MultipleChoiceQuestion<T>, MultipleChoiceQuestionBuilder<T>>): this {
    return this.ask(new MultipleChoiceQuestionBuilder(id, this.namespace), callback);
  }

  public askForDate(id: string, callback?: BuilderCallBack<CalendarQuestion, CalendarQuestionBuilder>): this {
    return this.ask(new CalendarQuestionBuilder(id, this.namespace), callback);
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
