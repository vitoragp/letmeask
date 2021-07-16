import * as React from "react";
import * as Res from "../../assets/Resources";

import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/Auth";

import { RoomRepository } from "../../repositories/RoomRepository";

import "./styles.scss";

/***
 * RoomNewPage
 */

function RoomNewPage() {
  const auth = useAuth();
  const history = useHistory();

  const [roomName, setRoomName] = React.useState<string>();

  /***
   * handleChangeRoomName
   */

  function handleChangeRoomName(value: string) {
    setRoomName(value);
  }

  /***
   * handleCreateRoom
   */

  async function handleCreateRoom() {
    if (roomName.trim() === "") {
      return;
    }
    const repository = new RoomRepository();

    const room = await repository.create({
      title: roomName,
      active: true,
      authorId: auth.user?.id,
    });

    history.push("/room/admin/" + room.id);
  }

  return (
    <div className="room-new__page">
      <div className="left-container">
        <img src={Res.IllustrationSvg} alt="Letmeask" />
        <h1>
          Quase toda pergunta tem
          <br /> uma resposta.
        </h1>
        <p>
          Aprenda e compartilhe conhecimento <br /> com outras pessoas
        </p>
      </div>
      <div className="right-container">
        <div className="form-container">
          <img src={Res.LogoSvg} alt="" />

          <h1>Crie uma nova sala</h1>

          <form>
            <div className="form-control">
              <Input
                placeholder="Nome da sala"
                onChange={handleChangeRoomName}
              />
            </div>

            <Button
              label="Criar sala"
              className="primary fill"
              onClick={handleCreateRoom}
            />
          </form>

          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const RoomNew = /*AuthPage*/ RoomNewPage;
