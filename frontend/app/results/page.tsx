"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StoredResult = {
  age: number;
  gender: string;
  symptoms: string;
  result: {
    conditions?: string[];
    medications?: string[];
    treatments?: string[];
  };
};

export default function ResultsPage() {
  const [data, setData] = useState<StoredResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("ayupro_symptom_result");
    if (!stored) {
      setNotFound(true);
      return;
    }
    setData(JSON.parse(stored));
  }, []);

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="text-[15px] text-[#5B5B5B]">
            We couldn&apos;t find a recent symptom check.
          </p>
          <Link
            href="/symptom-checker"
            className="mt-3 inline-flex rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#164a2d]"
          >
            Start a symptom check
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
        <div className="mx-auto w-full max-w-2xl text-center text-[15px] text-[#5B5B5B]">
          Loading your results...
        </div>
      </div>
    );
  }

  const { age, gender, symptoms, result } = data;
  const conditions = result.conditions ?? [];
  const medications = result.medications ?? [];
  const treatments = result.treatments ?? [];

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/symptom-checker"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to symptom checker
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          Your results
        </h1>

        <div className="mt-4 rounded-lg border border-black/10 bg-white p-4">
          <p className="text-[13px] font-medium text-[#8A8A8A]">You told us</p>
          <p className="mt-1 text-[14px] text-[#3B3B3B]">
            {age} years old, {gender.replace("_", " ")} — {symptoms}
          </p>
        </div>

        <p className="mt-4 rounded-lg bg-[#FAEEDA] px-4 py-3 text-[13px] text-[#633806]">
          This is educational information only, not a diagnosis. Please
          confirm with a qualified healthcare provider.
        </p>

        {conditions.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[18px] font-semibold text-[#173F29]">
              Possible conditions
            </h2>
            <ul className="mt-3 space-y-2">
              {conditions.map((c, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] px-4 py-3 text-[14px] text-[#173F29]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {medications.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[18px] font-semibold text-[#173F29]">
              Medications referenced
            </h2>
            <ul className="mt-3 space-y-2">
              {medications.map((m, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] px-4 py-3 text-[14px] text-[#1B2E6E]"
                >
                  {m}
                </li>
              ))}
            </ul>
          </section>
        )}

        {treatments.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[18px] font-semibold text-[#173F29]">
              Suggested treatments
            </h2>
            <ul className="mt-3 space-y-2">
              {treatments.map((t, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-[14px] text-[#3B3B3B]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/hospitals"
            className="inline-flex rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d]"
          >
            Find nearby hospitals & specialists
          </Link>
          <Link
            href="/insurance"
            className="inline-flex rounded-full border border-black/15 bg-white px-5 py-2.5 text-[14px] font-medium text-[#1A1A1A] transition-colors hover:border-black/25"
          >
            View insurance plans
          </Link>
        </section>
      </div>
    </div>
  );
}