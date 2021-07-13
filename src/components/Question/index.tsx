import * as React from "react";

import { Question as QuestionModel } from "../../models/Question";

import * as Res from "../../assets/Resources";

import { LikeRepository } from "../../repositories/LikeRepository";
import { useAuth } from "../../hooks/Auth";

import "./styles.scss";
import { QuestionRepository } from "../../repositories/QuestionRepository";

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
  const [likeCount, setLikeCount] = React.useState<number>(
    props.data.likeCount
  );

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

    async function handleLike() {
      if (props.data.authorId === auth.user.id) {
        return;
      }

      const questionRepository = new QuestionRepository(props.roomCode);
      const likeRepository = new LikeRepository(props.roomCode, props.data.id);
      const likes = await likeRepository.getAll();
      const like = likes?.filter((like) => like.authorId === auth.user?.id);

      if (like?.length) {
        likeRepository.delete(like[0]);

        questionRepository.update({
          ...props.data,
          likeCount: props.data.likeCount - 1,
        });

        setLikeCount(props.data.likeCount - 1);
      } else {
        await likeRepository.create({
          authorId: auth.user.id,
        });

        questionRepository.update({
          ...props.data,
          likeCount: props.data.likeCount + 1,
        });

        setLikeCount(props.data.likeCount + 1);
      }
    }

    return (
      <>
        <a
          onClick={handleLike}
          className={props.data.authorId === auth.user?.id ? "disabled" : ""}
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
