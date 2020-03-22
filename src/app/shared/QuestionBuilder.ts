import {Question} from '../models/questions/question';
import {QuestionContainerEntry} from '../models/questions/questionContainer';
import {QuestionContainerBuilder} from './QuestionContainerBuilder';

interface QuestionContext {
  raw: any;

  get(id: string, namespace?: string);
}

export abstract class QuestionBuilder<T extends Question> {
  protected text: string;
  protected hintText: string;
  protected hiddenCondition: QuestionContainerEntry['isHidden'];
  protected defaultValue: QuestionContainerEntry['defaultValue'];

  protected questionContextCallback: (ctx: any) => QuestionContext;


  public constructor(protected readonly id: string, protected namespace: string, private parent: QuestionContainerBuilder) {
    this.text = `${namespace}.${id}.text`;
    this.hintText = `${namespace}.${id}.hint`;
    this.id = namespace ? `${namespace}.${id}` : id;
    this.questionContextCallback = ctx => ({
      raw: ctx,
      get: (i: string, n?: string) => ctx[`${n || namespace}.${id}`]
    });
  }

  public hideHint(): QuestionBuilder<T> {
    this.hintText = null;
    return this;
  }

  public hideIf(callback: (context: QuestionContext) => boolean): QuestionBuilder<T> {
    this.hiddenCondition = ctx => callback(this.questionContextCallback(ctx));

    return this;
  }

  public defaultTo(defaultValue: ((context: QuestionContext) => string) | string): QuestionBuilder<T> {
    if (typeof defaultValue === 'function') {
      this.defaultValue = ctx => defaultValue(this.questionContextCallback(ctx));
    } else {
      this.defaultValue = () => defaultValue;
    }

    return this;
  }

  public abstract build(): T;

  public done() {
    return this.parent.addQuestion({
      question: this.build(),
      defaultValue: this.defaultValue,
      isHidden: this.hiddenCondition
    });
  }
}
