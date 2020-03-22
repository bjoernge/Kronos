import {QuestionBuilder} from "./QuestionBuilder";
import {CalendarQuestion} from "../models/questions/calendarQuestion";

export class CalendarQuestionBuilder extends QuestionBuilder<CalendarQuestion> {
  private displayType: "textBox" | "embedded" | "popup";

  public showAsTextBox(): this {
    this.displayType = "textBox";
    return this;
  }

  public showAsEmbedded(): this {
    this.displayType = "embedded";
    return this;
  }

  public showAsPopup(): this {
    this.displayType = "popup";
    return this;
  }

  public build(): CalendarQuestion {
    return new CalendarQuestion({
      id: this.id,
      text: this.text,
      hint: this.hintText,
      documents: this.documents,
      calendarType: this.displayType
    });
  }
}
