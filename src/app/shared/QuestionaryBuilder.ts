import {Questionary, QuestionContainer} from "../models/questions/questionContainer";
import {QuestionContainerBuilder} from "./QuestionContainerBuilder";

export function buildQuestionary(id: string, title: string = id): QuestionaryBuilder {
  return new QuestionaryBuilder(title);
}

export class QuestionaryBuilder {
  private containers: QuestionContainer[] = [];

  public constructor(private id: string, private title: string = id) {
  }

  public addQuestionContainer(namespace: string,
                              callback: (builder: QuestionContainerBuilder) => QuestionContainerBuilder): QuestionaryBuilder {
    const builder = new QuestionContainerBuilder(namespace, "questions." + this.id + "." + namespace);
    const container = callback(builder).build();
    this.containers.push(container);
    return this;
  }

  public build(): Questionary {
    return {
      id: this.id,
      title: this.title,
      questionContainers: this.containers
    };
  }
}
