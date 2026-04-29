"use client";

import type { BadgeVariant } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardHeaderActions,
} from "@/components/ui/card";
import { TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Checkbox } from "@/components/ui/checkbox";
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Icon } from "@/components/ui/icons/index";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden>
      <path d="M2 8 6 4l4 4" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-2.5" aria-hidden>
      <path d="M2 4l4 4 4-4" />
    </svg>
  );
}
function TaskIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M5 8l2 2 4-4" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M8 1.5A5 5 0 0 0 3 6.5v2L2 11h12l-1-2.5v-2A5 5 0 0 0 8 1.5Z" />
      <path d="M6.5 11.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l3 2" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0 text-gray-400" aria-hidden>
      <path d="M9 1.5H4a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6L9 1.5Z" />
      <path d="M9 1.5V6H13.5M5.5 9.5h5M5.5 11.5h3" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <rect x="1.5" y="5" width="13" height="9" rx="1.5" />
      <path d="M5.5 5V3.5A1.5 1.5 0 0 1 7 2h2a1.5 1.5 0 0 1 1.5 1.5V5M1.5 9h13" />
    </svg>
  );
}
function CheckDoneIcon() {
  return (
    <svg viewBox="0 0 10 10" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" fill="none" className="size-2.5" aria-hidden>
      <polyline points="1.5,5.5 4,8 8.5,2" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M13.5 6A5.5 5.5 0 1 0 12.3 10.2" />
      <polyline points="13.5 2 13.5 6 9.5 6" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" />
    </svg>
  );
}
function DotsVerticalIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5 text-gray-400" aria-hidden>
      <circle cx="8" cy="3.5" r="1.25" />
      <circle cx="8" cy="8" r="1.25" />
      <circle cx="8" cy="12.5" r="1.25" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M14 2 2 8l4.5 1.5L14 2ZM6.5 9.5 9 14l5-12" />
    </svg>
  );
}
function PaperclipIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M13 7.5 7.5 13a3.5 3.5 0 0 1-5-5l6-6A2 2 0 0 1 11.4 5L6 10.4A.5.5 0 0 1 5.3 9.7L10 5" />
    </svg>
  );
}
function PlusSmIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" className="size-3" aria-hidden>
      <path d="M6 2v8M2 6h8" />
    </svg>
  );
}

