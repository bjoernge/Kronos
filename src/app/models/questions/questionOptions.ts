import {DocumentRequest} from "./documentRequest";

export interface QuestionOptions {
  id: string,
  text: string,
  hint?: string,
  documents?: DocumentRequest[]
}
