import { useEffect, useState } from "react";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function Fornecedores() {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);

  const [form, setForm] = useState({
    nome: "",
    nif:  "",
    email_comercial: ""
  });

  /* -------------------  LOAD LIST  ------------------- */
  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/fornecedores`);
      setList(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar fornecedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  /* -------------------  FORM HANDLERS  ------------------- */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API}/fornecedores`, form);
      setOpen(false);
      setForm({ nome: "", nif: "", email_comercial: "" });
      fetchAll();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar fornecedor");
    }
  };

  /* ------------------------ UI ------------------------ */
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Fornecedores</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo Fornecedor
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">ID</th>
              <th className="border px-2 py-1 text-left">Nome</th>
              <th className="border px-2 py-1 text-left">NIF</th>
              <th className="border px-2 py-1 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {list.map(f => (
              <tr key={f.id_fornecedor} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{f.id_fornecedor}</td>
                <td className="border px-2 py-1">{f.nome}</td>
                <td className="border px-2 py-1">{f.nif}</td>
                <td className="border px-2 py-1">{f.email_comercial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------------  Modal --------------- */}
      <Modal open={open} setOpen={setOpen} title="Novo Fornecedor">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            name="nif"
            value={form.nif}
            onChange={handleChange}
            placeholder="NIF"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            name="email_comercial"
            type="email"
            value={form.email_comercial}
            onChange={handleChange}
            placeholder="Email comercial"
            className="w-full rounded border px-3 py-2"
          />

          <div className="flex justify-end space-x-2">
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