// ── Avatars ─────────────────────────────────────────────────────────────────
function getAvatarColor(name: string) {
  const colors = [
    "bg-blue-100 text-blue-600 shadow-inner",
    "bg-green-100 text-green-600 shadow-inner",
    "bg-purple-100 text-purple-600 shadow-inner",
    "bg-orange-100 text-orange-600 shadow-inner",
    "bg-pink-100 text-pink-600 shadow-inner",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// ── Status / priority cells ───────────────────────────────────────────────────

type TaskStatus = "Pendiente" | "En progreso" | "Programada" | "Realizada";
type TaskPriority = "Alta" | "Media" | "Baja";

const STATUS_COLORS: Record<TaskStatus, string> = {
  "Pendiente": "bg-yellow-100 text-yellow-700",
  "En progreso": "bg-blue-100 text-blue-700",
  "Programada": "bg-gray-100 text-gray-600",
  "Realizada": "bg-green-100 text-green-700",
};

const STATUS_OPTIONS: TaskStatus[] = ["Pendiente", "En progreso", "Programada", "Realizada"];

function StatusCell({
  status,
  onChange,
}: {
  status: TaskStatus;
  onChange?: (value: TaskStatus) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition ${STATUS_COLORS[status]}`}
      >
        {status}
        <ChevronDownIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[140px] right-0">
        {STATUS_OPTIONS.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={() => onChange?.(s)}
            className="flex items-center justify-between gap-2"
          >
            <span>{s}</span>

            {/* indicador de color */}
            <span
              className={`h-2 w-2 rounded-full ${
                  s === "Pendiente"
                  ? "bg-yellow-500"
                  : s === "En progreso"
                  ? "bg-blue-500"
                  : s === "Realizada"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PriorityCell({ priority }: { priority: TaskPriority }) {
  if (priority === "Alta")
    return <Badge variant="danger">Alta</Badge>;
  if (priority === "Media")
    return <Badge variant="warning">Media</Badge>;
  return <Badge variant="neutral">Baja</Badge>;
}

function ActuacionTypeIcon({ type }: { type: "document" | "briefcase" | "scales" }) {
  if (type === "briefcase") return <BriefcaseIcon />;
  return <FileIcon />;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const TEAM = ["Ana García", "Carlos Ruiz", "Laura Medina"];

const TIMELINE_STEPS: Array<{
  label: string;
  status: "done" | "current" | "pending";
  date?: string;
}> = [
  { label: "Inicio",      status: "done",    date: "01/03" },
  { label: "Preparación", status: "done",    date: "15/03" },
  { label: "Presentado",  status: "done",    date: "01/04" },
  { label: "En trámite",  status: "current"              },
  { label: "Audiencia",   status: "pending"              },
  { label: "Resolución",  status: "pending"              },
  { label: "Finalizado",  status: "pending"              },
];

const TASKS: Array<{
  id: string; name: string; assigned: string;
  date: string; priority: TaskPriority; status: TaskStatus;
}> = [
  { id: "t1", name: "Presentar escrito de responde",    assigned: "María López",  date: "15 may", priority: "Alta",  status: "Pendiente"    },
  { id: "t2", name: "Revisar documentación adjunta",    assigned: "Ana García",   date: "18 may", priority: "Media", status: "En progreso"  },
  { id: "t3", name: "Coordinar audiencia con cliente",  assigned: "Carlos Ruiz",  date: "20 may", priority: "Baja",  status: "Programada"   },
  { id: "t4", name: "Notificar resolución provisional", assigned: "Laura Medina", date: "22 may", priority: "Alta",  status: "Pendiente"    },
  { id: "t5", name: "Revisar documentación adjunta",    assigned: "Ana García",   date: "18 may", priority: "Media", status: "En progreso"  },
  { id: "t6", name: "Coordinar audiencia con cliente",  assigned: "Carlos Ruiz",  date: "20 may", priority: "Baja",  status: "Programada"   },
  { id: "t7", name: "Notificar resolución provisional", assigned: "Laura Medina", date: "22 may", priority: "Alta",  status: "Pendiente"    },
];

const DOCS: Array<{
  id: string; nombre: string; tipo: string;
  subidoPor: string; fecha: string; tamaño: string;
}> = [
  { id: "d1", nombre: "Escrito inicial.pdf",        tipo: "Escrito",       subidoPor: "María López",  fecha: "10 abr", tamaño: "245 KB" },
  { id: "d2", nombre: "Contrato laboral.pdf",       tipo: "Contrato",      subidoPor: "Ana García",   fecha: "12 abr", tamaño: "1.2 MB" },
  { id: "d3", nombre: "Liquidación final.xlsx",     tipo: "Planilla",      subidoPor: "Carlos Ruiz",  fecha: "15 abr", tamaño: "88 KB"  },
  { id: "d4", nombre: "Notificación juzgado.pdf",   tipo: "Notificación",  subidoPor: "Laura Medina", fecha: "02 may", tamaño: "52 KB"  },
];

const ACTUACIONES: Array<{
  id: string; day: string; month: string; title: string; desc: string;
  variant: BadgeVariant; badge: string; type: "document" | "briefcase" | "scales";
}> = [
  { id: "a1", day: "02", month: "MAY", title: "Notificación de apertura",    desc: "El juzgado notificó la apertura formal del expediente.",     variant: "success", badge: "Procesada",   type: "document"   },
  { id: "a2", day: "15", month: "ABR", title: "Presentación de pruebas",     desc: "Se adjuntaron los documentos requeridos por el tribunal.",   variant: "neutral", badge: "Informativa", type: "briefcase"  },
  { id: "a3", day: "10", month: "ABR", title: "Ingreso del escrito inicial",  desc: "Presentación formal ante mesa de entradas.",                 variant: "success", badge: "Procesada",   type: "document"   },
  { id: "a4", day: "20", month: "MAY", title: "Audiencia preliminar",         desc: "Citación a audiencia con ambas partes convocadas.",          variant: "warning", badge: "Pendiente",   type: "scales"     },
];

const grouped = {
  nuevas: ACTUACIONES.slice(0, 1),
  semana: ACTUACIONES.slice(1, 3),
  anteriores: ACTUACIONES.slice(3),
};

const COMMENTS: Array<{ id: string; author: string; time: string; text: string }> = [
  { id: "c1", author: "María López", time: "hace 2 horas",  text: "Recordar solicitar copia del acta de liquidación antes del viernes."           },
  { id: "c2", author: "Carlos Ruiz", time: "hace 1 día",    text: "Hablé con el cliente. Confirma que tiene toda la documentación disponible."     },
  { id: "c3", author: "Ana García",  time: "hace 3 días",   text: "El juzgado requirió prueba informativa adicional. Lo agrego al plan."           },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExpedientesDemoPage() {

  const [tasks, setTasks] = useState(TASKS);
  const [showDetails, setShowDetails] = useState(false);

  function InfoRow({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-medium text-gray-700">{value}</span>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6 mx-auto px-6">

        {/* ── HEADER ───────────────────────────────────────────────────────── */}
        <div className="mb-8">

          <div className="flex items-start justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                <Icon.Folder className="size-7" />
              </div>

              {/* TEXT */}
              <div className="space-y-1">

                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    EXP-2024-000123
                  </h1>

                  <Badge variant="warning">En trámite</Badge>
                </div>

                <p className="text-md font-bold text-gray-600">
                  García, Juan Carlos c/ Empresa XYZ S.A. s/ Despido
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400">

                  <div className="flex items-center gap-1.5">
                    <Icon.Folder className="size-4.5" />
                    <span>Fuero Civil y Comercial</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Icon.Folder className="size-4.5" />
                    <span>Juzgado N° 12</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Icon.Folder className="size-4.5" />
                    <span>Carátula: Laboral / Despido</span>
                  </div>

                  {/* BOTÓN COLLAPSE */}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="ml-1 flex items-center justify-center size-6 rounded-md border border-gray-200 bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                  >
                    <Icon.ChevronDown
                      className={`size-3 transition-transform ${
                        showDetails ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">

              {/* Responsable */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Responsable</span>

                <Avatar
                  name="María López"
                  size="sm"
                  className={getAvatarColor("María López")}
                />

                <span className="text-sm text-gray-700 font-bold">María López</span>
              </div>

              {/* Equipo */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Equipo</span>

                <div className="flex items-center -space-x-2">
                  {TEAM.map((name) => (
                    <Avatar
                      key={name}
                      name={name}
                      size="sm"
                      className={getAvatarColor(name)}
                    />
                  ))}

                  {/* ADD USER */}
                  <button className="flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                    <PlusSmIcon />
                  </button>
                </div>
              </div>

              {/* Última actividad */}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <ClockIcon />
                <span>Hace 2 horas</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="md">
                  Editar
                </Button>
                <Button variant="primary" size="md">
                  Cambiar estado
                </Button>
              </div>

            </div>

          </div>

        </div>

        {showDetails && (
        <div className="mt-2">
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 text-sm">

                {/* COLUMNA 1 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase">
                    Información del caso
                  </p>

                  <InfoRow label="Tipo de proceso" value="Ordinario Laboral" />
                  <InfoRow label="Número de caso" value="CAS-2024-000045" />
                  <InfoRow label="Fecha de inicio" value="18/05/2024" />
                  <InfoRow label="Estado" value="En trámite" />
                  <InfoRow label="Prioridad" value={<Badge variant="danger">Alta</Badge>} />
                </div>

                {/* COLUMNA 2 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase">
                    Información del expediente
                  </p>

                  <InfoRow label="Número" value="EXP-2024-000123" />
                  <InfoRow label="Carátula" value="18/05/2024" />
                  <InfoRow label="Origen" value="PJN" />
                  <InfoRow label="Instancia" value="Primera" />
                </div>

                {/* COLUMNA 3 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase">
                    Cliente
                  </p>

                  <InfoRow label="Nombre" value="García, Juan Carlos" />
                  <InfoRow label="DNI" value="20.123.456" />
                  <InfoRow label="Teléfono" value="+54 11 1234-5678" />
                  <InfoRow label="Email" value="juan@mail.com" />
                </div>

                {/* COLUMNA 4 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase">
                    Jurisdicción
                  </p>

                  <InfoRow label="Fuero" value="Laboral" />
                  <InfoRow label="Juzgado" value="N° 12" />
                  <InfoRow label="Secretaría" value="Única" />
                </div>

                {/* COLUMNA 5 */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase">
                    Datos adicionales
                  </p>

                  <InfoRow label="Moneda" value="ARS" />
                  <InfoRow label="Valor" value="$ 5.000.000" />
                  <InfoRow
                    label="Etiquetas"
                    value={
                      <div className="flex gap-1">
                        <Badge variant="neutral">Despido</Badge>
                        <Badge variant="neutral">Indemnización</Badge>
                        <Badge variant="danger">Prioridad alta</Badge>
                      </div>
                    }
                  />
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
        )}

        {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
        <Card flat>
          <CardContent className="pt-6 pb-3">
            <div className="-mx-6 flex items-start">

              {TIMELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex flex-1 flex-col items-center">

                  {/* ROW SUPERIOR */}
                  <div className="relative flex items-center justify-center w-full">

                    {/* LÍNEA IZQUIERDA */}
                    {i !== 0 && (
                      <div
                        className={`absolute left-0 right-1/2 h-px top-1/2 -translate-y-1/2 ${
                          step.status === "done" ? "bg-blue-200" : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* LÍNEA DERECHA */}
                    {i !== TIMELINE_STEPS.length - 1 && (
                      <div
                        className={`absolute left-1/2 right-0 h-px top-1/2 -translate-y-1/2 ${
                          step.status === "done" ? "bg-blue-200" : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* CÍRCULO */}
                    <div
                      className={`relative z-10 flex size-6 items-center justify-center rounded-full text-xs font-semibold ${
                        step.status === "done"
                          ? "bg-blue-500 text-white"
                          : step.status === "current"
                            ? "bg-white ring-2 ring-blue-500 text-blue-600"
                            : "bg-gray-100 text-gray-400 ring-1 ring-gray-200"
                      }`}
                    >
                      {step.status === "done" ? <CheckDoneIcon /> : i + 1}
                    </div>

                  </div>

                  {/* ROW TEXTO */}
                  <div className="mt-3.5 flex flex-col items-center gap-0.5 text-center">
                    <span
                      className={`max-w-[90px] text-xs leading-snug ${
                        step.status === "current"
                          ? "font-semibold text-blue-600"
                          : step.status === "done"
                            ? "font-medium text-gray-500"
                            : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>

                    {step.date && (
                      <span className="text-[10px] tabular-nums text-gray-400">
                        {step.date}
                      </span>
                    )}
                  </div>

                </div>
              ))}

            </div>
          </CardContent>
        </Card>

        {/* ── 2-ACCIONES ───────────────────────────────────────────── */}
        <Card flat>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

              {/* ITEM */}
              <div className="space-y-2 px-4 first:pl-0 last:pr-0 xl:border-r xl:border-gray-200">
                <p className="text-xs font-semibold uppercase">Próxima acción</p>

                <p className="text-sm font-semibold text-gray-900">
                  Presentar demanda
                </p>

                <p className="text-xs text-gray-500">
                  Vence hoy · Asignado a Juan Pérez
                </p>

                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="primary">Ir a tarea</Button>
                  <Button size="sm" variant="secondary">Completar</Button>
                </div>
              </div>

              <div className="space-y-2 px-4 first:pl-0 last:pr-0 xl:border-r xl:border-gray-200">
                <p className="text-xs text-gray-400">Alertas</p>

                <div className="space-y-1 text-xs text-gray-600">

                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-red-500" />
                    2 tareas vencidas
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-400" />
                    Sin movimiento hace 5 días
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-orange-400" />
                    Falta documentación clave
                  </div>

                </div>
              </div>

              <div className="space-y-2 px-4 first:pl-0 last:pr-0 xl:border-r xl:border-gray-200">
                <p className="text-xs text-gray-400">Estado del expediente</p>

                <p className="text-sm font-semibold text-green-600">
                  En trámite
                </p>

                <p className="text-xs text-gray-400">Etapa 3 de 7</p>

                <ProgressBar value={43} />
              </div>

              <div className="space-y-2 px-4 first:pl-0 last:pr-0">
                <p className="text-xs text-gray-400">Último movimiento</p>

                <p className="text-sm font-semibold text-gray-900">
                  Actuación PJN
                </p>

                <p className="text-xs text-gray-400">
                  Hace 2 días (15/05/2024)
                </p>

                <p className="text-xs text-gray-500 italic">
                  "Se corre traslado de la demanda..."
                </p>

                <div className="pt-1">
                  <Button size="sm" variant="secondary">
                    Ver actuación
                  </Button>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* ── 2-COLUMN MAIN GRID ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* 1. TAREAS */}
          <Card flat>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Tareas</CardTitle>
                <Badge variant="neutral">{TASKS.length}</Badge>
              </div>
              <CardHeaderActions>
                <Button variant="outline-primary" size="md" leftIcon={<PlusSmIcon />}>
                  Nueva tarea
                </Button>
              </CardHeaderActions>
            </CardHeader>

            {/* Tabs */}
            <div className="px-4 pt-3 pb-3">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                {["Todas", "Mías", "Vencidas"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                      tab === "Todas"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader className="w-8 pl-4" />
                    <TableCell isHeader>Tarea</TableCell>
                    <TableCell isHeader>Asignado a</TableCell>
                    <TableCell isHeader>Vence</TableCell>
                    <TableCell isHeader align="center">Prioridad</TableCell>
                    <TableCell isHeader align="center" className="pr-4">Estado</TableCell>
                    <TableCell isHeader align="right" className="pr-4">Acciones</TableCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {tasks.map((task, index) => (
                    <TableRow key={task.id}>
                      <TableCell className="w-8 pl-4 py-2">
                        <Checkbox size="sm" readOnly />
                      </TableCell>
                      <TableCell className="py-2">
                      <span className="text-sm font-medium text-gray-900">{task.name}</span>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={task.assigned} size="sm" />
                          <span className="text-xs text-gray-500">{task.assigned.split(" ")[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="text-xs text-gray-400">{task.date}</span>
                      </TableCell>
                      <TableCell align="center" className="py-2">
                        <PriorityCell priority={task.priority} />
                      </TableCell>
                      <TableCell align="center" className="pr-4 py-2">
                        <StatusCell
                          status={task.status}
                          onChange={(newStatus) => {
                            const updated = [...tasks];
                            updated[index] = {
                              ...task,
                              status: newStatus,
                            };
                            setTasks(updated);
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" className="pr-4">
                        <div className="flex items-center justify-end gap-1">

                          {/* Edit */}
                          <button className="flex size-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
                            <Icon.Edit className="size-3.5" />
                          </button>

                          {/* 3 dots siempre visible pero más tenue */}
                          <button className="flex size-7 items-center justify-center rounded text-gray-300 hover:bg-gray-100 hover:text-gray-700 transition">
                            <DotsVerticalIcon />
                          </button>

                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 2. ACTUACIONES */}
          <Card flat>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Actuaciones</CardTitle>
                <Badge variant="neutral">{ACTUACIONES.length}</Badge>
              </div>

              <CardHeaderActions>
                <Button variant="primary" size="md" leftIcon={<PlusSmIcon />}>
                  Actuación
                </Button>
                <Button variant="outline-primary" size="md" leftIcon={<RefreshIcon />}>
                  PJN
                </Button>
              </CardHeaderActions>
            </CardHeader>

            {/* Tabs */}
            <div className="px-4 pt-3 pb-3">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                {["Todas", "PJN", "Manuales", "Con acción"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                      tab === "Todas"
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Agrupación mock */}
            {(() => {
              const grouped = {
                nuevas: ACTUACIONES.slice(0, 1),
                semana: ACTUACIONES.slice(1, 3),
                anteriores: ACTUACIONES.slice(3),
              };

              return (
                <div className="divide-y divide-gray-200">

                  {/* ── NUEVAS ── */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                    Nuevas (1)
                  </div>

                  {grouped.nuevas.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-3 px-4 py-3 bg-green-50 border-y border-green-100"
                    >
                      {/* Fecha */}
                      <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                        <span className="text-sm font-bold text-gray-900 leading-none">{act.day}</span>
                        <span className="mt-0.5 text-[10px] uppercase text-gray-400 leading-none">{act.month}</span>
                      </div>

                      {/* Icono */}
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400">
                        <ActuacionTypeIcon type={act.type} />
                      </div>

                      {/* Contenido */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-gray-900">
                            {act.title}
                          </p>

                          <div className="flex items-center gap-2">
                            <Badge variant="danger">Requiere acción</Badge>

                            <Button variant="primary" size="sm">
                              Crear tarea
                            </Button>

                            <Button variant="secondary" size="sm">
                              Ver doc
                            </Button>

                            <button className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                              <DotsVerticalIcon />
                            </button>
                          </div>
                        </div>

                        <p className="mt-1 text-sm text-gray-600">{act.desc}</p>

                        <p className="mt-1 text-xs text-gray-400">
                          PJN · Juzgado Nacional
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* ── ESTA SEMANA ── */}
                  <div className="px-4 py-2 text-xs font-semibold text-blue-500">
                    Esta semana (2)
                  </div>

                  {grouped.semana.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      {/* Fecha */}
                      <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                        <span className="text-sm font-bold text-gray-900 leading-none">{act.day}</span>
                        <span className="text-[10px] uppercase text-gray-400 leading-none">{act.month}</span>
                      </div>

                      {/* Icono */}
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400">
                        <ActuacionTypeIcon type={act.type} />
                      </div>

                      {/* Contenido */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {act.title}
                          </p>

                          <div className="flex items-center gap-2">
                            <Badge variant={act.variant}>{act.badge}</Badge>

                            <Button variant="secondary" size="sm">
                              Ver doc
                            </Button>

                            <button className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                              <DotsVerticalIcon />
                            </button>
                          </div>
                        </div>

                        <p className="mt-1 text-sm text-gray-600">{act.desc}</p>

                        <p className="mt-1 text-xs text-gray-400">
                          PJN · Juzgado Nacional
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* ── ANTERIORES ── */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                    Anteriores
                  </div>

                  {grouped.anteriores.map((act) => (
                    <div
                      key={act.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      {/* Fecha */}
                      <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                        <span className="text-sm font-bold text-gray-900 leading-none">{act.day}</span>
                        <span className="text-[10px] uppercase text-gray-400 leading-none">{act.month}</span>
                      </div>

                      {/* Icono */}
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-400">
                        <ActuacionTypeIcon type={act.type} />
                      </div>

                      {/* Contenido */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {act.title}
                          </p>

                          <div className="flex items-center gap-2">
                            <Badge variant={act.variant}>{act.badge}</Badge>

                            <button className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100">
                              <DotsVerticalIcon />
                            </button>
                          </div>
                        </div>

                        <p className="mt-1 text-sm text-gray-600">{act.desc}</p>

                        <p className="mt-1 text-xs text-gray-400">
                          PJN · Mesa de entradas
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              );
            })()}
          </Card>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* 4. DOCUMENTOS */}
          <Card flat>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Documentos</CardTitle>
                <Badge variant="neutral">{DOCS.length}</Badge>
              </div>
              <CardHeaderActions>
                <Button variant="outline-primary" size="md" leftIcon={<PlusSmIcon />}>
                  Subir documento
                </Button>
              </CardHeaderActions>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader className="pl-4">Nombre</TableCell>
                    <TableCell isHeader>Tipo</TableCell>
                    <TableCell isHeader>Subido por</TableCell>
                    <TableCell isHeader>Fecha</TableCell>
                    <TableCell isHeader align="right">Tamaño</TableCell>
                    <TableCell isHeader align="right" className="pr-4">Acciones</TableCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {DOCS.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="pl-4 py-2">
                        <div className="flex items-center gap-2">
                          <FileIcon />
                          <span className="text-xs text-gray-900">{doc.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge variant="neutral">{doc.tipo}</Badge>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={doc.subidoPor} size="sm" />
                          <span className="text-xs text-gray-500">{doc.subidoPor.split(" ")[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="text-xs text-gray-400">{doc.fecha}</span>
                      </TableCell>
                      <TableCell align="right" className="py-2">
                        <span className="text-xs tabular-nums text-gray-400">{doc.tamaño}</span>
                      </TableCell>
                      <TableCell align="right" className="pr-4 py-2">
                        <div className="flex items-center justify-end gap-0.5">
                          <button className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                            <DownloadIcon />
                          </button>
                          <button className="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                            <DotsVerticalIcon />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* 3. COMENTARIOS */}
          <Card flat>
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
              <Badge variant="neutral">{COMMENTS.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center gap-2">
                <Avatar name="María López" size="sm" />
                <div className="relative flex-1">
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Adjuntar archivo"
                  >
                    <PaperclipIcon />
                  </button>
                  <input
                    type="text"
                    readOnly
                    placeholder="Escribir un comentario..."
                    className="h-7 w-full rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-8 text-xs text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    aria-label="Enviar comentario"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {COMMENTS.map((c) => (
                  <div key={c.id} className="flex gap-2">
                    <Avatar name={c.author} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-medium text-gray-900">{c.author}</span>
                        <span className="text-[11px] text-gray-400">{c.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-600">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </MainLayout>
  );
}
