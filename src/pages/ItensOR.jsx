// src/pages/ItensOR.jsx
import { useEffect, useState } from "react"
import { useParams }          from "react-router-dom"
import axios  from "axios"
import Modal  from "../components/Modal"

const API = "https://intern.expresscar.pt"

export default function ItensOR() {
  const { idOr }             = useParams()
  const [itens, setItens]    = useState([])
  const [loading, setLoad]   = useState(true)
  const [open, setOpen]      = useState(false)
  const [form, setForm]      = useState({
    tipo_item:     "ARTIGO",
    descricao:     "",
    quantidade:    1,
    preco_unitario:0,
    iva:           23
  })

  const fetchItens = async () => {
    setLoad(true)
    try {
      const { data } = await axios.get(`${API}/or_itens/ordem/${idOr}`)
      setItens(data)
    } catch (err) { console.error(err); alert("Erro a carregar itens") }
    finally        { setLoad(false) }
  }
  useEffect(() => { fetchItens() }, [idOr])

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const body = {
        id_or: idOr,
        ...form,
        total_liquido: form.quantidade * form.preco_unitario,
        total_com_iva: form.quantidade * form.preco_unitario * (1+form.iva/100)
      }
      await axios.post(`${API}/or_itens`, body)
      setOpen(false); fetchItens()
    } catch (err) { console.error(err); alert("Erro a gravar item") }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Itens da OR #{idOr}</h1>
        <button onClick={() => setOpen(true)}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Novo Item
        </button>
      </div>

      {loading ? <p>A carregar…</p> : (
        <table className="w-full table-auto text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-1">#</th>
              <th className="border px-1">Descrição</th>
              <th className="border px-1">Qtd</th>
              <th className="border px-1">PU €</th>
              <th className="border px-1">IVA %</th>
              <th className="border px-1">Total €</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(i => (
              <tr key={i.id_or_item} className="hover:bg-gray-50">
                <td className="border px-1">{i.id_or_item}</td>
                <td className="border px-1">{i.descricao}</td>
                <td className="border px-1 text-center">{i.quantidade}</td>
                <td className="border px-1 text-right">{i.preco_unitario.toFixed(2)}</td>
                <td className="border px-1 text-center">{i.iva}</td>
                <td className="border px-1 text-right">{i.total_com_iva.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal open={open} setOpen={setOpen} title="Adicionar Item">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="descricao" value={form.descricao}
                 onChange={handleChange} placeholder="Descrição"
                 className="w-full rounded border px-3 py-2" required />

          <div className="flex gap-2">
            <input type="number" name="quantidade" value={form.quantidade}
                   onChange={handleChange} min="1"
                   className="w-full rounded border px-3 py-2" placeholder="Qtd" required />
            <input type="number" step="0.01" name="preco_unitario" value={form.preco_unitario}
                   onChange={handleChange}
                   className="w-full rounded border px-3 py-2" placeholder="Preço €" required />
            <input type="number" name="iva" value={form.iva}
                   onChange={handleChange} min="0"
                   className="w-full rounded border px-3 py-2" placeholder="IVA %" required />
          </div>

          <div className="flex justify-end space-x-2">
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
  )
}
