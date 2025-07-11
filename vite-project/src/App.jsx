import { Header } from "@/components/ui/layouts/Header";
import Footer from "@/components/ui/layouts/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Conteúdo principal vai aqui futuramente */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
