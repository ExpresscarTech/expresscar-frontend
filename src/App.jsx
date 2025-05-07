import { Routes, Route, Navigate } from "react-router-dom";
import Layout       from "./components/Layout";
import Dashboard    from "./pages/Dashboard";
import Clientes     from "./pages/Clientes";
import Veiculos     from "./pages/Veiculos";
import Ordens       from "./pages/Ordens";
import Fornecedores from "./pages/Fornecedores";
import Marcacoes    from "./pages/Marcacoes"; 
import AnexosOR     from "./pages/AnexosOR"; 
import Compras      from "./pages/Compras";  
import Contas       from "./pages/Contas"; 
import LogAcoes     from "./pages/LogAcoes";
import Artigos      from "./pages/Artigos";
import NovaOrdem    from "./pages/NovaOrdem";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"            element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/clientes"    element={<Clientes  />} />
        <Route path="/veiculos"    element={<Veiculos  />} />
        <Route path="/ordens"      element={<Ordens    />} />
        <Route path="/fornecedores"element={<Fornecedores />} />

        {/* novos módulos */}
        <Route path="/compras"     element={<Compras   />} />
        <Route path="/contas"      element={<Contas    />} />
        <Route path="/marcacoes"   element={<Marcacoes />} />
        <Route path="/anexos"      element={<AnexosOR  />} />
        <Route path="/contas"      element={<Contas   />} />
        <Route path="/logs"        element={<LogAcoes />} />
        <Route path="/artigos"     element={<Artigos />} />
        <Route path="/nova-ordem"  element={<NovaOrdem />} />

        {/* 404 fallback opcional */}
        <Route path="*" element={<h1 className="p-6">Página não encontrada</h1>} />
      </Routes>
    </Layout>
  );
}
