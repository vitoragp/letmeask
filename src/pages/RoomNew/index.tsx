import * as React from "react";

import * as Res from "../../assets/Resources";

import "./styles.scss";

/***
 * RoomNew
 */

export function RoomNew() {
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
      <div className="right-container"></div>
    </div>
  );
}
