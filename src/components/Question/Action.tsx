import * as React from "react";
import { Question } from "../../models/Question";
import { QuestionContext } from "./Context";

import "./styles.scss";

/***
 * ActionProps
 */

type ActionProps = {
  icon: string;
  label?: ((q: Question) => string) | string;
  onClick?: (q: Question) => void;
};

/***
 * Action
 */

export function Action(props: ActionProps) {
  const { icon, label, onClick } = props;
  const [pending, setPending] = React.useState<boolean>(false);
  const context = React.useContext(QuestionContext);

  /***
   * handleClick
   */

  async function handleClick() {
    if (!pending) {
      setPending(true);
      await onClick?.(context.question);
      setPending(false);
    }
  }

  /***
   * renderLabel
   */

  function renderLabel() {
    return typeof label === "function" ? (
      <span>{label(context.question)}</span>
    ) : (
      <span>{label}</span>
    );
  }

  return (
    <div className="action__component" onClick={handleClick}>
      {label && renderLabel()} <img src={icon} />
    </div>
  );
}
