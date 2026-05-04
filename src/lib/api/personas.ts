// ─────────────────────────────
// GET ALL
// ─────────────────────────────
export async function getPersonas() {
  const res = await fetch("/api/personas");

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener personas");
  }

  return res.json();
}

// ─────────────────────────────
// GET ONE
// ─────────────────────────────
export async function getPersona(id: string) {
  const res = await fetch(`/api/personas/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener persona");
  }

  return res.json();
}

// ─────────────────────────────
// CREATE
// ─────────────────────────────
export async function createPersona(payload: {
  nombre: string;
  apellido: string;
  documento: string | null;
  cuil: string | null;
  email: string | null;
  telefono: string | null;
}) {
  const res = await fetch("/api/personas", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al crear persona");
  }

  return res.json();
}

// ─────────────────────────────
// UPDATE
// ─────────────────────────────
export async function updatePersona(
  id: string,
  payload: {
    nombre: string;
    apellido: string;
    documento: string | null;
    cuil: string | null;
    email: string | null;
    telefono: string | null;
  }
) {
  const res = await fetch(`/api/personas/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al actualizar persona");
  }
}

// ─────────────────────────────
// DELETE
// ─────────────────────────────
export async function deletePersona(id: string) {
  const res = await fetch(`/api/personas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar persona");
  }
}
