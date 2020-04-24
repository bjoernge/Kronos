export interface FormMapping {
  formName: string;

  getFormField(formFieldName: string, context: any): string | null;
}
