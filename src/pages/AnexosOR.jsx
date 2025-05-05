import { useEffect, useState } from "react";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function AnexosOR() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id_or: "",
    caminho_arquivo: "",
    tipo_arquivo: ""
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/anexos_or`);
      setLista(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar anexos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchAll(); }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/anexos_or`, form);
      setOpen(false);
      setForm({ id_or:"", caminho_arquivo:"", tipo_arquivo:"" });
      fetchAll();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar anexo");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Anexos da OR</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Novo Anexo
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">OR</th>
              <th className="border px-2 py-1">Caminho</th>
              <th className="border px-2 py-1">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr key={a.id_anexo} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{a.id_anexo}</td>
                <td className="border px-2 py-1">{a.id_or}</td>
                <td className="border px-2 py-1">{a.caminho_arquivo}</td>
                <td className="border px-2 py-1">{a.tipo_arquivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={open} setOpen={setOpen} title="Novo Anexo">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="id_or" value={form.id_or}
                 onChange={handleChange} placeholder="ID OR"
                 className="w-full rounded border px-3 py-2" required />

          <input name="caminho_arquivo" value={form.caminho_arquivo}
                 onChange={handleChange} placeholder="URL / caminho"
                 className="w-full rounded border px-3 py-2" required />

          <input name="tipo_arquivo" value={form.tipo_arquivo}
                 onChange={handleChange} placeholder="Tipo (jpg, pdf …)"
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
