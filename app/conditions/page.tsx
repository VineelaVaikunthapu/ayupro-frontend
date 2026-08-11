"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/conditions),
// backed by the medical_conditions table, once the API exists.
const conditions = [
  {
    slug: "common-cold",
    name: "Common cold",
    summary: "A mild viral infection affecting the nose and throat.",
  },
  {
    slug: "seasonal-allergies",
    name: "Seasonal allergies",
    summary: "Reaction to pollen or other airborne allergens.",
  },
  {
    slug: "type-2-diabetes",
    name: "Type 2 diabetes",
    summary: "A long-term condition affecting how the body processes blood sugar.",
  },
  {
    slug: "hypertension",
    name: "Hypertension",
    summary: "Persistently high blood pressure, often with no early symptoms.",
  },
  {
    slug: "migraine",
    name: "Migraine",
    summary: "Recurring headaches often with nausea and sensitivity to light.",
  },
  {
    slug: "gastroenteritis",
    name: "Gastroenteritis",
    summary: "Inflammation of the stomach and intestines, often called stomach flu.",
  },
];

export default function ConditionsPage() {
  const [query, setQuery] = useState("");

  const filtered = conditions.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Conditions</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Browse conditions, common symptoms, possible causes, and typical
          treatment options.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search conditions..."
          className="mt-5 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#1F5D3A] md:max-w-sm"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="group rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="text-[18px] font-semibold text-[#173F29]">
                {condition.name}
              </h2>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4A4A4A]">
                {condition.summary}
              </p>
              <span className="mt-3 inline-flex text-[13px] font-medium text-[#3E63E8]">
                Learn more →
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No conditions match &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}