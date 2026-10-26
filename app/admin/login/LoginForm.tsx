"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <form
      action={formAction}
      style={{ display: "grid", gap: 12, maxWidth: 320 }}
    >
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
      {state?.error && <p style={{ color: "tomato" }}>{state.error}</p>}
    </form>
  );
}
