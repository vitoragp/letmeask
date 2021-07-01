import * as React from "react";

import "./styles.scss";

/***
 * InputProps
 */

type InputProps = {
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

/***
 * Input
 */

export function Input(props: InputProps) {
  const classNameArray = ["input__component"];

  if (props.className) {
    props.className.split(" ").forEach((csName) => {
      classNameArray.push(csName);
    });
  }

  /***
   * handleChange
   */

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange?.(event.target.value);
  }

  return (
    <input
      type="text"
      className={classNameArray.join(" ")}
      required={props.required}
      placeholder={props.placeholder}
      onChange={handleChange}
    />
  );
}
