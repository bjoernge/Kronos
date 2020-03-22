import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarQuestionComponent } from './calendar-question.component';

describe('CalendarQuestionComponent', () => {
  let component: CalendarQuestionComponent;
  let fixture: ComponentFixture<CalendarQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
