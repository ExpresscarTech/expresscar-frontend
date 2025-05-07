// src/pages/Veiculos.jsx
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

export default function Veiculos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/veiculos`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        alert("Erro a carregar veículos");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5">Veículos</Typography>
        <button
          onClick={() => console.log("Novo veículo")}
          style={{
            padding: "6px 12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Novo Veículo
        </button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Matrícula</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>CC</TableCell>
                <TableCell>CV</TableCell>
                <TableCell>KW</TableCell>
                <TableCell>Combustível</TableCell>
                <TableCell>Nr. Motor</TableCell>
                <TableCell>TecDoc</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>1ª Mat.</TableCell>
                <TableCell>ID Cliente</TableCell>
                <TableCell>Rev. KM</TableCell>
                <TableCell>Rev. Dias</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((v) => (
                <TableRow key={v.id_veiculo} hover>
                  <TableCell>{v.matricula}</TableCell>
                  <TableCell>{v.marca}</TableCell>
                  <TableCell>{v.modelo}</TableCell>
                  <TableCell>{v.cc}</TableCell>
                  <TableCell>{v.cv}</TableCell>
                  <TableCell>{v.kw}</TableCell>
                  <TableCell>{v.combustivel}</TableCell>
                  <TableCell>{v.numero_motor}</TableCell>
                  <TableCell>{v.tecdoc}</TableCell>
                  <TableCell>{v.vin}</TableCell>
                  <TableCell>
                    {v.data_primeira_matricula?.slice(0, 10)}
                  </TableCell>
                  <TableCell>{v.id_cliente}</TableCell>
                  <TableCell>{v.rev_km}</TableCell>
                  <TableCell>{v.rev_dias}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
);
}
