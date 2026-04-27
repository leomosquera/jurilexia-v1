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