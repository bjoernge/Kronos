import {Dict} from "@shared/dict";
import {FormMapping} from "@models/forms";

export class FormBuilder {
  private mappings: Dict<string> = {};
  private calculatedMappings: Dict<(ctx: any) => any> = {};

  private formName: string;

  public constructor() {
  }

  public setFormName(formName: string) {
    this.formName = formName;
  }

  public addFieldMapping(formFieldName: string, fieldId: string) {
    this.mappings = {...this.mappings, [formFieldName]: fieldId};
  }

  public addCalculatedMapping(formFieldName: string, calculation: (ctx: any) => any) {
    this.calculatedMappings = {...this.calculatedMappings, [formFieldName]: calculation};
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
