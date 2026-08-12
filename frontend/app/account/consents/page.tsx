"use client";

import { useState } from "react";
import AccountTabs from "../../../components/AccountTabs";

// TODO: replace with a real fetch/update against the backend
// (GET/PATCH /api/account/consents), backed by the user_consents table.
const initialConsents = [
  {
    type: "terms",
    label: "Terms of service",
    description: "Required to use AyuPro.",
    granted: true,
    required: true,
  },
  {
    type: "privacy",
    label: "Privacy policy",
    description: "Required to use AyuPro.",
    granted: true,
    required: true,
  },
  {
    type: "health_data",
    label: "Health data usage",
    description: "Allows AyuPro to use your symptom and profile data to generate results.",
    granted: true,
    required: true,
  },
  {
    type: "marketing",
    label: "Marketing communications",
    description: "Occasional emails about new features and health tips.",
    granted: false,
    required: false,
  },
  {
    type: "research",
    label: "Anonymized research use",
    description: "Allows anonymized data to be used to improve AyuPro's models.",
    granted: false,
    required: false,
  },
  {
    type: "telehealth",
    label: "Telehealth consent",
    description: "Required if you book a telehealth appointment.",
    granted: false,
    required: false,
  },
];

export default function ConsentsPage() {
  const [consents, setConsents] = useState(initialConsents);

  function toggle(type: string) {
    setConsents((prev) =>
      prev.map((c) =>
        c.type === type && !c.required ? { ...c, granted: !c.granted } : c
      )
    );
    // TODO: send the updated grant/revoke to the backend here.
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Account</h1>
        <div className="mt-4">
          <AccountTabs />
        </div>

        <p className="mt-6 text-[14px] text-[#5B5B5B]">
          Manage what you&apos;ve agreed to. Required consents can&apos;t be
          turned off while using AyuPro.
        </p>

        <div className="mt-4 space-y-3">
          {consents.map((c) => (
            <div
              key={c.type}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5"
            >
              <div>
                <h2 className="text-[15px] font-semibold text-[#173F29]">
                  {c.label}
                  {c.required && (
                    <span className="ml-2 text-[12px] font-normal text-[#8A8A8A]">
                      Required
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-[13px] text-[#4A4A4A]">
                  {c.description}
                </p>
              </div>

              <button
                onClick={() => toggle(c.type)}
                disabled={c.required}
                aria-pressed={c.granted}
                aria-label={`Toggle ${c.label}`}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  c.granted ? "bg-[#1F5D3A]" : "bg-black/15"
                } ${c.required ? "opacity-60" : ""}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    c.granted ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}