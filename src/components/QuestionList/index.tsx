import * as React from "react";

import { Question } from "../../models/Question";
import { Question as QuestionComponent } from "../Question";

/***
 * QuestionListProps
 */

type QuestionListProps = {
  data: Question[];
  children?: React.ReactNode;
};

/***
 * QuestionList
 */

export function QuestionList(props: QuestionListProps) {
  /***
   * renderQuestion
   */
  function renderQuestion(question: Question) {
    return (
      <QuestionComponent data={question} key={question.id}>
        {props.children}
      </QuestionComponent>
    );
  }

  /***
   * sortQuestions
   */

  function sortQuestions(a: Question, b: Question) {
    if (a.answered && !b.answered) {
      return 1;
    }
    if (!a.answered && b.answered) {
      return -1;
    }
    return 0;
  }

  return (
    <div className="question-list__component">
      {props.data.sort(sortQuestions).map(renderQuestion)}
    </div>
  );
}
