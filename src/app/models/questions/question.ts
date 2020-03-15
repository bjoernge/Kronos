export interface Question {
  id: string;
  text: string;
  readonly type: string;
  hint?: string;
}

