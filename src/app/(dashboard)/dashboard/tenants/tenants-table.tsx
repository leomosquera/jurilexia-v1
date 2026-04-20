"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { deleteTenant } from "./actions";

type Tenant = { id: string; nombre: string | null };

type Props = {
  tenants: Tenant[];
  successParam?: string;
  errorParam?: string;
};

export function TenantsTable({ tenants, successParam, errorParam }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!successParam && !errorParam) return;

    if (successParam === "create") toast.success("Tenant creado");
    else if (successParam === "update") toast.success("Tenant actualizado");
    else if (successParam === "delete") toast.success("Tenant eliminado");
    else if (errorParam) toast.error("Ocurrió un error");

    router.replace("/dashboard/tenants");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeleteClick(id: string) {
    setPendingId(id);
  }

  function handleCancel() {
    setPendingId(null);
  }

  function handleConfirm() {
    if (!pendingId) return;
    startTransition(async () => {
      await deleteTenant(pendingId);
      setPendingId(null);
    });
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Nombre</TableCell>
            <TableCell isHeader align="right">Acciones</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell>{tenant.nombre}</TableCell>
              <TableCell align="right">
                <div className="flex items-center justify-end gap-0.5">
                  <Link
                    href={`/dashboard/tenants/${tenant.id}`}
                    aria-label="Editar"
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors duration-100 hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
                      <path d="M11.5 2.5a1.414 1.414 0 0 1 2 2L5 13H3v-2L11.5 2.5z" />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    aria-label="Eliminar"
                    onClick={() => handleDeleteClick(tenant.id)}
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors duration-100 hover:bg-red-50 hover:text-red-500"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
                      <path d="M2 4h12" />
                      <path d="M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" />
                      <path d="M3.5 4l.75 9h7.5l.75-9" />
                      <path d="M6.5 7v4M9.5 7v4" />
                    </svg>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <ConfirmModal
        open={pendingId !== null}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        loading={isPending}
        title="Eliminar tenant"
        description="¿Estás seguro que querés eliminar este tenant?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
      />
    </>
  );
}
