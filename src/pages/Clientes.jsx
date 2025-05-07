// src/pages/Clientes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";

// Usa a URL da API definida em .env.local
const API = import.meta.env.VITE_API_URL;

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
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
    };
    fetchClientes();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5">Clientes</Typography>
        <button
          onClick={() => console.log("Nova criação de cliente")}
          style={{
            padding: "6px 12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Novo Cliente
        </button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NIF</TableCell>
                <TableCell>Alcunha</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Morada</TableCell>
                <TableCell>Cód. Postal</TableCell>
                <TableCell>Localidade</TableCell>
                <TableCell>Contactos</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Observações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((c) => (
                <TableRow key={c.id_cliente} hover>
                  <TableCell>{c.id_cliente}</TableCell>
                  <TableCell>{c.nif}</TableCell>
                  <TableCell>{c.nome_abreviado}</TableCell>
                  <TableCell>{c.nome}</TableCell>
                  <TableCell>{c.morada}</TableCell>
                  <TableCell>{c.codigo_postal}</TableCell>
                  <TableCell>{c.localidade}</TableCell>
                  <TableCell>
                    {c.contactos
                      ? JSON.stringify(c.contactos)
                      : "—"}
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.observacoes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
