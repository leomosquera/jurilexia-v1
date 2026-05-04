"use client";

import { type ReactNode, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableSearch,
  useTableSearch,
} from "@/components/ui/table";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmModal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { IconChevronDown } from "@/components/ui/icons";
import { deletePersona } from "@/lib/api/personas";

type Persona = {
  id: string;
  nombre: string | null;
  apellido: string | null;
  documento: string | null;
  cuil: string | null;
  email: string | null;
  telefono: string | null;
};

type ColKey = "nombre" | "documento" | "cuil" | "email" | "telefono";

type ColDef = {
  key: ColKey;
  label: string;
  render: (p: Persona) => ReactNode;
};

const COL_DEFS: ColDef[] = [
  {
    key: "nombre",
    label: "Nombre",
    render: (p) => (
      <span className="font-medium text-zinc-900">
        {[p.nombre, p.apellido].filter(Boolean).join(" ") || "—"}
      </span>
    ),
  },
  {
    key: "documento",
    label: "Documento",
    render: (p) => (
      <span className="text-sm text-zinc-400">{p.documento ?? "—"}</span>
    ),
  },
  {
    key: "cuil",
    label: "CUIL",
    render: (p) => (
      <span className="text-sm text-zinc-400">{p.cuil ?? "—"}</span>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (p) => (
      <span className="text-sm text-zinc-400">{p.email ?? "—"}</span>
    ),
  },
  {
    key: "telefono",
    label: "Teléfono",
    render: (p) => (
      <span className="text-sm text-zinc-400">{p.telefono ?? "—"}</span>
    ),
  },
];

const SEARCH_KEYS = [
  "nombre",
  "apellido",
  "documento",
  "email",
  "telefono",
] as const satisfies ReadonlyArray<keyof Persona>;

type Props = {
  personas: Persona[];
};

export function PersonasTable({ personas }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { query, setQuery, filtered } = useTableSearch(personas, SEARCH_KEYS);

  const [visible, setVisible] = useState<Record<ColKey, boolean>>({
    nombre: true,
    documento: true,
    cuil: true,
    email: true,
    telefono: true,
  });

  const toggle = (key: ColKey) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

  const cols = COL_DEFS.filter((c) => visible[c.key]);
  const visibleCount = cols.length;

  function handleDeleteClick(id: string) {
    setPendingId(id);
  }

  function handleCancel() {
    setPendingId(null);
  }

  function handleConfirm() {
    if (!pendingId) return;

    startTransition(async () => {
      try {
        await deletePersona(pendingId);

        toast.success("Persona eliminada");

        setPendingId(null);

        router.refresh();
      } catch (err: any) {
        toast.error(err.message ?? "Error al eliminar");
      }
    });
  }

  return (
    <>
      <div className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3">
          <TableSearch
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nombre, documento, email…"
            aria-label="Buscar personas"
            className="max-w-xs"
          />

          <Dropdown align="end">
            <DropdownTrigger>
              <Button
                variant="secondary"
                size="sm"
                rightIcon={<IconChevronDown className="size-3.5" />}
              >
                Columns
                {visibleCount < COL_DEFS.length && (
                  <span className="ml-1 rounded bg-indigo-100 px-1 py-px text-[10px] font-semibold text-indigo-600">
                    {visibleCount}/{COL_DEFS.length}
                  </span>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownContent className="min-w-[10rem] py-1.5">
              {COL_DEFS.map((col) => (
                <label
                  key={col.key}
                  className="mx-1 flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-600 transition-colors duration-100 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  <Checkbox
                    size="sm"
                    checked={visible[col.key]}
                    onChange={() => toggle(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((col) => (
                <TableCell key={col.key} isHeader>
                  {col.label}
                </TableCell>
              ))}
              <TableCell isHeader align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={cols.length + 1}
                  className="px-4 py-8 text-center text-sm text-zinc-400"
                >
                  {query
                    ? `Sin resultados para "${query}"`
                    : "No hay personas"}
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  {cols.map((col) => (
                    <TableCell key={col.key}>{col.render(p)}</TableCell>
                  ))}
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-0.5">
                      <Link
                        href={`/personas/${p.id}`}
                        aria-label="Editar"
                        className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors duration-100 hover:bg-zinc-100 hover:text-zinc-700"
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                          <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z" />
                        </svg>
                      </Link>

                      <button
                        type="button"
                        aria-label="Eliminar"
                        onClick={() => handleDeleteClick(p.id)}
                        className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors duration-100 hover:bg-red-50 hover:text-red-500"
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                          <path d="M2 4h12" />
                          <path d="M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" />
                          <path d="M3.5 4l.75 9h7.5l.75-9" />
                          <path d="M6.5 7v4M9.5 7v4" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <ConfirmModal
        open={pendingId !== null}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        loading={isPending}
        title="Eliminar persona"
        description="¿Estás seguro que querés eliminar esta persona?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
      />
    </>
  );
}
