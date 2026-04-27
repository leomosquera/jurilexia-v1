export async function getTenants() {
  const res = await fetch("/api/tenants")

  if (!res.ok) throw new Error("Error")

  return res.json()
}

export async function createTenant(data: any) {
  const res = await fetch("/api/tenants", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear");

  return res.json();
}

export async function updateTenant(id: string, data: any) {
  const res = await fetch(`/api/tenants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar");

  return res.json();
}

export async function deleteTenant(id: string) {
  const res = await fetch(`/api/tenants/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar");

  return res.json();
}