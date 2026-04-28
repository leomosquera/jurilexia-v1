// ─────────────────────────────
// GET ALL
// ─────────────────────────────
export async function getTenants() {
  const res = await fetch("/api/tenants");

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener tenants");
  }

  return res.json();
}

// ─────────────────────────────
// GET ONE
// ─────────────────────────────
export async function getTenant(id: string) {
  const res = await fetch(`/api/tenants/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener tenant");
  }

  return res.json();
}

// ─────────────────────────────
// CREATE
// ─────────────────────────────
export async function createTenant(payload: any) {
  const res = await fetch("/api/tenants", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear tenant");
  }

  return res.json();
}

// ─────────────────────────────
// UPDATE
// ─────────────────────────────
export async function updateTenant(id: string, payload: any) {
  const res = await fetch(`/api/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar tenant");
  }
}

// ─────────────────────────────
// DELETE
// ─────────────────────────────
export async function deleteTenant(id: string) {
  const res = await fetch(`/api/tenants/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar tenant");
  }
}