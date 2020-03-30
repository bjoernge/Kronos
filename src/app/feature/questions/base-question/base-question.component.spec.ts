import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQuestionComponent } from './base-question.component';

describe('BaseQuestionComponent', () => {
  let component: BaseQuestionComponent;
  let fixture: ComponentFixture<BaseQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
