// ── Types ──────────────────────────────────────────────────────────────────────

export type NavChildItem = {
  id: string;
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  /** If present the item is a direct link; otherwise it is a group toggle */
  href?: string;
  iconId: string;
  children?: NavChildItem[];
};

export type NavSection = {
  id: string;
  label: string;
  items: NavItem[];
};

// ── Navigation tree ────────────────────────────────────────────────────────────

export const navigation: NavSection[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        id: "inicio",
        label: "Inicio",
        href: "/",
        iconId: "home",
      },
      {
        id: "clientes",
        label: "Clientes",
        iconId: "users",
        children: [
          { id: "clientes-lista",  label: "Lista",  href: "/clientes" },
          { id: "clientes-crear",  label: "Crear",  href: "/clientes/crear" },
        ],
      },
      {
        id: "casos",
        label: "Casos",
        iconId: "briefcase",
        children: [
          { id: "casos-lista",  label: "Lista",  href: "/casos" },
          { id: "casos-crear",  label: "Crear",  href: "/casos/crear" },
        ],
      },
      {
        id: "expedientes",
        label: "Expedientes",
        iconId: "file-text",
        children: [
          { id: "expedientes-lista",  label: "Lista",  href: "/expedientes/demo" },
          { id: "expedientes-crear",  label: "Crear",  href: "/expedientes/crear" },
        ],
      },
    ],
  },

  {
    id: "procesos",
    label: "Procesos",
    items: [
      {
        id: "automatizaciones",
        label: "Automatizaciones",
        iconId: "zap",
        children: [
          { id: "anses",     label: "ANSES",     href: "/automatizaciones/anses" },
          { id: "cruces",    label: "Cruces",    href: "/automatizaciones/cruces" },
          { id: "consultas", label: "Consultas", href: "/automatizaciones/consultas" },
        ],
      },
    ],
  },

  {
    id: "operativo",
    label: "Operativo",
    items: [
      { id: "reportes", label: "Reportes", href: "/reportes", iconId: "bar-chart" },
      { id: "agenda",   label: "Agenda",   href: "/agenda",   iconId: "calendar" },
    ],
  },

  {
    id: "sistema",
    label: "Sistema",
    items: [
      { id: "herramientas",  label: "Herramientas",  href: "/herramientas",  iconId: "wrench" },
      { id: "ui-kit",        label: "UI Kit",         href: "/ui-kit",        iconId: "layers" },
      { id: "lexia",         label: "LexIA",          href: "/lexia",         iconId: "bot" },
      { id: "nuevo",         label: "Nuevo",          href: "/nuevo",         iconId: "plus-circle" },
      { id: "configuracion", label: "Configuración",  href: "/configuracion", iconId: "settings" },
      { id: "salir",         label: "Salir",          href: "/salir",         iconId: "log-out" },
    ],
  },
];
