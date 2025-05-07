// src/pages/NovaOrdem.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  Box, Typography, TextField, Button,
  FormControlLabel, Checkbox, Snackbar, Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const API = import.meta.env.VITE_API_URL;

// Schema de validação
const schema = yup.object({
  matricula: yup
    .string()
    .transform((val) => val.replace(/[^A-Z0-9]/gi, "").toUpperCase())
    .required("Matrícula é obrigatória")
    .max(10, "Máx. 10 caracteres"),
  km: yup
    .number()
    .typeError("KM deve ser um número")
    .required("KM é obrigatório")
    .min(0, "KM não pode ser negativo"),
  descricao: yup
    .string()
    .transform((val) => val.toUpperCase())
    .required("Descrição é obrigatória")
    .max(200, "Máx. 200 caracteres"),
  revisao: yup.boolean(),
  nome_cliente: yup
    .string()
    .transform((val) => val.toUpperCase())
    .max(100, "Máx. 100 caracteres"),
  contacto: yup
    .string()
    .transform((val) => val.toUpperCase())
    .max(50, "Máx. 50 caracteres"),
  data_entrega: yup
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .notRequired(),
}).required();

export default function NovaOrdem() {
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackInfo, setSnackInfo] = useState({ severity: "success", message: "" });

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      matricula: "",
      km: "",
      descricao: "",
      revisao: false,
      nome_cliente: "",
      contacto: "",
      data_entrega: "",
    }
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API}/ordens`, data);
      setSnackInfo({ severity: "success", message: "Ordem criada com sucesso!" });
      setOpenSnack(true);
      setTimeout(() => navigate("/ordens"), 1000);
    } catch (err) {
      console.error(err);
      setSnackInfo({ severity: "error", message: "Falha ao criar ordem." });
      setOpenSnack(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: 3, maxWidth: 600, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Nova Ordem</Typography>

      <Controller
        name="matricula"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Matrícula *"
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={!!errors.matricula}
            helperText={errors.matricula?.message}
          />
        )}
      />

      <Controller
        name="km"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="KM *"
            type="number"
            error={!!errors.km}
            helperText={errors.km?.message}
          />
        )}
      />

      <Controller
        name="descricao"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Intervenção *"
            multiline
            rows={3}
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={!!errors.descricao}
            helperText={errors.descricao?.message}
          />
        )}
      />

      <Controller
        name="revisao"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Revisão"
          />
        )}
      />

      <Controller
        name="nome_cliente"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome Cliente"
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={!!errors.nome_cliente}
            helperText={errors.nome_cliente?.message}
          />
        )}
      />

      <Controller
        name="contacto"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Contacto"
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={!!errors.contacto}
            helperText={errors.contacto?.message}
          />
        )}
      />

      <Controller
        name="data_entrega"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Data Entrega"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.data_entrega}
            helperText={errors.data_entrega?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "A gravar…" : "Criar Ordem"}
      </Button>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnack(false)} severity={snackInfo.severity} sx={{ width: '100%' }}>
          {snackInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
