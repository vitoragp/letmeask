import * as React from "react";

import { Question } from "../../models/Question";
import { Question as QuestionComponent } from "../Question";

/***
 * QuestionListProps
 */

type QuestionListProps = {
  data: Question[];
  admin?: boolean;
  roomCode: string;
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
      <QuestionComponent
        data={question}
        admin={props.admin}
        roomCode={props.roomCode}
        key={question.id}
      >
        {props.children}
      </QuestionComponent>
    );
  }

  return (
    <div className="question-list__component">
      {props.data.map(renderQuestion)}
    </div>
  );
}
