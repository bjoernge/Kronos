import {DocumentRequest} from "./documentRequest";

export interface Question {
  id: string;
  text: string;
  readonly type: string;
  hint: string;
  documentRequests: DocumentRequest[];
  placeholder: string;
}

