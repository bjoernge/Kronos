import {buildQuestionary} from "@shared/builder";

export enum Gender {
  Male,
  Female,
}

export const questions = [
  buildQuestionary("part1")
    .useForm("Formblatt1", fb =>
      fb.addCalculatedMapping("E-Mail_w_Eingabe", ctx => ctx.get("about_me.firstname") + "@" + ctx.get("about_me.name") + ".de"))
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

    .addQuestionContainer("please_hide_me", c => c
      .hideIf(() => true))

    .addQuestionContainer("about_me", c => c
      .askText("firstname", f => f.withFormName("Vorname_Eingabe"))
      .askText("name", f => f
        .withFormName("Name_Eingabe")
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
    .addQuestionContainer("income", c => c
      .printInfo("you_will")
      .askYesNoQuestion("intership")
      .askText("intership_amount", f => f
        .hideIf(ctx => ctx.is("intership", false, null))
        .showHint())
      .askYesNoQuestion("holiday")
      .askText("holiday_amount", f => f
        .hideIf(ctx => ctx.is("holiday", false, null))
        .showHint())
      .askYesNoQuestion("service", f => f
        .hideIf(ctx => ctx.is("holiday", false, null) && ctx.is("intership", false, null))
        .showHint())
      .askYesNoQuestion("independence")
      .askText("independence_amount", f => f
        .hideIf(ctx => ctx.is("independence", false, null)))
      .askYesNoQuestion("capital")
      .askText("capital_amount", f => f
        .hideIf(ctx => ctx.is("capital", false, null))
        .showHint())
      .askYesNoQuestion("sholarship")
      .askText("sholarship_amount", f => f
        .hideIf(ctx => ctx.is("sholarship", false, null)))
      .askYesNoQuestion("bafog_regulation")
      .askText("bafog_regulation_amount", f => f
        .hideIf(ctx => ctx.is("bafog_regulation", false, null))
        .showHint())
      .askYesNoQuestion("children_entertains", f => f
        .hideIf(ctx => ctx.is_n("about_me", "children", false)))
      .askText("children_entertains_amount", f => f
        .hideIf(ctx => ctx.is("children_entertains", false, null))
        .showHint())
      .askYesNoQuestion("partner_entertains", f => f
        .hideIf(ctx => ctx.is_n("about_me", "foreveralone", 1, 3, 4, 5)))
      .askText("partner_entertains_amount", f => f
        .hideIf(ctx => ctx.is("partner_entertains", false, null))
        .showHint())
      .askYesNoQuestion("ex_partner_entertains")
      .askText("ex_partner_entertains_amount", f => f
        .hideIf(ctx => ctx.is("ex_partner_entertains", false, null))
        .showHint())
      .askYesNoQuestion("support")
      .askText("support_amount", f => f
        .hideIf(ctx => ctx.is("support", false, null))
        .showHint())
      .askText("other", f => f
        .hideIf(ctx => ctx.is("support", false, null)))
      .askYesNoQuestion("rister")
      .askText("rister_amount", f => f
        .hideIf(ctx => ctx.is("rister", false, null))
        .showHint())
      .askYesNoQuestion("pension")
      .askText("pension_amount", f => f
        .hideIf(ctx => ctx.is("pension", false, null))
        .showHint())
      .askText("other_pension", f => f
        .hideIf(ctx => ctx.is("pension", false, null)))
      .askYesNoQuestion("social")
      .askText("social_info", f => f
        .hideIf(ctx => ctx.is("social", false, null))
        .showHint())
    )

    .addQuestionContainer("debts", c => c
      .printInfo("debt")
      .askYesNoQuestion("mortgage")
      .askText("mortgage_amount", f => f
        .hideIf(ctx => ctx.is("mortgage", false, null)))
      .askYesNoQuestion("repeat")
      .askText("repeat_amount", f => f
        .hideIf(ctx => ctx.is("repeat", false, null)))
      .askYesNoQuestion("other")
      .askText("other_amount", f => f
        .hideIf(ctx => ctx.is("other", false, null))
        .showHint()))

    .addQuestionContainer("general", c => c
      .printInfo("money_info")
      .askYesNoQuestion("your_acc", f => f
        .defaultTo(true))
      .askText("whose_acc", f => f
        .hideIf(ctx => ctx.is("your_acc", true)))
      .askText("money_inst")
      .askText("iban")
      .askText("blz")
      .askText("tax_ident", f => f.showHint())
      // TODO: IMPLEMENT LOGIC
      .askMultipleChoiceQuestion("post", f => f
        .option("me_main", 1)
        .option("me_sec", 2)
        .option("mother", 3)
        .option("father", 4)
        .option("custodian", 5))
    )
    .build()
];
