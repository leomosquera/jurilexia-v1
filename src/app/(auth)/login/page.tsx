import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[420px]">

        {/* Brand header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            J
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Accedé a tu espacio de trabajo
          </p>
        </div>

        {/* Form card */}
        <Card>
          <CardContent className="px-6 py-6">
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-400">
          JurilexIA &mdash; Plataforma de gestión jurídica
        </p>

      </div>
    </div>
  );
}
