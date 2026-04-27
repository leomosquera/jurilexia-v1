import { getServerContext } from "@/lib/server/context/getServerContext";
import { tenantService } from "@/lib/server/services/tenant.service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();
    const { id } = await params;

    await tenantService.update(ctx, id, body);

    return Response.json({ success: true });

  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    await tenantService.delete(ctx, id);

    return Response.json({ success: true });

  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}