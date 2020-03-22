import {Questionary, QuestionContainer} from "../models/questions/questionContainer";
import {QuestionContainerBuilder} from "./QuestionContainerBuilder";

export function buildQuestionary(title: string): QuestionaryBuilder {
  return new QuestionaryBuilder(title);
}

export class QuestionaryBuilder {
  private containers: QuestionContainer[] = [];

  public constructor(private title: string) {
  }

  public addQuestionContainer(namespace: string,
                              callback: (builder: QuestionContainerBuilder) => QuestionContainerBuilder): QuestionaryBuilder {
    const builder = new QuestionContainerBuilder("questions." + this.title + "." + namespace);
    const container = callback(builder).build();
    this.containers.push(container);
    return this;
  }

  public build(): Questionary {
    return {
      title: this.title,
      questionContainers: this.containers
    };
  }
}
