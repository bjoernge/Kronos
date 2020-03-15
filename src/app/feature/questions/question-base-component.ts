import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../models/questions/question';
import {FormControl} from '@angular/forms';

export abstract class QuestionBaseComponent<TQuestion extends Question, TAnswer> implements OnInit {

  @Output()
  public questionAnswered: EventEmitter<TAnswer> = new EventEmitter<TAnswer>();

  @Input()
  public question: TQuestion;

  @Input()
  public control: FormControl;

  public ngOnInit(): void {
  }

  protected answer(answer?: TAnswer): void {
    if (answer === undefined) {
      answer = this.control.value;
    }

    this.questionAnswered.emit(answer);
  }

  protected reset(): void {
    this.control.reset();
  }
}
