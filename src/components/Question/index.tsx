import * as React from "react";

import { Question as QuestionModel } from "../../models/Question";
import { Action } from "./Action";
import { QuestionContextProvider } from "./Context";

import "./styles.scss";

/***
 * QuestionProps
 */
type QuestionProps = {
  data: QuestionModel;
  children?: React.ReactNode;
};

/***
 * Question
 */

function Question(props: QuestionProps) {
  /***
   * renderChild
   */

  function renderChild(child: React.ReactElement) {
    return child.type === Action ? child : null;
  }

  return (
    <div className="question__component">
      <div className="body">{props.data.body}</div>
      <div className="footer">
        <div className="info">
          <img src={props.data.authorAvatar} />
          <p>{props.data.authorName}</p>
        </div>

        <div className="actions">
          <QuestionContextProvider value={{ question: props.data }}>
            {React.Children.map(props.children, renderChild)}
          </QuestionContextProvider>
        </div>
      </div>
    </div>
  );
}

/***
 * Export
 */

export { Question, Action };
