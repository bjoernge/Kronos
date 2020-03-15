import {sandboxOf} from 'angular-playground';
import {QuestionaryComponent} from './questionary.component';
import {QuestionsModule} from '../questions.module';
import {QuestionContainer} from '../../../models/questions/questionContainer';
import {TextQuestion} from '../../../models/questions/textQuestion';
import {MultipleChoiceQuestion} from '../../../models/questions/multipleChoiceQuestion';

export default sandboxOf(QuestionaryComponent, {
  declareComponent: false,
  imports: [QuestionsModule]
})
  .add('default', {
    template: `<app-questionary [questionContainer]="questionContainer"></app-questionary>`,
    context: {
      questionContainer: {
        title: 'testQuestionTitle',
        description: 'testQuestionDescription',
        questionEntries: [
          {
            question: new TextQuestion('textQuestion1', 'enterSomeText'),
          },
          {
            question: new MultipleChoiceQuestion('multipleChoiceQuestion1', 'whatDoYouChoose', [
              {
                value: 'option1',
                text: 'Option1'
              }, {
                value: 'option2',
                text: 'Option2'
              },
            ])
          }
        ]
      } as QuestionContainer
    }
  })
  .add('conditional questions', {
    template: `<app-questionary [questionContainer]="questionContainer"></app-questionary>`,
    context: {
      questionContainer: {
        title: 'testQuestionTitle',
        description: 'testQuestionDescription',
        questionEntries: [
          {
            question: new MultipleChoiceQuestion('multipleChoiceQuestion1', 'whatDoYouChoose', [
              {
                value: 'option1',
                text: 'Option1'
              }, {
                value: 'option2',
                text: 'Option2'
              },
            ])
          },
          {
            question: new TextQuestion('textQuestion1', 'enterSomeText'),
            isHidden: context => context.multipleChoiceQuestion1 !== 'option1'
          },
        ]
      } as QuestionContainer
    }
  })
  .add('conditional default', {
    template: `<app-questionary [questionContainer]="questionContainer"></app-questionary>`,
    context: {
      questionContainer: {
        title: 'testQuestionTitle',
        description: 'testQuestionDescription',
        questionEntries: [
          {
            question: new MultipleChoiceQuestion('multipleChoiceQuestion1', 'whatDoYouChoose', [
              {
                value: 'option1',
                text: 'Option1'
              }, {
                value: 'option2',
                text: 'Option2'
              },
            ])
          },
          {
            question: new TextQuestion('textQuestion1', 'enterSomeText'),
            defaultValue: context => context.multipleChoiceQuestion1 === 'option1' ? 'You chose option1' : 'You chose option2'
          },
        ]
      } as QuestionContainer
    }
  });
