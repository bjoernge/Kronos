import {Question} from './question';

export interface QuestionContainer {
  title: string;
  description: string;
  questionEntries: QuestionContainerEntry[];
}

export interface QuestionContainerEntry {
  question: Question;

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


