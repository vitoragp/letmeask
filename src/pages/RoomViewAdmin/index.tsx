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
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { ReplyRepository } from "../../repositories/ReplyRepository";
import { useAuth } from "../../hooks/Auth";

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
  const auth = useAuth();
  const history = useHistory();

  const closeRoomModalRef = React.useRef<HTMLDivElement>();
  const deleteQuestionModalRef = React.useRef<HTMLDivElement>();
  const answerQuestionModalRef = React.useRef<HTMLDivElement>();

  const [answerQuestion, setAnswerQuestion] = React.useState<Question>();
  const [deleteQuestion, setDeleteQuestion] = React.useState<Question>();
  const [responseText, setResponseText] = React.useState<string>("");
  const [room, setRoom] = React.useState<Room>();

  React.useEffect(() => {
    if (params.id) {
      if (auth.ready && !auth.user) {
        console.log("CHECK");
        history.replace("/room/" + params.id);
        return;
      }

      const repository = new RoomRepository();
      repository.get(params.id).then((roomData) => {
        if (!roomData || !roomData.active) {
          history.replace("/");
          return;
        }
        setRoom(roomData);
      });
    } else {
      history.replace("/");
    }
  }, [params.id]);

  React.useEffect(() => {
    if (room !== undefined && room?.authorId !== auth.user?.id) {
      history.replace("/room/" + room?.id);
    }
  }, [auth.user, room]);

  /***
   * EVENT: handleCloseRoomModal
   */

  function handleCloseRoomModal() {
    closeRoomModalRef.current.classList.add("show");
  }

  /***
   * EVENT: handleCloseRoomModalCancel
   */

  function handleCloseRoomModalCancel() {
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

  async function handleCheckAction(question: Question) {
    const questionRepository = new QuestionRepository(params.id);
    questionRepository.update({ ...question, answered: !question.answered });

    const roomRepository = new RoomRepository();
    roomRepository.get(params.id).then((roomData) => {
      setRoom(roomData);
    });
  }

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

  async function handleDeleteAction(question: Question) {
    setDeleteQuestion(question);
    deleteQuestionModalRef.current.classList.add("show");
  }

  /***
   * EVENT: handleDeleteModalCancel
   */

  function handleDeleteModalCancel() {
    setDeleteQuestion(undefined);
    deleteQuestionModalRef.current.classList.remove("show");
  }

  /***
   * EVENT: handleDeleteQuestion
   */

  async function handleDeleteQuestion() {
    const questionRepository = new QuestionRepository(params.id);
    await questionRepository.delete(deleteQuestion);

    const roomRepository = new RoomRepository();
    roomRepository.get(params.id).then((roomData) => {
      setRoom(roomData);
      setDeleteQuestion(undefined);
    });

    deleteQuestionModalRef.current.classList.remove("show");
  }

  /***
   * EVENT: handleSendResponse
   */

  async function handleSendResponse() {
    const replyRepository = new ReplyRepository(params.id, answerQuestion.id);
    await replyRepository.create({
      body: responseText,
      authorId: auth.user?.id,
      authorName: auth.user?.name,
      authorAvatar: auth.user?.avatar,
    });

    setAnswerQuestion(undefined);
    setResponseText("");

    const roomRepository = new RoomRepository();
    roomRepository.get(params.id).then((roomData) => {
      setRoom(roomData);
    });

    answerQuestionModalRef.current.classList.remove("show");
  }

  /***
   * handleLogout
   */

  function handleLogout() {
    auth.signOut();
  }

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
          <textarea value={answerQuestion.body} readOnly></textarea>
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

          <Button
            label="Responder"
            className="primary"
            onClick={handleSendResponse}
          />
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
              onClick={handleCloseRoomModalCancel}
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
        <div className="form">
          <img src={Res.InfoSvg} />
          <h1>Deletar pergunta</h1>
          <p>Tem certeza que você deseja deletar esta pergunta?</p>
          <div>
            <Button
              label="Cancelar"
              className="secondary"
              onClick={handleDeleteModalCancel}
            />

            <Button
              label="Sim, encerrar"
              className="quaternary"
              onClick={handleDeleteQuestion}
            />
          </div>
        </div>
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
            <Button label="Sair" className="tertiary" onClick={handleLogout} />
          </div>
        </header>

        <section>
          <Loading state={room === undefined}>
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
