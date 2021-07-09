import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

import * as Res from "../../assets/Resources";
import { Loading } from "../../components/Loading";
import { RoomCode } from "../../components/RoomCode";
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
  const history = useHistory();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (params.id) {
      const repository = new RoomRepository();

      repository.get(params.id).then((room) => {
        if (!room) {
          history.replace("/");
        }
        setLoading(false);
      });
    } else {
      history.replace("/");
    }
  }, [params.id]);

  return (
    <div className="room-view__page">
      <header>
        <img src={Res.LogoSvg} alt="Letmeask" />
        <RoomCode code={params.id} />
      </header>

      <section>
        <Loading state={loading}>
          <div>Content</div>
        </Loading>
      </section>
    </div>
  );
}
