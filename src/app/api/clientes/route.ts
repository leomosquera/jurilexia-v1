import { getServerContext } from "@/lib/server/context/getServerContext";

export async function POST(req: Request) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();

    // 1. crear persona
    const { data: persona, error: personaError } = await ctx.supabase
      .from("persona")
      .insert({
        tenant_id: ctx.tenant_id,
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
      })
      .select()
      .single();

    if (personaError) throw personaError;

    // 2. crear cliente
    const { error: clienteError } = await ctx.supabase
      .from("cliente")
      .insert({
        tenant_id: ctx.tenant_id,
        persona_id: persona.id,
      });

    if (clienteError) throw clienteError;

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}