import * as React from "react";

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { App } from "../src/App";
import { act } from "react-dom/test-utils";

describe("Application route: Home", function () {
  let history: any;

  /***
   * Configura rota.
   */

  beforeEach(() => {
    history = createBrowserHistory();
    history.push("/");
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

    expect(container.firstChild).toHaveClass("home__page");
  });
});
