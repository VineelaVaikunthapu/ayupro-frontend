"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/drugs),
// backed by the medicines + drugs tables, once the API exists.
const drugs = [
  {
    slug: "paracetamol",
    name: "Paracetamol",
    summary: "Pain reliever and fever reducer, available over the counter.",
  },
  {
    slug: "ibuprofen",
    name: "Ibuprofen",
    summary: "Anti-inflammatory pain reliever, also reduces fever.",
  },
  {
    slug: "amoxicillin",
    name: "Amoxicillin",
    summary: "Antibiotic used to treat a range of bacterial infections.",
  },
  {
    slug: "cetirizine",
    name: "Cetirizine",
    summary: "Antihistamine used for allergy symptoms like sneezing and itching.",
  },
  {
    slug: "metformin",
    name: "Metformin",
    summary: "Commonly prescribed medication for managing type 2 diabetes.",
  },
  {
    slug: "omeprazole",
    name: "Omeprazole",
    summary: "Reduces stomach acid, used for acid reflux and ulcers.",
  },
];

export default function DrugsPage() {
  const [query, setQuery] = useState("");

  const filtered = drugs.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">
          Drugs & medications
        </h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Basic information about medications, typical usage, and possible
          side effects.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search medications..."
          className="mt-5 w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-[#1F5D3A] md:max-w-sm"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((drug) => (
            <Link
              key={drug.slug}
              href={`/drugs/${drug.slug}`}
              className="group rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="text-[18px] font-semibold text-[#173F29]">
                {drug.name}
              </h2>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4A4A4A]">
                {drug.summary}
              </p>
              <span className="mt-3 inline-flex text-[13px] font-medium text-[#3E63E8]">
                View details →
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No medications match &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}