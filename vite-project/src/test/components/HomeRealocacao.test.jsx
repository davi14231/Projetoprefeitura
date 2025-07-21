import { render, screen } from "@testing-library/react";
import HomeRealocacao from "../../components/ui/paginas/HomeRealocacao";
import { MemoryRouter } from "react-router-dom";

describe("HomeRealocacao", () => {
  it("renderiza o título principal", () => {
    render(
      <MemoryRouter>
        <HomeRealocacao />
      </MemoryRouter>
    );
    expect(screen.getByText(/Doe itens para outras ONGs/i)).toBeInTheDocument();
  });
});