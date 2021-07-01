import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

/***
 * useNotification
 */

export function useNotification() {
  const messageContext = useContext(NotificationContext);
  return messageContext;
}
