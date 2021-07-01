import * as React from "react";

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { App } from "../src/App";

describe("Application route: RoomView", function () {
  let history: any;

  /***
   * Configura rota.
   */

  beforeEach(() => {
    history = createBrowserHistory();
    history.push("/room/view");
  });

  afterEach(() => {
    history = null;
  });

  /***
   * Testes
   */

  it("Rendering", function () {
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.firstChild).toHaveClass("room-view__page");
  });
});
