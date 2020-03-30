import {buildQuestionary} from "../shared/QuestionaryBuilder";
export enum Gender {
  Male,
  Female,
}
export const part1 = buildQuestionary("part1")
  .addQuestionContainer("card1", c => c
    .askText("firstname")
    .askText("name", f => f
      .hideIf(ctx => ctx.get("q1") === "hide"))
    .askYesNoQuestion("q_birthname")
    .askText("birthname", f => f
      .hideIf(ctx => ctx.get("q_birthname") !== true))
    .askMultipleChoiceQuestion("sex", c => c.option("male", "Gender.Male").option("female", "1"))
    .askForDate("birthdate", f => f.showAsPopup())
    .askText("birthplace", f => f.showHint())
    .askMultipleChoiceQuestion("foreveralone", c => c.option("alone", "1").option("married", "2").option("seperated", "3")
      .option("weathered", "4").option("devoced", "5"))
    .askForDate("status_since", f => f
      .hideIf(ctx => ctx.get("foreveralone") === 1 || ctx.get("foreveralone") === null)
      .showAsPopup())
    .askYesNoQuestion("german_nationality")
    .askText("nationality", f => f
      .hideIf(ctx => ctx.get("german_nationality") !== false)
      .showHint())
    .askText("partner_nationality", f => f
      .hideIf(ctx => ctx.get("foreveralone") === "5"))
    .askText("tax_ident", f => f.showHint())
  )
  .addQuestionContainer("card2", c => c
    .askYesNoQuestion("q_parents")
    .askText("q3", f => f
      .hideIf(ctx => ctx.get("firstname", "card1") === "hide")
      .defaultTo("Test Q3")
    )
  )
  .build();
