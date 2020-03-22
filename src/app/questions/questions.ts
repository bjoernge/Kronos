import {Questionary} from '../models/questions/questionContainer';
import {TextQuestion} from '../models/questions/textQuestion';
import {buildQuestionary} from '../shared/QuestionaryBuilder';

export const part2 = buildQuestionary('part1')
  .addQuestionContainer('card1')
  .askText('q1')
  .done()
  .askText('q2')
  .hideIf(ctx => ctx.get('q1') === 'hide')
  .done()
  .done()
  .addQuestionContainer('card2')
  .askText('q3')
  .hideIf(ctx => ctx.get('q1', 'card1') === 'hide')
  .defaultTo('Test Q3')
  .done()
  .done()
  .build();

export const part1: Questionary = {
  title: 'part1.title',
  questionContainers: [
    {
      namespace: 'q1.part1',
      title: 'q1.part1.title',
      description: 'q1.part1.description',
      questionEntries: [
        {
          question: TextQuestion.fromId('q1.part1', 'universityName'),
        },
        {
          question: TextQuestion.fromId('q1.part1', 'universityName'),
        }
      ]
    }
  ]
};
