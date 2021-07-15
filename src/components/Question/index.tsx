import * as React from "react";

import { useAuth } from "../../hooks/Auth";
import { Question as QuestionModel } from "../../models/Question";
import { Action } from "./Action";
import { QuestionContextProvider } from "./Context";

import "./styles.scss";

/***
 * QuestionProps
 */
type QuestionProps = {
  data: QuestionModel;
  admin?: boolean;
  roomCode: string;
  children?: React.ReactNode;
};

/***
 * Question
 */

function Question(props: QuestionProps) {
  const auth = useAuth();
  const [pending, setPending] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(
    props.data.likeCount
  );

  /*
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
  */

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
            {props.children}
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
