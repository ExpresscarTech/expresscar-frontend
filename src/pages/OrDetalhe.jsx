import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios  from "axios";
import Modal  from "../components/Modal";

const API = "https://intern.expresscar.pt";

export default function OrDetalhe() {
  const { id }          = useParams();
  const [or,   setOr]   = useState(null);
  const [itens,setItens]= useState([]);
  const [load,setLoad]  = useState(true);
  const [open,setOpen]  = useState(false);
  const [form,setForm]  = useState({
    id_or        : id,
    tipo_item    : "S",     // S = serviço, A = artigo
    descricao    : "",
    quantidade   : 1,
    preco_unitario: 0
  });

  async function fetchData(){
    setLoad(true);
    try{
      const orRes  = await axios.get(`${API}/ordens/${id}`);
      const itRes  = await axios.get(`${API}/ordens_itens/ordem/${id}`);
      setOr(orRes.data);
      setItens(itRes.data);
    }catch(e){ console.error(e); alert("Erro a carregar OR"); }
    finally{ setLoad(false); }
  }
  useEffect(()=>{ fetchData(); }, [id]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post(`${API}/ordens_itens`, {
        ...form,
        total_liquido : form.quantidade*form.preco_unitario,
        desconto      : 0,
        iva           : 0,
        total_com_iva : form.quantidade*form.preco_unitario
      });
      setOpen(false);
      setForm({ ...form, descricao:"", quantidade:1, preco_unitario:0 });
      fetchData();
    }catch(err){ console.error(err); alert("Erro ao gravar item"); }
  }

  if(load) return <p className="p-6">A carregar…</p>;
  if(!or)  return <p className="p-6">OR não encontrada</p>;

  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-semibold">
        OR #{or.id_or} – {or.matricula}
      </h1>
      <p className="mb-6 text-sm text-gray-600">{or.descricao_intervencao}</p>

      <div className="mb-4 flex justify-between">
        <h2 className="text-lg font-semibold">Itens</h2>
        <button onClick={()=>setOpen(true)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Adicionar Item
        </button>
      </div>

      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Tipo</th>
            <th className="border px-2 py-1">Descrição</th>
            <th className="border px-2 py-1 text-right">Qtd</th>
            <th className="border px-2 py-1 text-right">PU €</th>
            <th className="border px-2 py-1 text-right">Total €</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(it => (
            <tr key={it.id_or_item} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{it.id_or_item}</td>
              <td className="border px-2 py-1">{it.tipo_item}</td>
              <td className="border px-2 py-1">{it.descricao}</td>
              <td className="border px-2 py-1 text-right">{it.quantidade}</td>
              <td className="border px-2 py-1 text-right">
                {Number(it.preco_unitario).toFixed(2)}
              </td>
              <td className="border px-2 py-1 text-right">
                {Number(it.total_liquido).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- modal ---------- */}
      <Modal open={open} setOpen={setOpen} title="Adicionar Item">
        <form onSubmit={handleSubmit} className="space-y-3">
          <select name="tipo_item" value={form.tipo_item}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2">
            <option value="S">Serviço</option>
            <option value="A">Artigo</option>
          </select>

          <textarea name="descricao" value={form.descricao}
                    onChange={handleChange} placeholder="Descrição"
                    className="w-full rounded border px-3 py-2" rows="2" required />

          <input type="number" step="1" name="quantidade"
                 value={form.quantidade} onChange={handleChange}
                 className="w-full rounded border px-3 py-2" required />

          <input type="number" step="0.01" name="preco_unitario"
                 value={form.preco_unitario} onChange={handleChange}
                 className="w-full rounded border px-3 py-2" required />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={()=>setOpen(false)}
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
