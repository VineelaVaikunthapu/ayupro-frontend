"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Invalid email or password.");
        setSubmitting(false);
        return;
      }

      // TODO: store the returned user info in real auth state (context,
      // cookie, or session token) once login sessions are implemented.
      console.log("Logged in:", data, "remember:", remember);
      router.push("/");
    } catch {
      setError("Couldn't reach the server. Is the backend running?");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2F2F2] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <Link
            href="/"
            className="relative h-24 w-24 overflow-hidden rounded-full bg-[#1F5D3A]"
          >
            <Image src="/logo.jpg" alt="AyuPro" fill className="object-contain p-2" />
          </Link>
          <h1 className="mt-4 text-[24px] font-semibold text-[#173F29]">
            Welcome back
          </h1>
          <p className="mt-1 text-[14px] text-[#5B5B5B]">
            Log in to your AyuPro account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7 shadow-sm"
        >
          <div>
            <label htmlFor="email" className="text-[13px] font-medium text-[#173F29]">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[13px] font-medium text-[#173F29]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-[#3E63E8] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
          </div>

          <label className="mt-4 flex items-center gap-2 text-[13px] text-[#4A4A4A]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-black/20"
            />
            Remember me
          </label>

          {error && (
            <p className="mt-3 text-[13px] font-medium text-[#A32D2D]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d] disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] text-[#5B5B5B]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-[#3E63E8] hover:underline">
            Sign up
          </Link>
        </p>

        <p className="mt-6 text-center text-[12px] text-[#8A8A8A]">
          AyuPro provides educational information only and is not a
          substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}