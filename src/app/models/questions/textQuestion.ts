import {Question} from './question';

export class TextQuestion implements Question {
  public readonly type = 'text';

  public constructor(public id: string, public text: string, public hint?: string) {

  }
}
