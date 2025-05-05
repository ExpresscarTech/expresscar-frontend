import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard",    label: "Dashboard"        },
  { to: "/clientes",     label: "Clientes"         },
  { to: "/veiculos",     label: "Veículos"         },
  { to: "/ordens",       label: "Ordens"           },
  { to: "/fornecedores", label: "Fornecedores"     },
  { to: "/compras",      label: "Compras"          },
  { to: "/contas",       label: "Contas"           },
  { to: "/marcacoes",    label: "Marcações"        },
  { to: "/anexos",       label: "Anexos OR"        },
  { to: "/contas",       label: "Contas‑Correntes" },
  { to: "/logs",         label: "Log de Ações"     },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-slate-800 text-slate-100">
      <h2 className="p-4 text-lg font-semibold">ExpressCar</h2>
      <nav className="flex flex-col gap-1 px-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded px-3 py-2 text-sm ${
                isActive ? "bg-slate-700" : "hover:bg-slate-700"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
