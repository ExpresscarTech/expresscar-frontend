// src/pages/Fornecedores.jsx
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

const API = import.meta.env.VITE_API_URL;

export default function Fornecedores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/fornecedores`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Erro a carregar fornecedores");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5">Fornecedores</Typography>
        <button
          onClick={() => console.log("Novo fornecedor")}
          style={{
            padding: "6px 12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Novo Fornecedor
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
                <TableCell>Nome</TableCell>
                <TableCell>Morada</TableCell>
                <TableCell>Cód. Postal</TableCell>
                <TableCell>Localidade</TableCell>
                <TableCell>Tel. Comercial</TableCell>
                <TableCell>Tel. Contab.</TableCell>
                <TableCell>Email Comercial</TableCell>
                <TableCell>Email Contab.</TableCell>
                <TableCell>Contacto Resp.</TableCell>
                <TableCell>Observações</TableCell>
                <TableCell>Ativo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((f) => (
                <TableRow key={f.id_fornecedor} hover>
                  <TableCell>{f.id_fornecedor}</TableCell>
                  <TableCell>{f.nif}</TableCell>
                  <TableCell>{f.nome}</TableCell>
                  <TableCell>{f.morada}</TableCell>
                  <TableCell>{f.codigo_postal}</TableCell>
                  <TableCell>{f.localidade}</TableCell>
                  <TableCell>{f.telefone_comercial}</TableCell>
                  <TableCell>{f.telefone_contabilidade}</TableCell>
                  <TableCell>{f.email_comercial}</TableCell>
                  <TableCell>{f.email_contabilidade}</TableCell>
                  <TableCell>{f.contacto_responsavel}</TableCell>
                  <TableCell>{f.observacoes}</TableCell>
                  <TableCell>{f.ativo ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
);
}
