import {Question} from './question';

export class TextQuestion implements Question {
  public readonly type = 'text';

  public constructor(public id: string, public text: string, public hint?: string) {

  }

  public static fromId(namespace: string, id: string, hint = true): TextQuestion {
    return new TextQuestion(`${namespace}.${id}`, `${namespace}.q.${id}Text`, hint ? `${namespace}.q.${id}Hint` : undefined);
  }
}
