import { useEffect, useState } from "react";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function Compras() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open,    setOpen]    = useState(false);
  const [form,    setForm]    = useState({
    id_fornecedor: "",
    data_compra:  "",
    documento:    "",
    valor_total:  ""
  });

  /* --------------------- carregar lista --------------------- */
  const fetchCompras = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/compras`);
      setCompras(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar compras");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchCompras(); }, []);

  /* ------------------------ form ---------------------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/compras`, form);
      setOpen(false);
      setForm({ id_fornecedor:"", data_compra:"", documento:"", valor_total:"" });
      fetchCompras();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar compra");
    }
  };

  /* ------------------------- UI ----------------------------- */
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Compras</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nova Compra
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Fornecedor</th>
              <th className="border px-2 py-1">Data</th>
              <th className="border px-2 py-1">Doc.</th>
              <th className="border px-2 py-1">Total €</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((c) => (
              <tr key={c.id_compra} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{c.id_compra}</td>
                <td className="border px-2 py-1">{c.id_fornecedor}</td>
                <td className="border px-2 py-1">{c.data_compra?.slice(0,10)}</td>
                <td className="border px-2 py-1">{c.documento}</td>
                <td className="border px-2 py-1 text-right">{Number(c.valor_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* modal */}
      <Modal open={open} setOpen={setOpen} title="Nova Compra">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="id_fornecedor" value={form.id_fornecedor}
                 onChange={handleChange} placeholder="ID fornecedor"
                 className="w-full rounded border px-3 py-2" required />

          <input type="date" name="data_compra" value={form.data_compra}
                 onChange={handleChange} className="w-full rounded border px-3 py-2" required />

          <input name="documento" value={form.documento}
                 onChange={handleChange} placeholder="Documento"
                 className="w-full rounded border px-3 py-2" required />

          <input type="number" step="0.01" name="valor_total" value={form.valor_total}
                 onChange={handleChange} placeholder="Valor €"
                 className="w-full rounded border px-3 py-2" required />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)}
                    className="rounded bg-gray-200 px-4 py-2">Cancelar</button>
            <button type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Gravar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
