import {QuestionContext} from "./QuestionContext";

export class QuestionContextInternal implements QuestionContext {
  constructor(public raw: any, private defaultNamespace: string) {

  }

  public get(id: string, namespace?: string) {
    if (namespace) {
      const namespaceParts = namespace.split(".");
      const defaultNameSpaceParts = this.defaultNamespace.split(".");
      namespace =
        defaultNameSpaceParts.slice(0, defaultNameSpaceParts.length - namespaceParts.length).concat(namespaceParts).join(".");
    } else {
      namespace = this.defaultNamespace;
    }
    return this.raw && this.raw[`${namespace}.${id}`];
  }

  public is(id: string, ...values: any[]): boolean {
    return this.is_n(id, this.defaultNamespace, ...values);
  }

  public is_n(id: string, namespace: string, ...values: any[]): boolean {
    const val = this.get(id, namespace);
    return values.some(v => v === val);
  }

}
