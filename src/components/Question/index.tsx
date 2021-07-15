import * as React from "react";

import { Question as QuestionModel } from "../../models/Question";
import { ReplyList } from "../ReplyList";
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
    <QuestionContextProvider value={{ question: props.data }}>
      <div className="question__component">
        <div className="body">
          <p>{props.data.body}</p>
          <div className="replies">
            <ReplyList data={props.data.replies} />
          </div>
        </div>
        <div className="footer">
          <div className="info">
            <img src={props.data.authorAvatar} />
            <p>{props.data.authorName}</p>
          </div>

          <div className="actions">
            {React.Children.map(props.children, renderChild)}
          </div>
        </div>
      </div>
    </QuestionContextProvider>
  );
}

/***
 * Export
 */

export { Question, Action };
