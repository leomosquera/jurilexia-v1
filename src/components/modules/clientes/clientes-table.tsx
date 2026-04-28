"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { deleteCliente } from "@/lib/api/cliente.api";
import { Icon } from "@/components/ui/icons/index";

type Cliente = {
  id: string;
  nombre: string;
  email: string;
};

type Props = {
  clientes: Cliente[];
};

export function ClientesTable({ clientes }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
        await deleteCliente(pendingId);

        toast.success("Cliente eliminado");

        setPendingId(null);

        router.replace("/clientes?success=delete");
      } catch (err: any) {
        toast.error(err.message ?? "Error al eliminar");
      }
    });
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell isHeader>Nombre</TableCell>
            <TableCell isHeader>Email</TableCell>
            <TableCell isHeader align="right">Acciones</TableCell>
          </TableRow>
        </TableHeader>

        <tbody>
          {clientes.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.nombre}</TableCell>

              <TableCell>
                <span className="text-zinc-400 text-sm">
                  {c.email}
                </span>
              </TableCell>

              <TableCell align="right">
                <div className="flex items-center justify-end gap-0.5">
                <Link
                    href={`/clientes/${c.id}`}
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    <Icon.Edit />
                  </Link>

                  <button
                    onClick={() => handleDeleteClick(c.id)}
                    className="flex size-7 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Icon.Trash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {clientes.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-zinc-400 py-4">
                No hay clientes
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>

      <ConfirmModal
        open={pendingId !== null}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        loading={isPending}
        title="Eliminar cliente"
        description="¿Estás seguro que querés eliminar este cliente?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
      />
    </>
  );
}