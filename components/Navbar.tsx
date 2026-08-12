"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthContext";

const navLinks = [
  { label: "Conditions", href: "/conditions" },
  { label: "Symptom Checker", href: "/symptom-checker" },
  { label: "Symptom Checker (Telugu)", href: "/symptom-checker/te" },
  { label: "Drugs & Meds", href: "/drugs" },
  { label: "Treatments", href: "/treatments" },
  { label: "Health Articles", href: "/articles" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Specialists", href: "/specialists" },
  { label: "Labs", href: "/labs" },
  { label: "Insurance", href: "/insurance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30">
      {/* Signature accent bar tying the two brand colors together */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1F5D3A] to-[#3E63E8]" />

      <div className="flex w-full flex-col shadow-sm sm:flex-row">
        <Link
          href="/"
          className="relative h-32 w-full sm:h-auto sm:w-72 sm:shrink-0"
        >
          <Image
            src="/logo.jpg"
            alt="AyuPro — your home doctor"
            fill
            className="object-cover"
            priority
          />
        </Link>

        <div className="flex flex-1 flex-col bg-[#3E63E8] px-6 md:px-10">
          <div className="flex items-center justify-between">
            <nav className="hidden flex-wrap items-center gap-x-7 gap-y-3 py-5 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-bold leading-tight text-white transition-opacity hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              {user ? (
                <>
                  <Link
                    href="/account/profile"
                    className="text-[15px] font-bold text-white transition-opacity hover:opacity-80"
                  >
                    Hi, {user.firstName}
                  </Link>
                  <button
                    onClick={logout}
                    className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-[#3E63E8] transition-colors hover:bg-[#EEF2FC]"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[15px] font-bold text-white transition-opacity hover:opacity-80"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-[#3E63E8] transition-colors hover:bg-[#EEF2FC]"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <span className="pb-4 text-[16px] font-bold text-white md:hidden">
            Menu
          </span>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="flex flex-col gap-1 bg-[#3E63E8] px-6 pb-5 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-3 border-t border-white/20 pt-3">
            {user ? (
              <>
                <Link
                  href="/account/profile"
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-bold text-white transition-opacity hover:opacity-80"
                >
                  Hi, {user.firstName}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-[#3E63E8] transition-colors hover:bg-[#EEF2FC]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-bold text-white transition-opacity hover:opacity-80"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-4 py-2 text-[14px] font-bold text-[#3E63E8] transition-colors hover:bg-[#EEF2FC]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}