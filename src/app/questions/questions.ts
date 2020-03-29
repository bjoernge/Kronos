import {buildQuestionary} from "../shared/QuestionaryBuilder";

export const part1 = buildQuestionary("part1")
  .addQuestionContainer("card1", c => c
    .askText("q1", c => c.defaultTo("hide"))
    .askText("q2", f => f
      .hideIf(ctx => ctx.get("q1") === "hide")
      .showHint()
    )
    .askYesNoQuestion("q3", f => f
      .insteadOfYesSay("hello World!"))
    .printInfo("q4", f => f.showHint())
    .askForDate("q5", f => f.showAsPopup())
    .askMultipleChoiceQuestion("q4", c => c.option("option1", "1").option("option2", "2"))
  )
  .addQuestionContainer("card2", c => c
    .askText("q3", f => f
      .hideIf(ctx => ctx.get("q1", "card1") === "hide")
      .defaultTo("Test Q3")
    )
  )
  .build();
