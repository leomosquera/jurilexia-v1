import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaDomicilioService } from "@/lib/server/services/persona-domicilio.service";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string; domicilioId: string }> },
) {
  try {
    const ctx = await getServerContext();
    const { id, domicilioId } = await params;

    await personaDomicilioService.setPredeterminado(ctx, id, domicilioId);
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}
