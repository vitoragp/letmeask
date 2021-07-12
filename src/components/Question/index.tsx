import * as React from "react";

import { Question as QuestionModel } from "../../models/Question";

import * as Res from "../../assets/Resources";

import "./styles.scss";

/***
 * QuestionProps
 */
type QuestionProps = {
  data: QuestionModel;
  admin?: boolean;
  roomCode: string;
};

/***
 * Question
 */

export function Question(props: QuestionProps) {
  /***
   * renderAdminToolbar
   */

  function renderAdminToolbar() {
    return <></>;
  }

  /***
   * renderUserToolbar
   */

  function renderUserToolbar() {
    /***
     * handleLike
     */

    function handleLike() {}

    return (
      <>
        <a onClick={handleLike}>
          <span>{props.data.likes > 0 && props.data.likes}</span>
          <img src={Res.LikeSvg} alt="" />
        </a>
      </>
    );
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
          {props.admin ? renderAdminToolbar() : renderUserToolbar()}
        </div>
      </div>
    </div>
  );
}
