// src/components/Layout.jsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));

export default function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ExpressCar
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => navigate("/nova-ordem")} startIcon={<AddIcon />}>
            Nova Ordem
          </Button>
          {/* demais botões… */}
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `${drawerWidth}px`,
          marginTop: (theme) => theme.spacing(8),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
