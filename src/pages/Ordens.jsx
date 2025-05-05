import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://intern.expresscar.pt";

export default function Ordens() {
  const [ordens, setOrdens] = useState([]);
  const [load,   setLoad]   = useState(true);

  async function fetchOrdens() {
    setLoad(true);
    try {
      const { data } = await axios.get(`${API}/ordens`);
      setOrdens(data);
    } catch (e) { console.error(e); alert("Erro a carregar ORs"); }
    finally     { setLoad(false); }
  }
  useEffect(()=>{ fetchOrdens(); }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Ordens de Reparação</h1>

      {load ? <p>A carregar…</p> : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Matrícula</th>
              <th className="border px-2 py-1">Cliente</th>
              <th className="border px-2 py-1">Descrição</th>
              <th className="border px-2 py-1">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map(o => (
              <tr key={o.id_or} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{o.id_or}</td>
                <td className="border px-2 py-1">{o.matricula}</td>
                <td className="border px-2 py-1">{o.nome_cliente}</td>
                <td className="border px-2 py-1">{o.descricao_intervencao}</td>
                <td className="border px-2 py-1">
                  <Link to={`/ordens/${o.id_or}`}
                        className="text-blue-600 hover:underline">
                    Detalhe
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
