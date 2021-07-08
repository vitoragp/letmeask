import * as React from "react";

import { Redirect } from "react-router-dom";

import { useAuth } from "../hooks/Auth";

/***
 * AuthPage
 */

export function AuthPage(Page: React.FC) {
  return (props: any) => {
    const auth = useAuth();

    if (!auth.user) {
      return <Redirect to="/" />;
    }

    return <Page {...props} />;
  };
}
