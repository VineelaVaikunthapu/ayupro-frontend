"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/insurance),
// backed by insurance_plans + insurance_providers tables, once the API exists.
const plans = [
  {
    slug: "blueshield-silver-ppo",
    provider: "BlueShield Health",
    name: "Silver PPO",
    planType: "PPO",
    monthlyPremium: 320,
  },
  {
    slug: "blueshield-gold-hmo",
    provider: "BlueShield Health",
    name: "Gold HMO",
    planType: "HMO",
    monthlyPremium: 410,
  },
  {
    slug: "careplus-bronze-ppo",
    provider: "CarePlus Insurance",
    name: "Bronze PPO",
    planType: "PPO",
    monthlyPremium: 260,
  },
  {
    slug: "apollo-family-hmo",
    provider: "Apollo Insurance",
    name: "Family HMO",
    planType: "HMO",
    monthlyPremium: 480,
  },
];

const providers = ["All", "BlueShield Health", "CarePlus Insurance", "Apollo Insurance"];

export default function InsurancePage() {
  const [activeProvider, setActiveProvider] = useState("All");

  const filtered =
    activeProvider === "All"
      ? plans
      : plans.filter((p) => p.provider === activeProvider);

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Insurance</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Browse insurance plans and see which hospitals and specialists
          they cover.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setActiveProvider(p)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeProvider === p
                  ? "bg-[#1F5D3A] text-white"
                  : "bg-white text-[#4A4A4A] hover:bg-[#EEF6EF]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {filtered.map((plan) => (
            <Link
              key={plan.slug}
              href={`/insurance/${plan.slug}`}
              className="block rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-wide text-[#3E63E8]">
                    {plan.provider}
                  </span>
                  <h2 className="mt-0.5 text-[17px] font-semibold text-[#173F29]">
                    {plan.name}
                  </h2>
                  <p className="mt-0.5 text-[14px] text-[#4A4A4A]">
                    {plan.planType}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#173F29]">
                  ${plan.monthlyPremium}/mo
                </span>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No plans from this provider yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}