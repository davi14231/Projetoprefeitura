import React from "react";
import { render, screen } from "@testing-library/react";
import { CardPedidos } from "../../components/ui/CardPedidos";

describe("CardPedidos", () => {
  it("renderiza o título do pedido", () => {
    render(<CardPedidos titulo="Teste de Pedido" />);
    expect(screen.getByText("Teste de Pedido")).toBeInTheDocument();
  });
});