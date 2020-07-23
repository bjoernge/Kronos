import {ListQuestion} from "@models/questions";
import {QuestionBuilder} from "@shared/builder/questionBuilder";
import {FormBuilder} from "@shared/builder/formBuilder";
import {QuestionEntryBuilder} from "@shared/builder/questionEntryBuilder";

export class ListQuestionBuilder extends QuestionBuilder<ListQuestion> {

  private readonly _entries: QuestionEntryBuilder;
  private elementCaption: string;
  private addCaption: string;


  constructor(id: string, namespace: string, formBuilder: FormBuilder) {
    super(id, namespace, formBuilder);
    this._entries = new QuestionEntryBuilder("listEntries", `${this.fqn}.listEntries`, formBuilder);
  }

  public entries(callback: (builder: QuestionEntryBuilder) => void): this {
    callback(this._entries);
    return this;
  }

  public showElementCaption(elementCaption: string = `${this.translationPrefix}.${this.id}.elementCaption`): this {
    this.elementCaption = elementCaption;
    return this;
  }

  public insteadOfAddMoreShow(addCaption: string): this {
    this.addCaption = addCaption;
    return this;
  }

  public build(): ListQuestion {
    return new ListQuestion({
      id: this.fqn,
      text: this.text,
      hint: this.hintText,
      documents: this.documents,
      placeholder: this.placeholder,
      itemQuestions: this._entries.entries,
      addCaption: this.addCaption,
      itemCaption: this.elementCaption
    });
  }
}


