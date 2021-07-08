import * as React from "react";
import { useParams } from "react-router-dom";

import * as Res from "../../assets/Resources";
import { RoomRepository } from "../../repositories/RoomRepository";

import "./styles.scss";

/***
 * RoomViewProps
 */

type RoomViewProps = {
  admin?: boolean;
};

/***
 * RoomViewParams
 */

type RoomViewParams = {
  id: string;
};

/***
 * RoomView
 */

export function RoomView(props: RoomViewProps) {
  const params = useParams<RoomViewParams>();

  React.useEffect(() => {
    const repository = new RoomRepository();

    repository.get(params.id).then((room) => {});
  });

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
