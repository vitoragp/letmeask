import * as React from "react";
import { Reply as ReplyModel } from "../../models/Reply";
import { QuestionContext } from "../Question/Context";

import "./styles.scss";

/***
 * ReplyProps
 */

type ReplyProps = {
  data: ReplyModel;
};

/***
 * Reply
 */

export function Reply(props: ReplyProps) {
  const context = React.useContext(QuestionContext);
  const classNames = ["reply__component"];
  const isAuth = context.question?.authorId === props.data.authorId;

  console.log("render reply");

  if (isAuth) {
    classNames.push("owner");
  }

  return (
    <div className={classNames.join(" ")}>
      <div>{props.data.authorName}, disse:</div>
      <div className="body">{props.data.body}</div>
    </div>
  );
}
