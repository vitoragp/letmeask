import * as React from "react";

import "./styles.scss";

/***
 * LoadingProps
 */

type LoadingProps = {
  state: boolean;
  children?: React.ReactNode;
};

/***
 * Loading
 */

export function Loading(props: LoadingProps) {
  return props.state ? (
    <div className="loading__component">Loading...</div>
  ) : (
    <>{props.children}</>
  );
}
