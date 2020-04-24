import {QuestionContainerBuilder} from "@shared/builder/questionContainerBuilder";
import {Questionary, QuestionContainer} from "@models/questions";
import {FormBuilder} from "@shared/builder/formBuilder";
import {PDF_FORMS} from "../../questions/pdfForms";


export function buildQuestionary(id: string, title: string = id): QuestionaryBuilder {
  return new QuestionaryBuilder(title);
}

export class QuestionaryBuilder {
  private containers: QuestionContainer[] = [];
  private formBuilder: FormBuilder = new FormBuilder();

  public constructor(private id: string, private title: string = id) {
  }

  public withTitle(title: string) {
    this.title = title;
  }

  public useForm(formName: keyof typeof PDF_FORMS, callback?: (formBuilder: FormBuilder) => void): QuestionaryBuilder {
    this.formBuilder.setFormName(formName);

    callback && callback(this.formBuilder);

    return this;
  }

  public addQuestionContainer(namespace: string,
                              callback: (builder: QuestionContainerBuilder) => QuestionContainerBuilder): QuestionaryBuilder {
    const builder = new QuestionContainerBuilder(namespace, "questions." + this.id + "." + namespace, this.formBuilder);
    const container = callback(builder).build();
    this.containers.push(container);
    return this;
  }

  public build(): Questionary {
    return {
      id: this.id,
      title: this.title,
      questionContainers: this.containers,
      formMapping: this.formBuilder.build()
    };
  }
}
