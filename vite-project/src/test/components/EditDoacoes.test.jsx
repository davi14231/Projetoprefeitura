import React from "react";
import { render, screen } from "@testing-library/react";
import { Botao } from "../../components/ui/botao";

// Teste simples do componente Botao
describe("Botao Component", () => {
  it("renderiza o botão com texto", () => {
    render(<Botao>Texto do Botão</Botao>);
    expect(screen.getByText("Texto do Botão")).toBeInTheDocument();
  });
  
  it("renderiza botão com className personalizada", () => {
    render(<Botao className="custom-class">Botão Customizado</Botao>);
    const button = screen.getByText("Botão Customizado");
    expect(button).toBeInTheDocument();
  });
});