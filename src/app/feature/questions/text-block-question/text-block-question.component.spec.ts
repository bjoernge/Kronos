import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBlockQuestionComponent } from './text-block-question.component';

describe('TextBlockQuestionComponent', () => {
  let component: TextBlockQuestionComponent;
  let fixture: ComponentFixture<TextBlockQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextBlockQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextBlockQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
