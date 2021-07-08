import * as React from "react";

import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { auth, firebase } from "../../src/services/firebase";

import { App } from "../../src/App";
import { act } from "react-dom/test-utils";

describe("Application route: RoomNew", function () {
  let history: any;

  /***
   * Configura rota.
   */

  beforeEach(() => {
    history = createBrowserHistory();
    history.push("/room/new");
  });

  afterEach(() => {
    history = null;
  });

  /***
   * Testes
   */

  it("Unauthenticated access", function () {
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.firstChild).toHaveClass("home__page");
  });

  it("Authenticated access", function () {
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.firstChild).toHaveClass("room-new__page");
  });
});
