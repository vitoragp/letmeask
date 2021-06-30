import * as React from "react";

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { App } from "../src/App";

describe("Application", function () {
  it("Test initialization", function () {
    render(<App />);

    expect(screen.getByText("Letmeask!")).toBeInTheDocument();
  });
});
