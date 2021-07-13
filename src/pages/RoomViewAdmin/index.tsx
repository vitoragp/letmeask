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
   * renderQuestions
   */

  function renderQuestions() {
    return <QuestionList data={room.questions} />;
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
    <div className="room-view-admin__page">
      <header>
        <img src={Res.LogoSvg} alt="Letmeask" />
        <div className="left-menu">
          <RoomCode code={params.id} />
          <Button label="Encerrar sala" className="tertiary" />
        </div>
      </header>

      <section>
        <Loading state={loading}>
          <h1>{room?.title}</h1>
          <div className="content">
            {room?.questions.length ? renderQuestions() : renderEmpty()}
          </div>
        </Loading>
      </section>
    </div>
  );
}