import * as React from "react";

import * as Res from "../../assets/Resources";
import { useNotification } from "../../hooks/Notification";

import "./styles.scss";

/***
 * RoomCodeProps
 */

type RoomCodeProps = {
  code: string;
};

/***
 * RoomCode
 */

export function RoomCode(props: RoomCodeProps) {
  const inputRef = React.useRef<HTMLInputElement>();
  const notification = useNotification();

  /***
   * handleCopyRoomCode
   */

  function handleCopyRoomCode(event: React.MouseEvent) {
    event.preventDefault();

    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 9999);

    document.execCommand("copy");

    inputRef.current.value = "";

    notification.pushMessage("Codigo de sala copiado!");
  }

  return (
    <div className="room-code__component" onClick={handleCopyRoomCode}>
      <div className="icon">
        <img src={Res.CopySvg} />
      </div>
      <div className="text">{props.code}</div>
      <div className="hidden">
        <input ref={inputRef} type="text" value={props.code} readOnly />
      </div>
    </div>
  );
}
