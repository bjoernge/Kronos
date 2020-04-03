import {buildQuestionary} from "../shared/QuestionaryBuilder";

export enum Gender {
  Male,
  Female,
}

export const part1 = buildQuestionary("part1")
  .addQuestionContainer("card1", c => c
    .askText("firstname")
    .askText("name", f => f
      .hideIf(ctx => ctx.is("q1", "hide")))
    .askYesNoQuestion("q_birthname")
    .askText("birthname", f => f
      .hideIf(ctx => ctx.is("q_birthname", false, null)))
    .askMultipleChoiceQuestion("sex", c => c.option("male", "Gender.Male").option("female", "1"))
    .askForDate("birthdate", f => f.showAsPopup())
    .askText("birthplace", f => f.showHint())
    .askMultipleChoiceQuestion("foreveralone", c => c
      .option("alone", 1)
      .option("married", 2)
      .option("seperated", 3)
      .option("weathered", 4)
      .option("divorced", 5))
    .askForDate("status_since", f => f
      .hideIf(ctx => ctx.is("foreveralone", 1, null))
      .showAsPopup())
    .askYesNoQuestion("german_nationality")
    .askText("nationality", f => f
      .hideIf(ctx => ctx.get("german_nationality") !== false)
      .showHint())
    .askText("partner_nationality", f => f
      .hideIf(ctx => ctx.is("foreveralone", 1, 3, 4, null)))
    .askText("tax_ident", f => f.showHint())
  )
  .addQuestionContainer("card2", c => c
    .askYesNoQuestion("q_parents")
    .askText("q3", f => f
      .hideIf(ctx => ctx.is_n("firstname", "card1", "hide"))
      .defaultTo("Test Q3")
    )
  )
  .build();
