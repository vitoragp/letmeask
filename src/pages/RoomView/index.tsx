import * as React from "react";

import * as Res from "../../assets/Resources";

import "./styles.scss";

/***
 * RoomView
 */

export function RoomView() {
  return (
    <div className="room-view__page">
      <header>
        <img src={Res.LogoSvg} alt="Letmeask" />
      </header>
      <section>
        <p>teste</p>
      </section>
    </div>
  );
}
