"use client"

import { useActionState } from "react"
import { loginAction } from "@/app/(auth)/login/actions"

const initialState = { error: "" }

export function LoginForm() {
  const [state, formAction] = useActionState(
    loginAction as any,
    initialState
  )

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <button
        type="submit"
        className="w-full border rounded px-4 py-2 text-sm"
      >
        Ingresar
      </button>
    </form>
  )
}