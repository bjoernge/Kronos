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
      .hideIf(ctx => ctx.is("german_nationality", true, null))
      .showHint())
    .askText("partner_nationality", f => f
      .hideIf(ctx => ctx.is("foreveralone", 1, 3, 4, null)))
    .askText("tax_ident", f => f.showHint())
  )

  .addQuestionContainer("card2", c => c
    .askYesNoQuestion("q_parents")
    .printInfo("main_adress", f => f
      .hideIf(ctx => ctx.is("q_parents", null)))
    .askText("street", f => f
      .hideIf(ctx => ctx.is("q_parents", null)))
    .askText("zip", f => f
      .hideIf(ctx => ctx.is("q_parents", null)))
    .askText("city", f => f
      .hideIf(ctx => ctx.is("q_parents", null)))
    .askText("out_of_country", f => f
      .hideIf(ctx => ctx.is("q_parents", null))
      .showHint()
      .defaultTo("DE"))
    .askText("bell", f => f
     .hideIf(ctx => ctx.is("q_parents", null))
     .showHint())
    .askYesNoQuestion("know_adress", f => f
      .hideIf(ctx => ctx.is("q_parents", true, null)))
    .printInfo("sec_adress", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null)))
    .askText("sec_street", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null)))
    .askText("sec_zip", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null)))
    .askText("sec_city", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null)))
   .askText("sec_out_of_country", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null))
      .showHint()
      .defaultTo("DE"))
   .askText("sec_bell", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null))
      .showHint())

    .askText("q3", f => f
      .hideIf(ctx => ctx.is_n("firstname", "card1", "hide"))
      .defaultTo("Test Q3")
    )
  )
  .build();
