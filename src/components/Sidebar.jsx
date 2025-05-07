// src/components/Sidebar.jsx
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventIcon from "@mui/icons-material/Event";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HistoryIcon from "@mui/icons-material/History";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

const links = [
  { to: "/dashboard",       label: "Dashboard",        icon: <DashboardIcon /> },
  { to: "/clientes",        label: "Clientes",         icon: <PeopleIcon /> },
  { to: "/veiculos",        label: "Veículos",         icon: <DirectionsCarIcon /> },
  { to: "/ordens",          label: "Ordens",           icon: <BuildIcon /> },
  { to: "/fornecedores",    label: "Fornecedores",     icon: <ShoppingCartIcon /> },
  { to: "/compras",         label: "Compras",          icon: <ShoppingCartIcon /> },
  { to: "/contas_correntes",label: "Contas-Correntes", icon: <AccountBalanceWalletIcon /> },
  { to: "/marcacoes",       label: "Marcações",        icon: <EventIcon /> },
  { to: "/anexos_or",       label: "Anexos OR",        icon: <AttachFileIcon /> },
  { to: "/logs",            label: "Log de Ações",     icon: <HistoryIcon /> },
  { to: "/artigos",         label: "Artigos",          icon: <InventoryIcon /> },
];

export default function Sidebar() {
  return (
    <StyledDrawer variant="permanent" open>
      <List disablePadding>
        <ListItem sx={{ py: 3, px: 2 }}>
          <ListItemText primary="ExpressCar" primaryTypographyProps={{ variant: "h6" }} />
        </ListItem>
        <Divider />
        {links.map(({ to, label, icon }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton
              component={NavLink}
              to={to}
              sx={{
                "&.active": { backgroundColor: "rgba(0,0,0,0.08)" },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
