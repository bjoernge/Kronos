import {buildQuestionary} from "../shared/QuestionaryBuilder";

export const part1 = buildQuestionary("part1")
  .addQuestionContainer("card1", c => c
    .askText("q1")
    .askText("q2", f => f
      .hideIf(ctx => ctx.get("q1") === "hide")
    )
    .askYesNoQuestion("q3", f => f
      .insteadOfYesSay("hello World!"))
    .printInfo("q4", f => f.showHint())
  )
  .addQuestionContainer("card2", c => c
    .askText("q3", f => f
      .hideIf(ctx => ctx.get("q1", "card1") === "hide")
      .defaultTo("Test Q3")
    ))
  .build();
