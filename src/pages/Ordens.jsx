// src/pages/Ordens.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Ordens() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdens = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/ordens`);
        setOrdens(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar ordens");
      } finally {
        setLoading(false);
      }
    };
    fetchOrdens();
  }, [API]);

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">Ordens de Reparação</Typography>
        <Button variant="contained" onClick={() => navigate("/nova-ordem") }>
          Nova Ordem
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordens.map((o) => (
                <TableRow key={o.id_or} hover>
                  <TableCell>{o.id_or}</TableCell>
                  <TableCell>{o.matricula}</TableCell>
                  <TableCell>{o.nome_cliente || '—'}</TableCell>
                  <TableCell>{o.descricao_intervencao}</TableCell>
                  <TableCell>{o.estado}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => navigate(`/ordens/${o.id_or}`)}>
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {ordens.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Não há ordens registadas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
