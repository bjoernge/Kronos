import {Question} from "./question";

export interface Questionary {
  title: string;
  questionContainers: QuestionContainer[];
}

export interface QuestionContainer {
  title: string;
  description: string;
  questionEntries: QuestionContainerEntry[];
  namespace: string;
  nextText: string;
  previousText: string;
}

export interface QuestionContainerEntry<T extends Question = Question> {
  question: T;

  /**
   * expression, that fills in a default value, if the field is untouched
   */
  defaultValue?: (context: any) => any;
  /**
   * expression, to decide whether or not the question should be shown
   * @param context Current context of already answered questions.
   * Having the questionId as key and it's answer as value. If unanswered, the value is null
   */
  isHidden?: (context: { [key: string]: any }) => boolean;
}

export interface Answer {
  question: Question;
  answer: string;
}


