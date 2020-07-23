import {Questions} from "@models/questions";
import {FormBuilder} from "@shared/builder/formBuilder";
import {QuestionBuilder} from "@shared/builder/questionBuilder";

export interface QuestionBuilderType<Q extends Questions> extends Function {
  new(id: string, namespace: string, formBuilder: FormBuilder): QuestionBuilder<Q>
}
