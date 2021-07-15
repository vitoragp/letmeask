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
  disabled?: ((q: Question) => boolean) | boolean;
  onClick?: (q: Question) => void;
};

/***
 * Action
 */

export function Action(props: ActionProps) {
  const classNames: string[] = ["action__component"];
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

  // Verifica se o botao esta desabilitado.
  switch (typeof props.disabled) {
    case "function":
      if (props.disabled?.(context.question) === true) {
        classNames.push("disabled");
      }
      break;

    case "boolean":
      if (props.disabled === true) {
        classNames.push("disabled");
      }
      break;

    default:
      break;
  }

  return (
    <div className={classNames.join(" ")} onClick={handleClick}>
      {label && renderLabel()} <img src={icon} />
    </div>
  );
}
