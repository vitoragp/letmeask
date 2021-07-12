import * as React from "react";

import "./styles.scss";

/***
 * ButtonProps
 */

type ButtonProps = {
  label?: string;
  className?: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
};

/***
 * Button
 */

export function Button(props: ButtonProps) {
  const classNameArray = ["button__component"];

  if (props.className) {
    props.className.split(" ").forEach((csName) => {
      classNameArray.push(csName);
    });
  }

  /***
   * renderIcon
   */

  function renderIcon() {
    return <img src={props.icon} />;
  }

  return (
    <button
      type="button"
      className={classNameArray.join(" ")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && renderIcon()}
      {props.label}
    </button>
  );
}
