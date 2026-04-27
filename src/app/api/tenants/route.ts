import { getServerContext } from "@/lib/server/context/getServerContext";
import { tenantService } from "@/lib/server/services/tenant.service";

export async function GET() {
  try {
    const ctx = await getServerContext();
    const data = await tenantService.getAll(ctx);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error?.message ?? "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();

    const data = await tenantService.create(ctx, body);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}