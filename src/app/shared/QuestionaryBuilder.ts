import {Questionary, QuestionContainer} from '../models/questions/questionContainer';
import {QuestionContainerBuilder} from './QuestionContainerBuilder';

export function buildQuestionary(title: string): QuestionaryBuilder {
  return new QuestionaryBuilder(title);
}

export class QuestionaryBuilder {
  private containers: QuestionContainer[] = [];

  public constructor(private title: string) {
  }

  public addQuestionContainer(container: QuestionContainer): QuestionaryBuilder;
  public addQuestionContainer(namespace: string): QuestionContainerBuilder;
  public addQuestionContainer(namespaceOrContainer: string | QuestionContainer): QuestionaryBuilder | QuestionContainerBuilder {
    if (typeof namespaceOrContainer === 'string') {
      return new QuestionContainerBuilder('questions.' + this.title + '.' + namespaceOrContainer, this);
    } else {
      this.containers.push(namespaceOrContainer);
      return this;
    }
  }

  public build(): Questionary {
    return {
      title: this.title,
      questionContainers: this.containers
    };
  }
}
