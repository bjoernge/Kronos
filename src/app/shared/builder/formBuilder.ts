import {Dict} from "@shared/dict";
import {FormMapping} from "@models/forms";
import {QuestionContext} from "@shared/builder/questionContext";
import {QuestionContextInternal} from "@shared/builder/questionContextInternal";

export class FormBuilder {
  private mappings: Dict<string> = {};
  private calculatedMappings: Dict<(ctx: any) => any> = {};

  private formName: string;

  public constructor(private namespace: string) {
  }

  public setFormName(formName: string) {
    this.formName = formName;
  }

  public addFieldMapping(formFieldName: string, fieldId: string): this {
    this.mappings = {...this.mappings, [formFieldName]: fieldId};
    return this;
  }

  public addCalculatedMapping(formFieldName: string, calculation: (ctx: QuestionContext) => any): this {
    this.calculatedMappings =
      {...this.calculatedMappings, [formFieldName]: (raw => calculation(new QuestionContextInternal(raw, this.namespace)))};
    return this;
  }

  public build(): FormMapping {
    if (!this.formName) {
      throw new Error("Cannot build a form mapping without formname!");
    }

    const mappings = this.mappings;
    const calculatedMappings = this.calculatedMappings;

    return {
      formName: this.formName,
      getFormField(formFieldName: string, context: any): string {
        if (formFieldName in mappings) {
          return context[mappings[formFieldName]];
        }

        if (formFieldName in calculatedMappings) {
          return calculatedMappings[formFieldName](context);
        }

        return null;
      }
    };
  }
}
