import { useEffect, useState } from "react";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [open,     setOpen]     = useState(false);

  const [form, setForm] = useState({
    nif: "",
    nome_abreviado: "",
    nome: ""
  });

  // ---------- API ----------
  async function fetchClientes() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/clientes`);
      setClientes(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar clientes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchClientes(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${API}/clientes`, form);
      setOpen(false);
      setForm({ nif: "", nome_abreviado: "", nome: "" });
      fetchClientes();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar cliente");
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ---------- UI ----------
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo Cliente
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">ID</th>
              <th className="border px-2 py-1 text-left">Nome</th>
              <th className="border px-2 py-1 text-left">NIF</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{c.id_cliente}</td>
                <td className="border px-2 py-1">{c.nome}</td>
                <td className="border px-2 py-1">{c.nif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal open={open} setOpen={setOpen} title="Novo Cliente">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nif"
            value={form.nif}
            onChange={handleChange}
            placeholder="NIF"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            name="nome_abreviado"
            value={form.nome_abreviado}
            onChange={handleChange}
            placeholder="Nome abreviado"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome completo"
            className="w-full rounded border px-3 py-2"
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Gravar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
