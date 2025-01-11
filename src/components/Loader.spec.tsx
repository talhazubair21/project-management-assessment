import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../components/Loader";

describe("Loader component", () => {
  it("displays the loading spinner when isLoading is true", () => {
    render(
      <Loader isLoading={true}>
        <div>Child Content</div>
      </Loader>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Child Content")).not.toBeInTheDocument();
  });

  it("displays the child content when isLoading is false", () => {
    render(
      <Loader isLoading={false}>
        <div>Child Content</div>
      </Loader>
    );
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
