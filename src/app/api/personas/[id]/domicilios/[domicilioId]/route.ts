import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaDomicilioService } from "@/lib/server/services/persona-domicilio.service";
import { domicilioSchema } from "@/lib/validation/schemas/persona-domicilio.schema";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; domicilioId: string }> },
) {
  try {
    const ctx = await getServerContext();
    const { id, domicilioId } = await params;
    const body = await req.json();

    const parsed = domicilioSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 422 },
      );
    }

    const data = await personaDomicilioService.update(ctx, id, domicilioId, parsed.data);
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; domicilioId: string }> },
) {
  try {
    const ctx = await getServerContext();
    const { id, domicilioId } = await params;

    await personaDomicilioService.delete(ctx, id, domicilioId);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}
