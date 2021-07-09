import * as React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthContextProvider } from "../contexts/AuthContext";
import { NotificationContextProvider } from "../contexts/NotificationContext";

import { Home } from "../pages/Home";
import { RoomNew } from "../pages/RoomNew";
import { RoomView } from "../pages/RoomView";

import "./styles.scss";

/***
 * App
 */

export function App() {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/room/new" component={RoomNew} />
            <Route path="/room/:id" children={<RoomView />} exact />
            <Route path="/room/admin/:id" children={<RoomView admin />} exact />
          </Switch>
        </BrowserRouter>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}
