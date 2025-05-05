// src/pages/Veiculos.jsx
import { useEffect, useState } from "react";
import axios   from "axios";
import Modal   from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [open,     setOpen]     = useState(false);

  const [form, setForm] = useState({
    id_cliente : "",
    matricula  : "",
    marca      : "",
    modelo     : "",
    combustivel: ""
  });

  /* ---------- carregar lista ---------- */
  const fetchVeiculos = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/veiculos`);
      setVeiculos(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar veículos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchVeiculos(); }, []);

  /* ---------- handlers ---------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/veiculos`, form);
      setOpen(false);
      setForm({
        id_cliente : "",
        matricula  : "",
        marca      : "",
        modelo     : "",
        combustivel: ""
      });
      fetchVeiculos();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar veículo");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Veículos</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo Veículo
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">ID</th>
              <th className="border px-2 py-1 text-left">Matrícula</th>
              <th className="border px-2 py-1 text-left">Marca / Modelo</th>
              <th className="border px-2 py-1 text-left">Combustível</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((v) => (
              <tr key={v.id_veiculo} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{v.id_veiculo}</td>
                <td className="border px-2 py-1">{v.matricula}</td>
                <td className="border px-2 py-1">
                  {v.marca} / {v.modelo}
                </td>
                <td className="border px-2 py-1">{v.combustivel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- Modal ---------- */}
      <Modal open={open} setOpen={setOpen} title="Novo Veículo">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="id_cliente" value={form.id_cliente}
                 onChange={handleChange} placeholder="ID Cliente"
                 className="w-full rounded border px-3 py-2" required />

          <input name="matricula" value={form.matricula}
                 onChange={handleChange} placeholder="Matrícula"
                 className="w-full rounded border px-3 py-2" required />

          <input name="marca" value={form.marca}
                 onChange={handleChange} placeholder="Marca"
                 className="w-full rounded border px-3 py-2" required />

          <input name="modelo" value={form.modelo}
                 onChange={handleChange} placeholder="Modelo"
                 className="w-full rounded border px-3 py-2" required />

          <input name="combustivel" value={form.combustivel}
                 onChange={handleChange} placeholder="Combustível"
                 className="w-full rounded border px-3 py-2" />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button"
                    onClick={() => setOpen(false)}
                    className="rounded bg-gray-200 px-4 py-2">
              Cancelar
            </button>
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
