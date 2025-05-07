// src/pages/Artigos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, TableContainer, Paper,
  Table, TableHead, TableRow, TableCell, TableBody, CircularProgress
} from "@mui/material";

const API = import.meta.env.VITE_API_URL;

export default function Artigos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/artigos`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Erro a carregar artigos");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5">Artigos</Typography>
        <button
          onClick={() => console.log("Novo artigo")}
          style={{
            padding: "6px 12px", background: "#1976d2",
            color: "#fff", border: "none", borderRadius: 4, cursor: "pointer"
          }}
        >
          Novo Artigo
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
                <TableCell>Referência</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Stock Atual</TableCell>
                <TableCell>Equivalência</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(a => (
                <TableRow key={a.id_artigo} hover>
                  <TableCell>{a.id_artigo}</TableCell>
                  <TableCell>{a.referencia}</TableCell>
                  <TableCell>{a.descricao}</TableCell>
                  <TableCell>{a.marca}</TableCell>
                  <TableCell>{a.stock_atual}</TableCell>
                  <TableCell>{a.equivalencia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
