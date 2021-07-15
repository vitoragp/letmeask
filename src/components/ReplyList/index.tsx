import * as React from "react";
import { Reply } from "../../models/Reply";
import { Reply as ReplyComponent } from "../Reply";

/***
 * ReplyListProps
 */

type ReplyListProps = {
  data: Reply[];
};

/***
 * ReplyList
 */

export function ReplyList(props: ReplyListProps) {
  /***
   * renderReply
   */

  function renderReply(reply: Reply) {
    return <ReplyComponent key={reply.id} data={reply} />;
  }

  return <>{props.data.map(renderReply)}</>;
}
