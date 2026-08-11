"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/treatments),
// backed by the treatments table, once the API exists.
const treatments = [
  {
    slug: "rest-and-hydration",
    name: "Rest and hydration",
    summary: "A foundational approach for recovering from mild viral illnesses.",
  },
  {
    slug: "antibiotic-course",
    name: "Antibiotic course",
    summary: "A prescribed sequence of antibiotics to clear a bacterial infection.",
  },
  {
    slug: "lifestyle-and-diet-changes",
    name: "Lifestyle & diet changes",
    summary: "Ongoing changes to diet and activity used to manage chronic conditions.",
  },
  {
    slug: "physical-therapy",
    name: "Physical therapy",
    summary: "Guided exercises to restore movement and reduce pain after injury.",
  },
  {
    slug: "medication-management",
    name: "Medication management",
    summary: "Regular monitoring and adjustment of prescribed medications.",
  },
  {
    slug: "allergy-avoidance-plan",
    name: "Allergy avoidance plan",
    summary: "Identifying and reducing exposure to specific allergy triggers.",
  },
];

export default function TreatmentsPage() {
  const [query, setQuery] = useState("");

  const filtered = treatments.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Treatments</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Browse common treatment approaches, what they involve, and the
          conditions they&apos;re typically used for.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search treatments..."
          className="mt-5 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#1F5D3A] md:max-w-sm"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((treatment) => (
            <Link
              key={treatment.slug}
              href={`/treatments/${treatment.slug}`}
              className="group rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="text-[18px] font-semibold text-[#173F29]">
                {treatment.name}
              </h2>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4A4A4A]">
                {treatment.summary}
              </p>
              <span className="mt-3 inline-flex text-[13px] font-medium text-[#3E63E8]">
                Learn more →
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No treatments match &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}