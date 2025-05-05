import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://intern.expresscar.pt";

export default function LogAcoes() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/log_acoes`);
      setLista(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar logs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchAll(); }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Log de Ações</h1>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Funcionário</th>
              <th className="border px-2 py-1">Ação</th>
              <th className="border px-2 py-1">Entidade</th>
              <th className="border px-2 py-1">Data</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((l) => (
              <tr key={l.id_log} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{l.id_log}</td>
                <td className="border px-2 py-1">{l.id_funcionario}</td>
                <td className="border px-2 py-1">{l.acao}</td>
                <td className="border px-2 py-1">{l.entidade_afetada}</td>
                <td className="border px-2 py-1">
                  {new Date(l.data_acao).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
