import * as React from "react";

import { Question as QuestionModel } from "../../models/Question";

import * as Res from "../../assets/Resources";

import { LikeRepository } from "../../repositories/LikeRepository";
import { useAuth } from "../../hooks/Auth";

import { QuestionRepository } from "../../repositories/QuestionRepository";

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
  const auth = useAuth();
  const [pending, setPending] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(
    props.data.likeCount
  );

  /***
   * renderAdminToolbar
   */

  function renderAdminToolbar() {
    /***
     * handleAnwser
     */

    function handleAnwser() {}

    return (
      <>
        <a>
          <img src={Res.CheckSvg} alt="" />
        </a>

        <a onClick={handleAnwser}>
          <img src={Res.AnswerSvg} alt="" />
        </a>

        <a>
          <img src={Res.DeleteSvg} alt="" />
        </a>
      </>
    );
  }

  /***
   * renderUserToolbar
   */

  function renderUserToolbar() {
    /***
     * handleLike
     */

    async function handleLike() {
      if (props.data.authorId === auth.user.id || pending) {
        return;
      }
      setPending(true);

      let updatedQuestion: QuestionModel;
      const questionRepository = new QuestionRepository(props.roomCode);
      const likeRepository = new LikeRepository(props.roomCode, props.data.id);
      const likes = await likeRepository.getAll();
      const like = likes?.filter((like) => like.authorId === auth.user?.id);

      if (like?.length) {
        await likeRepository.delete(like[0]);

        updatedQuestion = await questionRepository.update({
          ...props.data,
          likeCount: likeCount - 1,
        });
      } else {
        await likeRepository.create({
          authorId: auth.user.id,
        });

        updatedQuestion = await questionRepository.update({
          ...props.data,
          likeCount: likeCount + 1,
        });
      }
      setLikeCount(updatedQuestion.likeCount);
      setPending(false);
    }

    return (
      <>
        <a
          onClick={handleLike}
          className={
            !auth.user || props.data.authorId === auth.user?.id
              ? "disabled"
              : ""
          }
        >
          <span>{likeCount > 0 && likeCount}</span>
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
