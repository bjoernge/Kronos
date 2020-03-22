import {QuestionContainer, QuestionContainerEntry} from '../models/questions/questionContainer';
import {MultipleChoiceQuestionBuilder} from './MultipleChoiceQuestionBuilder';
import {QuestionaryBuilder} from './QuestionaryBuilder';
import {TextQuestionBuilder} from './TextQuestionBuilder';

export class QuestionContainerBuilder {
  private description: string;
  private title: string;
  private questionEntries: QuestionContainerEntry[] = [];

  public constructor(private namespace: string, private parent: QuestionaryBuilder) {
  }

  public withTitle(title: string) {
    this.title = title;
  }

  public withDescription(description: string) {
    this.description = description;
  }

  public askText(id: string): TextQuestionBuilder {
    return new TextQuestionBuilder(id, this.namespace, this);
  }

  public addMultipleChoiceQuestion(id: string): MultipleChoiceQuestionBuilder {
    return null;
  }

  public addQuestion(question: QuestionContainerEntry): QuestionContainerBuilder {
    this.questionEntries.push(question);
    return this;
  }

  public build(): QuestionContainer {
    return {
      namespace: this.namespace,
      description: this.description,
      title: this.title,
      questionEntries: this.questionEntries
    };
  }

  public done(): QuestionaryBuilder {
    return this.parent.addQuestionContainer(this.build());
  }
}
