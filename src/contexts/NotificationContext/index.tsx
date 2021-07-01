import React from "react";

import "./styles.scss";

/***
 * Notification
 */

type Message = {
  message: string;
  type: string;
};

/***
 * NotificationContextType
 */

type NotificationContextType = {
  pushMessage: (message: string) => void;
  pushWarning: (message: string) => void;
  pushError: (message: string) => void;
};

/***
 * Cria o contexto de autenticação.
 */

export const NotificationContext = React.createContext(
  {} as NotificationContextType
);

/***
 * NotificationContextProviderProps
 */

type NotificationContextProviderProps = {
  children: React.ReactNode;
};

/***
 * NotificationContextProvider
 */

export function NotificationContextProvider(
  props: NotificationContextProviderProps
) {
  const [notificationObject, setNotificationObject] = React.useState<Message>();

  /***
   * cleanNotification
   */

  function cleanNotification() {
    setTimeout(() => {
      setNotificationObject(undefined);
    }, 5000);
  }

  /***
   * pushMessage
   */

  function pushMessage(message: string) {
    if (!notificationObject) {
      setNotificationObject({
        message,
        type: "info",
      });

      cleanNotification();
    }
  }

  /***
   * pushWarning
   */

  function pushWarning(message: string) {
    if (!notificationObject) {
      setNotificationObject({
        message,
        type: "warning",
      });

      cleanNotification();
    }
  }

  /***
   * pushError
   */

  function pushError(message: string) {
    if (!notificationObject) {
      setNotificationObject({
        message,
        type: "error",
      });

      cleanNotification();
    }
  }

  /***
   * renderNotification
   */

  function renderNotification() {
    return (
      <div className="notification__context">
        <div className={`form ${notificationObject?.type}`}>
          <p>{notificationObject.message}</p>
        </div>
      </div>
    );
  }

  return (
    <NotificationContext.Provider
      value={{ pushMessage, pushWarning, pushError }}
    >
      {notificationObject && renderNotification()}
      {props.children}
    </NotificationContext.Provider>
  );
}
