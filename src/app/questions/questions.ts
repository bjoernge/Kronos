import {buildQuestionary} from "../shared/QuestionaryBuilder";

export enum Gender {
  Male,
  Female,
}

export const part1 = buildQuestionary("part1")
  .addQuestionContainer("intro", c => c
    .askMultipleChoiceQuestion("phase", c => c
      .option("school", 1)
      .option("uni", 2)
      .option("practical", 3))
    .askForDate("start_date", c => c
      .showAsPopup()
      .showHint())
    .askMultipleChoiceQuestion("time", c => c
      .option("1", 1)
      .option("2", 2)
      .option("3", 3)
      .option("4", 4)
      .option("5", 5)
      .option("6", 6)
      .option("7", 7)
      .option("8", 8)
      .option("9", 9)
      .option("10", 10)
      .option("11", 11)
      .option("12", 12)
      .showHint()
    )
    .askYesNoQuestion("aboard")
    .askYesNoQuestion("parents", c => c
      .showHint())
    .askYesNoQuestion("firsttime", c => c
      .showHint())
    .askText("institute", c => c
      .hideIf(ctx => ctx.is("firsttime", null, false)))
    .askText("number", c => c
      .hideIf(ctx => ctx.is("firsttime", null, false)))
  )

  .addQuestionContainer("", c => c)

  .addQuestionContainer("about_me", c => c
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
      .hideIf(ctx => ctx.is("german_nationality", true, null))
      .showHint())
    .askYesNoQuestion("children", f => f
      .showHint())
    .askText("tax_ident", f => f.showHint())
  )

  .addQuestionContainer("mine_adress", c => c
    .printInfo("main_adress")
    .askText("street")
    .askText("zip")
    .askText("city")
    .askText("out_of_country", f => f
      .showHint()
      .defaultTo("DE"))
    .askText("bell", f => f
     .showHint())
    .askYesNoQuestion("q_parents")
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
    .askYesNoQuestion("prop_of_parents", f => f
      .hideIf(ctx => ctx.is("know_adress", false, null) || ctx.is("q_parents", true, null)))
  )

  .addQuestionContainer("capital", c => c
    .printInfo("capital")
    .askYesNoQuestion("bar")
    .askText("bar_amount", c => c
      .hideIf(ctx => ctx.is("bar", false, null)))
    .askYesNoQuestion("bank")
    .askText("bank_amount", c => c
      .hideIf(ctx => ctx.is("bank", false, null)))
    .askYesNoQuestion("building_savings")
    .askText("building_savings_amount", c => c
      .hideIf(ctx => ctx.is("building_savings", false, null)))
    .askYesNoQuestion("retirement")
    .askText("retirement_amount", c => c
      .hideIf(ctx => ctx.is("retirement", false, null)))
    .askYesNoQuestion("kfz")
    .askText("kfz_amount", c => c
      .hideIf(ctx => ctx.is("kfz", false, null))
      .showHint())
    .askYesNoQuestion("stocks")
    .askText("buisness_assets", c => c
      .hideIf(ctx => ctx.is("stocks", false, null))
      .showHint())
    .askText("stock", c => c
      .hideIf(ctx => ctx.is("stocks", false, null))
      .showHint())
    .askYesNoQuestion("land")
    .askText("forest", c => c
      .hideIf(ctx => ctx.is("land", false, null))
      .showHint())
    .askText("vacant", c => c
      .hideIf(ctx => ctx.is("land", false, null))
      .showHint())
    .askText("built", c => c
      .hideIf(ctx => ctx.is("land", false, null))
      .showHint())
    .askYesNoQuestion("other")
    .askText("pension", c => c
      .hideIf(ctx => ctx.is("other", false, null))
      .showHint())
    .askText("other_amount", c => c
      .hideIf(ctx => ctx.is("other", false, null)))
  ) 
  .build();
