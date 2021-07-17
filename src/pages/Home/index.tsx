import * as React from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

import * as Res from "../../assets/Resources";

import "./styles.scss";
import { RoomRepository } from "../../repositories/RoomRepository";

/***
 * Home
 */

export function Home() {
  const history = useHistory();
  const auth = useAuth();

  const [roomCode, setRoomCode] = React.useState<string>();

  /***
   * handleGoogleSignIn
   */

  async function handleGoogleSignIn() {
    await auth.signWithGoogle();
    history.push("/room/new");
  }

  /***
   * handleEnterRoom
   */

  async function handleEnterRoom() {
    if (roomCode.trim() === "") {
      return;
    }

    const roomRepository = new RoomRepository();
    const room = await roomRepository.get(roomCode);

    if (room) {
      if (auth.user?.id === room.authorId) {
        history.push("/room/admin/" + room.id);
      } else {
        history.push("/room/" + room.id);
      }
    }
  }

  /***
   * handleChangeRoomCode
   */

  function handleChangeRoomCode(value: string) {
    setRoomCode(value);
  }

  return (
    <div className="home__page">
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
          <img src={Res.LogoSvg} alt="Letmeask" />

          <Button
            label="Crie sua sala com o Google"
            icon={Res.GoogleIconSvg}
            className="quaternary fill"
            onClick={handleGoogleSignIn}
          />

          <div className="separator">ou entre em uma sala</div>

          <form>
            <div className="form-control">
              <Input
                placeholder="Digite o código da sala"
                onChange={handleChangeRoomCode}
              />
            </div>

            <Button
              label="Entrar na sala"
              icon={Res.LogInSvg}
              className="primary fill"
              onClick={handleEnterRoom}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
