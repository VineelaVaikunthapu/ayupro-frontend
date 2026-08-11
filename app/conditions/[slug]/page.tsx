import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/conditions/[slug]),
// backed by medical_conditions + condition_symptoms + condition_treatments
// tables, once the API exists.
const conditions: Record<
  string,
  {
    name: string;
    summary: string;
    symptoms: string[];
    causes: string[];
    treatments: string[];
  }
> = {
  "common-cold": {
    name: "Common cold",
    summary:
      "A mild viral infection affecting the nose and throat. Usually resolves on its own within a week.",
    symptoms: ["Runny or stuffy nose", "Sore throat", "Cough", "Mild fatigue"],
    causes: ["Viral infection, most often rhinovirus", "Spread through airborne droplets or contact"],
    treatments: ["Rest and fluids", "Over-the-counter symptom relief", "Usually no antibiotics needed"],
  },
  "seasonal-allergies": {
    name: "Seasonal allergies",
    summary:
      "Reaction to pollen or other airborne allergens that can cause sneezing and congestion.",
    symptoms: ["Sneezing", "Itchy or watery eyes", "Nasal congestion"],
    causes: ["Pollen, dust, or other environmental allergens", "Immune system overreaction"],
    treatments: ["Antihistamines", "Avoiding known triggers", "Nasal sprays"],
  },
  "type-2-diabetes": {
    name: "Type 2 diabetes",
    summary:
      "A long-term condition affecting how the body processes blood sugar.",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Slow-healing wounds"],
    causes: ["Insulin resistance", "Genetic and lifestyle factors"],
    treatments: ["Diet and exercise changes", "Blood sugar monitoring", "Medication as prescribed"],
  },
  hypertension: {
    name: "Hypertension",
    summary: "Persistently high blood pressure, often with no early symptoms.",
    symptoms: ["Often none", "Occasional headaches", "Shortness of breath in severe cases"],
    causes: ["Genetics", "Diet high in sodium", "Lack of physical activity", "Chronic stress"],
    treatments: ["Lifestyle changes", "Blood pressure monitoring", "Medication as prescribed"],
  },
  migraine: {
    name: "Migraine",
    summary: "Recurring headaches often with nausea and sensitivity to light.",
    symptoms: ["Throbbing head pain", "Nausea", "Light and sound sensitivity"],
    causes: ["Genetic predisposition", "Triggers like stress, certain foods, or lack of sleep"],
    treatments: ["Pain relief medication", "Identifying and avoiding triggers", "Rest in a dark, quiet room"],
  },
  gastroenteritis: {
    name: "Gastroenteritis",
    summary: "Inflammation of the stomach and intestines, often called stomach flu.",
    symptoms: ["Diarrhea", "Vomiting", "Stomach cramps", "Mild fever"],
    causes: ["Viral or bacterial infection", "Contaminated food or water"],
    treatments: ["Hydration", "Rest", "Gradual return to normal diet"],
  },
};

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = conditions[slug];

  if (!condition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/conditions"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to conditions
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          {condition.name}
        </h1>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#5B5B5B]">
          {condition.summary}
        </p>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            Common symptoms
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {condition.symptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-6">
          <h2 className="text-[16px] font-semibold text-[#1B2E6E]">
            Possible causes
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {condition.causes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            Typical treatment options
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {condition.treatments.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-[12px] text-[#8A8A8A]">
          This information is educational only and not a substitute for
          professional medical advice.
        </p>
      </div>
    </div>
  );
}