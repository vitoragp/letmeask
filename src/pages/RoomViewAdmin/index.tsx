import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

import * as Res from "../../assets/Resources";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { Action } from "../../components/Question";
import { QuestionList } from "../../components/QuestionList";
import { RoomCode } from "../../components/RoomCode";
import { Room } from "../../models/Room";
import { RoomRepository } from "../../repositories/RoomRepository";
import { Badge } from "../RoomView/components/Badge";
import { Question } from "../../models/Question";

import "./styles.scss";

/***
 * RoomViewParams
 */

type RoomViewAdminParams = {
  id: string;
};

/***
 * RoomViewAdmin
 */

export function RoomViewAdmin() {
  const params = useParams<RoomViewAdminParams>();
  const history = useHistory();

  const closeRoomModalRef = React.useRef<HTMLDivElement>();
  const deleteQuestionModalRef = React.useRef<HTMLDivElement>();
  const answerQuestionModalRef = React.useRef<HTMLDivElement>();

  const [answerQuestion, setAnswerQuestion] = React.useState<Question>();
  const [responseText, setResponseText] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [room, setRoom] = React.useState<Room>();

  React.useEffect(() => {
    if (params.id) {
      const repository = new RoomRepository();

      repository.get(params.id).then((roomData) => {
        if (!roomData) {
          history.replace("/");
        }
        setRoom(roomData);
        setLoading(false);
      });
    } else {
      history.replace("/");
    }
  }, [params.id]);

  /***
   * EVENT: handleCloseRoomModal
   */

  function handleCloseRoomModal() {
    closeRoomModalRef.current.classList.add("show");
  }

  /***
   * EVENT: handleModalCancel
   */

  function handleModalCancel() {
    closeRoomModalRef.current.classList.remove("show");
  }

  /***
   * EVENT: handleCloseRoom
   */

  async function handleCloseRoom() {
    const repository = new RoomRepository();
    await repository.update({ ...room, active: false });
    history.replace("/");
  }

  /***
   * EVENT: handleCheckAction
   */

  async function handleCheckAction(question: Question) {}

  /***
   * EVENT: handleAnswerAction
   */

  async function handleAnswerAction(question: Question) {
    setAnswerQuestion(question);
    setResponseText("");
    answerQuestionModalRef.current.classList.add("show");
  }

  /***
   * handleCloseAnswerModal
   */

  function handleCloseAnswerModal() {
    setAnswerQuestion(undefined);
    setResponseText("");
    answerQuestionModalRef.current.classList.remove("show");
  }

  /***
   * EVENT: handleDeleteAction
   */

  async function handleDeleteAction(question: Question) {}

  /***
   * FUNCTION: renderQuestions
   */

  function renderQuestions() {
    return (
      <QuestionList data={room.questions}>
        <Action icon={Res.CheckSvg} onClick={handleCheckAction} />
        <Action icon={Res.AnswerSvg} onClick={handleAnswerAction} />
        <Action icon={Res.DeleteSvg} onClick={handleDeleteAction} />
      </QuestionList>
    );
  }

  /***
   * FUNCTION: renderEmpty
   */

  function renderEmpty() {
    return (
      <div className="empty-container">
        <div>
          <img src={Res.EmptyQuestionsSvg} />
          <h1>Nenhuma pergunta por aqui...</h1>
          <p>
            Envie o código desta sala para seus amigos e <br /> comece a
            responder perguntas!
          </p>
        </div>
      </div>
    );
  }

  /***
   * FUNCTION: renderAnswerQuestionForm
   */

  function renderAnswerQuestionForm() {
    return (
      <>
        <div className="answer">
          <p>
            <strong>Pergunta:</strong>
          </p>
          <textarea readOnly>{answerQuestion.body}</textarea>
          <p>Por: {answerQuestion.authorName}</p>
        </div>

        <hr />

        <div className="response">
          <p>
            <strong>Resposta:</strong>
          </p>
          <textarea
            value={responseText}
            onChange={(evt) => setResponseText(evt.target.value)}
          ></textarea>
        </div>

        <div className="button-container">
          <Button
            label="Cancelar"
            className="secondary"
            onClick={handleCloseAnswerModal}
          />
          <Button label="Responder" className="primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal" ref={closeRoomModalRef}>
        <div className="form">
          <img src={Res.InfoSvg} />
          <h1>Encerrar sala</h1>
          <p>Tem certeza que você deseja encerrar esta sala?</p>
          <div>
            <Button
              label="Cancelar"
              className="secondary"
              onClick={handleModalCancel}
            />

            <Button
              label="Sim, encerrar"
              className="quaternary"
              onClick={handleCloseRoom}
            />
          </div>
        </div>
      </div>

      <div className="modal" ref={deleteQuestionModalRef}>
        <div className="form"></div>
      </div>

      <div className="modal" ref={answerQuestionModalRef}>
        <div className="form-answer">
          {answerQuestion && renderAnswerQuestionForm()}
        </div>
      </div>

      <div className="room-view-admin__page">
        <header>
          <img src={Res.LogoSvg} alt="Letmeask" />
          <div className="left-menu">
            <RoomCode code={params.id} />
            <Button
              label="Encerrar sala"
              className="tertiary"
              onClick={handleCloseRoomModal}
            />
          </div>
        </header>

        <section>
          <Loading state={loading}>
            <h1>
              {room?.title} <Badge questionCount={room?.questions.length} />
            </h1>
            <div className="content">
              {room?.questions.length ? renderQuestions() : renderEmpty()}
            </div>
          </Loading>
        </section>
      </div>
    </>
  );
}
