import {v4 as uuid} from "uuid";
import {AnswerCondition, DocumentRequest, Question, QuestionEntry} from "@models/questions";
import {QuestionContextInternal} from "@shared/builder/questionContextInternal";
import {QuestionContext} from "@shared/builder/questionContext";
import {FormBuilder} from "@shared/builder/formBuilder";
import {Dict} from "@shared/dict";

export abstract class QuestionBuilder<T extends Question> {
  protected text: string;
  protected hintText: string;
  protected hiddenCondition: QuestionEntry["isHidden"];
  protected defaultValue: QuestionEntry["defaultValue"];
  protected documents: DocumentRequest[] = [];
  protected conditions: AnswerCondition[] = [];

  protected questionContextCallback: <Z>(ctx: Z) => QuestionContext;
  public validate = {
    maxLength: (maxLength: number, key: string = "maxLength"): this => {
      return this.validate.custom(key, val => typeof val !== "string" || ({
        valid: val.length <= maxLength,
        additional: {
          actualLength: val.length,
          maxLength
        }
      }));
    },
    minLength: (minLength: number, key: string = "minLength"): this => {
      return this.validate.custom(key, val => typeof val !== "string" || ({
        valid: val.length >= minLength,
        additional: {
          actualLength: val.length,
          maxLength: minLength
        }
      }));
    },
    required: (key: string = "required"): this => this.validate.custom(key, val => ["", null, undefined].indexOf(val) < 0),
    custom: <Z = any>(errorKey: string,
                      condition: (value: Z, context: QuestionContext) => boolean | { valid: boolean, additional?: Dict }): this => {
      const answerCondition: AnswerCondition<Z> = (v, ctx) => {
        const result = condition(v, this.questionContextCallback(ctx));

        const resultObj = typeof result === "boolean" ? {valid: result} : result;

        return resultObj.valid ? null : {
          [errorKey]: resultObj.additional === undefined ? true : resultObj.additional
        };

      };
      this.conditions.push(answerCondition);
      return this;
    }
  };
  protected placeholder: string;
  protected translationPrefix: string;
  protected readonly fqn: string;

  public constructor(protected readonly id: string, protected readonly namespace: string, private formBuilder: FormBuilder) {
    this.fqn = namespace ? `${namespace}.${id}` : id;
    this.hintText = null;
    this.translationPrefix = this.namespace;

    this.showText();
    this.showPlaceholder();
    this.questionContextCallback = ctx => new QuestionContextInternal(ctx, namespace);
  }

  public setTranslationPrefix(prefix: string): this {
    this.translationPrefix = prefix;

    if (this.placeholder) {
      this.showPlaceholder();
    }
    if (this.hintText) {
      this.showHint();
    }
    if (this.text) {
      this.showText();
    }

    return this;
  }

  public withFormName(formFieldName: string): this {
    this.formBuilder.addFieldMapping(formFieldName, this.fqn);
    return this;
  }

  public hidePlaceholder(placeholder?: string): this {
    this.placeholder = null;
    return this;
  }

  public showPlaceholder(placeholder: string = `${this.translationPrefix}.${this.id}.placeholder`): this {
    this.placeholder = placeholder;
    return this;
  }

  public hideText(): this {
    this.text = null;
    return this;
  }

  public showText(text: string = `${this.translationPrefix}.${this.id}.text`): this {
    this.text = text;
    return this;
  }

  public showHint(hint: string = `${this.translationPrefix}.${this.id}.hint`): this {
    this.hintText = hint;
    return this;
  }

  public hideIf(callback: (context: QuestionContext) => boolean): this {
    this.hiddenCondition = this.contextCallback(callback);

    return this;
  }

  public requireDocument(options: { name: string, description?: string, id?: string, required?: ((context: any) => boolean) | boolean }): this {
    const documentRequest: DocumentRequest = {
      id: uuid(),
      description: "",
      required: true,
      ...options
    };
    this.documents.push(documentRequest);
    return this;
  }

  public defaultTo<Z>(defaultValue: ((context: QuestionContext) => Z) | Z): this {
    if (defaultValue instanceof Function && typeof defaultValue === "function") {
      this.defaultValue = ctx => defaultValue(this.questionContextCallback(ctx));
    } else {
      this.defaultValue = () => defaultValue;
    }

    return this;
  }

  public abstract build(): T;

  public buildEntry(): QuestionEntry<T> {
    return {
      question: this.build(),
      defaultValue: this.defaultValue,
      isHidden: this.hiddenCondition,
      conditions: this.conditions
    };
  }

  protected contextCallback(callback: (context: QuestionContext) => boolean): (ctx) => boolean {
    return ctx => callback(this.questionContextCallback(ctx));
  }
}
