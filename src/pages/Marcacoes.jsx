// src/pages/Marcacoes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

// Usa o VITE_API_URL definido em .env.local
const API = import.meta.env.VITE_API_URL;

export default function Marcacoes() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    id_cliente: "",
    id_veiculo: "",
    data_marcacao: "",
    hora_marcacao: "",
    descricao: "",
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/marcacoes`);
      setLista(data);
    } catch (err) {
      console.error(err);
      alert("Erro a carregar marcações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/marcacoes`, form);
      setOpen(false);
      setForm({
        id_cliente: "",
        id_veiculo: "",
        data_marcacao: "",
        hora_marcacao: "",
        descricao: "",
      });
      fetchAll();
    } catch (err) {
      console.error(err);
      alert("Erro ao gravar marcação");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Marcações</h1>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nova Marcação
        </button>
      </div>

      {loading ? (
        <p>A carregar…</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Cliente</th>
              <th className="border px-2 py-1">Veículo</th>
              <th className="border px-2 py-1">Data</th>
              <th className="border px-2 py-1">Hora</th>
              <th className="border px-2 py-1">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((m) => (
              <tr key={m.id_marcacao} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{m.id_marcacao}</td>
                <td className="border px-2 py-1">{m.id_cliente}</td>
                <td className="border px-2 py-1">{m.id_veiculo}</td>
                <td className="border px-2 py-1">
                  {m.data_marcacao?.slice(0, 10)}
                </td>
                <td className="border px-2 py-1">{m.hora_marcacao}</td>
                <td className="border px-2 py-1">{m.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={open} setOpen={setOpen} title="Nova Marcação">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="id_cliente"
            value={form.id_cliente}
            onChange={handleChange}
            placeholder="ID Cliente"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            name="id_veiculo"
            value={form.id_veiculo}
            onChange={handleChange}
            placeholder="ID Veículo"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            type="date"
            name="data_marcacao"
            value={form.data_marcacao}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            type="time"
            name="hora_marcacao"
            value={form.hora_marcacao}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            required
          />

          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            className="w-full rounded border px-3 py-2"
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
