import React from "react";
import { render, screen } from "@testing-library/react";

// Teste simples de renderização de componente React básico
describe("Basic React Rendering", () => {
  it("renderiza um componente simples", () => {
    const SimpleComponent = () => <div>Componente Teste</div>;
    render(<SimpleComponent />);
    expect(screen.getByText("Componente Teste")).toBeInTheDocument();
  });
  
  it("renderiza elementos básicos", () => {
    render(
      <div>
        <h1>Título</h1>
        <p>Parágrafo de teste</p>
        <button>Clique aqui</button>
      </div>
    );
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Parágrafo de teste")).toBeInTheDocument();
    expect(screen.getByText("Clique aqui")).toBeInTheDocument();
  });
});