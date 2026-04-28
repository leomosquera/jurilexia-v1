import { getServerContext } from "@/lib/server/context/getServerContext";
import { tenantService } from "@/lib/server/services/tenant.service";

// ─────────────────────────────
// GET (uno)
// ─────────────────────────────
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    const data = await tenantService.getById(ctx, id);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Error interno" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────
// UPDATE
// ─────────────────────────────
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;
    const body = await req.json();

    const data = await tenantService.update(ctx, id, body);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Error interno" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────
// DELETE
// ─────────────────────────────
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    const data = await tenantService.delete(ctx, id);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message || "Error interno" },
      { status: 500 }
    );
  }
}