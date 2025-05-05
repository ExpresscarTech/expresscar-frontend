import { useEffect, useState } from "react";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function ContasCorrentes() {
  const [lancamentos, setLancamentos] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [open,        setOpen]        = useState(false);
  const [form,        setForm]        = useState({
    tipo_entidade : "C",   // C = cliente, F = fornecedor
    id_entidade   : "",
    data_lancamento: "",
    descricao     : "",
    valor         : ""
  });

  /* ---------- carregar ---------- */
  async function fetchLanc() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/contas_correntes`);
      setLancamentos(data);
    } catch (e) {
      console.error(e);
      alert("Erro a carregar lançamentos");
    } finally { setLoading(false); }
  }
  useEffect(()=>{ fetchLanc(); }, []);

  /* ---------- form ---------- */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post(`${API}/contas_correntes`, form);
      setOpen(false);
      setForm({ tipo_entidade:"C", id_entidade:"", data_lancamento:"", descricao:"", valor:"" });
      fetchLanc();
    }catch(err){
      console.error(err);
      alert("Erro a gravar");
    }
  }

  /* ---------- UI ---------- */
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contas Correntes</h1>
        <button onClick={()=>setOpen(true)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Novo Lançamento
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Tipo</th>
              <th className="border px-2 py-1">Entidade</th>
              <th className="border px-2 py-1">Data</th>
              <th className="border px-2 py-1">Descrição</th>
              <th className="border px-2 py-1 text-right">Valor €</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map(l => (
              <tr key={l.id_lancamento} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{l.id_lancamento}</td>
                <td className="border px-2 py-1">{l.tipo_entidade}</td>
                <td className="border px-2 py-1">{l.id_entidade}</td>
                <td className="border px-2 py-1">{l.data_lancamento?.slice(0,10)}</td>
                <td className="border px-2 py-1">{l.descricao}</td>
                <td className="border px-2 py-1 text-right">
                  {Number(l.valor).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ---------- modal ---------- */}
      <Modal open={open} setOpen={setOpen} title="Novo Lançamento">
        <form onSubmit={handleSubmit} className="space-y-3">
          <select name="tipo_entidade" value={form.tipo_entidade}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2">
            <option value="C">Cliente</option>
            <option value="F">Fornecedor</option>
          </select>

          <input name="id_entidade" value={form.id_entidade}
                 onChange={handleChange} placeholder="ID Entidade"
                 className="w-full rounded border px-3 py-2" required />

          <input type="date" name="data_lancamento"
                 value={form.data_lancamento}
                 onChange={handleChange}
                 className="w-full rounded border px-3 py-2" required />

          <input name="descricao" value={form.descricao}
                 onChange={handleChange} placeholder="Descrição"
                 className="w-full rounded border px-3 py-2" />

          <input type="number" step="0.01" name="valor" value={form.valor}
                 onChange={handleChange} placeholder="Valor €"
                 className="w-full rounded border px-3 py-2" required />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={()=>setOpen(false)}
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
