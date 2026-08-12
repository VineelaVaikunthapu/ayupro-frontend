"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms and privacy policy to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || null,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      // TODO: store the returned user info in real auth state (context,
      // cookie, or session token) once login sessions are implemented.
      console.log("Account created:", data);
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
          <Link href="/" className="relative h-24 w-24 overflow-hidden rounded-full bg-[#1F5D3A]">
            <Image src="/logo.jpg" alt="AyuPro" fill className="object-contain p-2" />
          </Link>
          <h1 className="mt-4 text-[24px] font-semibold text-[#173F29]">
            Create your account
          </h1>
          <p className="mt-1 text-[14px] text-[#5B5B5B]">
            Your home doctor, whenever you need it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="text-[13px] font-medium text-[#173F29]">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                autoComplete="given-name"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-[13px] font-medium text-[#173F29]">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                autoComplete="family-name"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
          </div>

          <div className="mt-3">
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
            <label htmlFor="phone" className="text-[13px] font-medium text-[#173F29]">
              Phone <span className="text-[#8A8A8A]">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              autoComplete="tel"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="text-[13px] font-medium text-[#173F29]">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
          </div>

          <div className="mt-3">
            <label htmlFor="confirmPassword" className="text-[13px] font-medium text-[#173F29]">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
          </div>

          <label className="mt-4 flex items-start gap-2 text-[13px] text-[#4A4A4A]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-black/20"
            />
            I agree to the Terms of Service and Privacy Policy, including
            how my health information is used.
          </label>

          {error && (
            <p className="mt-3 text-[13px] font-medium text-[#A32D2D]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d] disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] text-[#5B5B5B]">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#3E63E8] hover:underline">
            Log in
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