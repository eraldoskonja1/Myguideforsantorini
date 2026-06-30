"use client";

import { useActionState } from "react";
import { adminLogin } from "@/lib/admin/auth";
import Logo from "@/components/ui/logo";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-santorini-500/10 bg-white p-8 shadow-[0_8px_40px_rgba(0,119,204,0.10)]">
          <h1 className="mb-1 font-serif text-2xl font-bold text-ink">Admin Login</h1>
          <p className="mb-8 text-sm text-ink-muted">Enter your admin password to continue.</p>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[13px] font-semibold text-ink-soft">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
              />
            </div>

            {state?.error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-santorini-500 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-santorini-700 disabled:opacity-60"
            >
              {isPending ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Forgot your password? Update <code className="rounded bg-gray-100 px-1">ADMIN_PASSWORD</code> in your environment variables.
        </p>
      </div>
    </div>
  );
}
