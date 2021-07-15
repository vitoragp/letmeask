import * as React from "react";

import "./styles.scss";

/***
 * BadgeProps
 */

type BadgeProps = {
  questionCount: number;
};

/***
 * Badge
 */

export function Badge(props: BadgeProps) {
  /***
   * renderBadge
   */

  function renderBadge() {
    return props.questionCount > 1 ? (
      <span className="badge__component">{props.questionCount} perguntas</span>
    ) : (
      <span className="badge__component">{props.questionCount} pergunta</span>
    );
  }

  return <>{props.questionCount > 0 && renderBadge()}</>;
}
