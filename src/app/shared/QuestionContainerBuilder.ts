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

type BuilderCallBack<T extends Question, B extends QuestionBuilder<T>> = (builder: B) => B;

export class QuestionContainerBuilder {
  private description: string;
  private title: string;
  private questionEntries: QuestionContainerEntry[] = [];

  public constructor(private namespace: string) {
  }

  public withTitle(title: string) {
    this.title = title;
  }

  public withDescription(description: string) {
    this.description = description;
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

  public build(): QuestionContainer {
    return {
      namespace: this.namespace,
      description: this.description,
      title: this.title,
      questionEntries: this.questionEntries
    };
  }

  private ask<Q extends Question, B extends QuestionBuilder<Q>>(builder: B, callback?: BuilderCallBack<Q, B>): this {
    const entry = (callback ? callback(builder) : builder).buildEntry();
    this.questionEntries.push(entry);
    return this;
  }
}
