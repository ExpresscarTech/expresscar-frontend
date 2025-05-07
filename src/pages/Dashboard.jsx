// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL;

  // Estado para ordens
  const [ordens, setOrdens] = useState([]);
  const [loadingOrdens, setLoadingOrdens] = useState(true);

  // Estado para marcações
  const [marcacoes, setMarcacoes] = useState([]);
  const [loadingMarcacoes, setLoadingMarcacoes] = useState(true);

  // Busca ordens
  useEffect(() => {
    const fetchOrdens = async () => {
      setLoadingOrdens(true);
      try {
        const { data } = await axios.get(`${API}/ordens`);
        setOrdens(data);
      } catch (err) {
        console.error(err);
        alert("Erro a carregar ordens");
      } finally {
        setLoadingOrdens(false);
      }
    };
    fetchOrdens();
  }, [API]);

  // Busca marcações
  useEffect(() => {
    const fetchMarcacoes = async () => {
      setLoadingMarcacoes(true);
      try {
        const { data } = await axios.get(`${API}/marcacoes`);
        setMarcacoes(data);
      } catch (err) {
        console.error(err);
        alert("Erro a carregar marcações");
      } finally {
        setLoadingMarcacoes(false);
      }
    };
    fetchMarcacoes();
  }, [API]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      {/* Seção de Ordens */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Ordens de Reparação
        </Typography>
        {loadingOrdens ? (
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
                </TableRow>
              </TableHead>
              <TableBody>
                {ordens.map((o) => (
                  <TableRow key={o.id_or} hover>
                    <TableCell>{o.id_or}</TableCell>
                    <TableCell>{o.matricula}</TableCell>
                    <TableCell>{o.nome_cliente}</TableCell>
                    <TableCell>{o.descricao_intervencao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Seção de Marcações */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Marcações
        </Typography>
        {loadingMarcacoes ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Veículo</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Descrição</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marcacoes.map((m) => (
                  <TableRow key={m.id_marcacao} hover>
                    <TableCell>{m.id_marcacao}</TableCell>
                    <TableCell>{m.id_cliente}</TableCell>
                    <TableCell>{m.id_veiculo}</TableCell>
                    <TableCell>{m.data_marcacao?.slice(0, 10)}</TableCell>
                    <TableCell>{m.hora_marcacao}</TableCell>
                    <TableCell>{m.descricao}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
