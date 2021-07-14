import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

import * as Res from "../../assets/Resources";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { QuestionList } from "../../components/QuestionList";
import { RoomCode } from "../../components/RoomCode";
import { Room } from "../../models/Room";
import { RoomRepository } from "../../repositories/RoomRepository";

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
   * handleCloseRoomModal
   */

  function handleCloseRoomModal() {
    closeRoomModalRef.current.classList.add("show");
  }

  /***
   * handleModalCancel
   */

  function handleModalCancel() {
    closeRoomModalRef.current.classList.remove("show");
  }

  /***
   * handleCloseRoom
   */

  async function handleCloseRoom() {
    const repository = new RoomRepository();
    await repository.update({ ...room, active: false });
    history.replace("/");
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
    return <QuestionList data={room.questions} roomCode={params.id} admin />;
  }

  /***
   * renderEmpty
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
              {room?.title} {room?.questions?.length > 0 && renderBadge()}
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
