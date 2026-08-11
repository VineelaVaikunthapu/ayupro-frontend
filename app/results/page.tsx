"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// TODO: replace this mock with the real response from POST /api/symptom-check
// once the FastAPI + RAG + LLM pipeline is live. Expected shape:
// { conditions: [{ name, description }], suggestedQuestions: string[] }
function getMockResult() {
  return {
    conditions: [
      {
        name: "Common cold",
        description:
          "A mild viral infection affecting the nose and throat. Usually resolves on its own within a week.",
      },
      {
        name: "Seasonal allergies",
        description:
          "Reaction to pollen or other allergens that can cause similar symptoms, especially sneezing and congestion.",
      },
      {
        name: "Early-stage flu",
        description:
          "A viral infection that can start with mild symptoms before becoming more severe over 1–2 days.",
      },
    ],
    suggestedQuestions: [
      "How long have you had these symptoms, and have they changed?",
      "Do you have any fever, and if so, how high?",
      "Have you been in contact with anyone else who is sick?",
      "Are you managing any other health conditions right now?",
    ],
  };
}

function ResultsContent() {
  const params = useSearchParams();
  const age = params.get("age");
  const gender = params.get("gender");
  const symptoms = params.get("symptoms");
  const result = getMockResult();

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

        {symptoms && (
          <div className="mt-4 rounded-lg border border-black/10 bg-white p-4">
            <p className="text-[13px] font-medium text-[#8A8A8A]">You told us</p>
            <p className="mt-1 text-[14px] text-[#3B3B3B]">
              {age && gender ? `${age} years old, ${gender.replace("_", " ")} — ` : ""}
              {symptoms}
            </p>
          </div>
        )}

        <p className="mt-4 rounded-lg bg-[#FAEEDA] px-4 py-3 text-[13px] text-[#633806]">
          This is educational information only, not a diagnosis. Please
          confirm with a qualified healthcare provider.
        </p>

        {/* Likely conditions */}
        <section className="mt-6">
          <h2 className="text-[18px] font-semibold text-[#173F29]">
            Possible conditions
          </h2>
          <div className="mt-3 space-y-3">
            {result.conditions.map((condition) => (
              <div
                key={condition.name}
                className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5"
              >
                <h3 className="text-[16px] font-semibold text-[#173F29]">
                  {condition.name}
                </h3>
                <p className="mt-1 text-[14px] leading-[1.6] text-[#4A4A4A]">
                  {condition.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Questions for doctor */}
        <section className="mt-6">
          <h2 className="text-[18px] font-semibold text-[#173F29]">
            Questions to bring to your doctor
          </h2>
          <ul className="mt-3 space-y-2">
            {result.suggestedQuestions.map((q) => (
              <li
                key={q}
                className="rounded-lg border border-black/10 bg-white px-4 py-3 text-[14px] text-[#3B3B3B]"
              >
                {q}
              </li>
            ))}
          </ul>
        </section>

        {/* Next steps */}
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

export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsContent />
    </Suspense>
  );
}