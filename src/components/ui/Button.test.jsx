import { render, screen } from "@testing-library/react";
import React from "react";
import Button from "./Button.jsx";

describe("Button", () => {
  it("renders Click Me text", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: "Click Me" }),
    ).toBeInTheDocument();
  });
});
