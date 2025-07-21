import { render, screen } from "@testing-library/react";
import { EditDoacoes } from "../../components/ui/paginas/EditDoacoes";
import { MemoryRouter } from "react-router-dom";

describe("EditDoacoes", () => {
  it("renderiza o título principal", () => {
    render(
      <MemoryRouter>
        <EditDoacoes />
      </MemoryRouter>
    );
    expect(screen.getByText(/O que sua ONG precisa/i)).toBeInTheDocument();
  });
});