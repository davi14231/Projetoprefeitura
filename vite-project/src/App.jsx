import { useState } from "react";
import { HomeRealocacao } from "@/components/ui/HomeRealocacao";
import { EditDonation } from "@/components/ui/EditDoacoes";

function App() {
  const [view, setView] = useState("realocacao");

  return (
    <>
      {view === "realocacao" ? (
        <HomeRealocacao onSolicitacoesClick={() => setView("edit")} onRealocacoesClick={() => setView("realocacao")} />
      ) : (
        <EditDonation onSolicitacoesClick={() => setView("edit")} onRealocacoesClick={() => setView("realocacao")} />
      )}
    </>
  );
}

export default App;