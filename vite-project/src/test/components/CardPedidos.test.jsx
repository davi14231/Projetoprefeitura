import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardContent } from "../../components/ui/card";

// Teste simples dos componentes de card isoladamente
describe("Card Components", () => {
  it("renderiza um card simples", () => {
    render(
      <Card>
        <CardContent>
          <h1>Teste de Card</h1>
        </CardContent>
      </Card>
    );
    expect(screen.getByText("Teste de Card")).toBeInTheDocument();
  });
  
  it("renderiza conteúdo do card", () => {
    render(
      <CardContent>
        <p>Conteúdo do teste</p>
      </CardContent>
    );
    expect(screen.getByText("Conteúdo do teste")).toBeInTheDocument();
  });
});