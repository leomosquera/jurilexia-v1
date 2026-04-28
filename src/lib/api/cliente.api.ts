// ─────────────────────────────
// GET cliente
// ─────────────────────────────
export async function getCliente(id: string) {
  const res = await fetch(`/api/clientes/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener cliente");
  }

  return res.json();
}

// ─────────────────────────────
// CREATE cliente
// ─────────────────────────────
export async function createCliente(payload: {
  nombre: string;
  apellido: string;
  email: string;
}) {
  const res = await fetch("/api/clientes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear cliente");
  }

  return res.json();
}

// ─────────────────────────────
// UPDATE cliente
// ─────────────────────────────
export async function updateCliente(
  id: string,
  payload: {
    nombre: string;
    apellido: string;
    email: string;
  }
) {
  const res = await fetch(`/api/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar cliente");
  }
}

// ─────────────────────────────
// DELETE cliente
// ─────────────────────────────
export async function deleteCliente(id: string) {
  const res = await fetch(`/api/clientes/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar cliente");
  }
}