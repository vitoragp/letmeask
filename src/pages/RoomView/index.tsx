import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { QuestionList } from "../../components/QuestionList";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../hooks/Auth";
import { Room } from "../../models/Room";
import { RoomRepository } from "../../repositories/RoomRepository";

import * as Res from "../../assets/Resources";

import { Button } from "../../components/Button";
import { QuestionRepository } from "../../repositories/QuestionRepository";

import "./styles.scss";

/***
 * RoomViewParams
 */

type RoomViewParams = {
  id: string;
};

/***
 * RoomView
 */

export function RoomView() {
  const params = useParams<RoomViewParams>();
  const history = useHistory();
  const auth = useAuth();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [room, setRoom] = React.useState<Room>();
  const [questionBody, setQuestionBody] = React.useState<string>("");

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
   * handleLogout
   */

  function handleLogout() {
    auth.signOut();
  }

  /***
   * handleLogin
   */

  function handleLogin() {
    auth.signWithGoogle();
  }

  /***
   * handleSendQuestion
   */

  async function handleSendQuestion() {
    if (questionBody.trim() === "") {
      return;
    }

    const questionRepository = new QuestionRepository(params.id);
    await questionRepository.create({
      body: questionBody,
      authorName: auth.user?.name,
      authorAvatar: auth.user?.avatar,
      authorId: auth.user?.id,
      createdAt: new Date(),
      answered: false,
      likeCount: 0,
    });

    const roomRepository = new RoomRepository();
    roomRepository.get(params.id).then((roomData) => {
      setRoom(roomData);
      setQuestionBody("");
    });
  }

  /***
   * handleChangeQuestionBody
   */

  function handleChangeQuestionBody(
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setQuestionBody(evt.target.value);
  }

  /***
   * renderBadge
   */

  function renderBadge() {
    return room?.questions?.length > 1 ? (
      <span className="badge">{room?.questions?.length} perguntas</span>
    ) : (
      <span className="badge">{room?.questions?.length} pergunta</span>
    );
  }

  /***
   * renderQuestions
   */

  function renderQuestions() {
    return <QuestionList data={room?.questions} roomCode={params.id} />;
  }

  /***
   * renderEmpty
   */

  function renderEmpty() {
    return (
      <div className="empty-container">
        <img src={Res.EmptyQuestionsSvg} />
        <h1>Nenhuma pergunta por aqui...</h1>
        <p>
          Faça o seu login e seja a primeira pessoa a <br /> fazer uma pergunta!
        </p>
      </div>
    );
  }

  return (
    <div className="room-view__page">
      <header>
        <img src={Res.LogoSvg} alt="Letmeask" />
        <div className="left-menu">
          <RoomCode code={params.id} />
          {auth.user && (
            <Button label="Sair" className="tertiary" onClick={handleLogout} />
          )}
        </div>
      </header>

      <section>
        <Loading state={loading}>
          <div className="content">
            <h1>
              {room?.title} {room?.questions?.length > 0 && renderBadge()}
            </h1>

            <div className="message-form">
              <div className="body">
                <textarea
                  onChange={handleChangeQuestionBody}
                  value={questionBody}
                ></textarea>
              </div>
              <div className="footer">
                <div className="info">
                  {!auth.user ? (
                    <p>
                      Para enviar uma pergunta,{" "}
                      <a onClick={handleLogin}>faça seu login</a>.
                    </p>
                  ) : (
                    <>
                      <img src={auth.user?.avatar} />
                      <p>{auth.user?.name}</p>
                    </>
                  )}
                </div>
                <div className="actions">
                  <Button
                    label="Enviar pergunta"
                    className="primary"
                    disabled={!auth.user || auth.user?.id === room?.authorId}
                    onClick={handleSendQuestion}
                  />
                </div>
              </div>
            </div>

            <div className="messages">
              {room?.questions.length ? renderQuestions() : renderEmpty()}
            </div>
          </div>
        </Loading>
      </section>
    </div>
  );
}
