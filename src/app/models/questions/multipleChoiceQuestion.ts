import {Question} from './question';
import {Choice} from './choice';

export class MultipleChoiceQuestion implements Question {
  public type = 'multipleChoice';

  public constructor(public id: string, public text: string, public choices: Choice[], public hint?: string) {
  }
}
