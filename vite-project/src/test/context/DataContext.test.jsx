import React from "react";
import { render } from "@testing-library/react";
import { DataProvider } from "../../context/DataContext";

describe("DataContext", () => {
  it("renderiza o provider corretamente", () => {
    render(
      <DataProvider>
        <div>Test Child</div>
      </DataProvider>
    );
  });
});