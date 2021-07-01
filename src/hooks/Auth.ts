import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

/***
 * useAuth
 */

export function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}
