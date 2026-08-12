import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/drugs/[slug]),
// backed by medicines + drug_adverse_effects + medicine_contraindications
// tables, once the API exists.
const drugs: Record<
  string,
  {
    name: string;
    summary: string;
    usage: string[];
    dosageForms: string[];
    sideEffects: string[];
    contraindications: string[];
  }
> = {
  paracetamol: {
    name: "Paracetamol",
    summary: "Pain reliever and fever reducer, available over the counter.",
    usage: ["Mild to moderate pain", "Fever reduction"],
    dosageForms: ["Tablet", "Suspension", "Injection"],
    sideEffects: ["Rare when taken as directed", "Liver strain if overdosed"],
    contraindications: ["Severe liver disease", "Chronic heavy alcohol use"],
  },
  ibuprofen: {
    name: "Ibuprofen",
    summary: "Anti-inflammatory pain reliever, also reduces fever.",
    usage: ["Pain relief", "Inflammation", "Fever reduction"],
    dosageForms: ["Tablet", "Suspension", "Topical gel"],
    sideEffects: ["Stomach upset", "Increased bleeding risk"],
    contraindications: ["Active stomach ulcers", "Severe kidney disease"],
  },
  amoxicillin: {
    name: "Amoxicillin",
    summary: "Antibiotic used to treat a range of bacterial infections.",
    usage: ["Bacterial respiratory infections", "Ear infections", "Urinary tract infections"],
    dosageForms: ["Capsule", "Suspension", "Injection"],
    sideEffects: ["Diarrhea", "Nausea", "Allergic reactions in penicillin-sensitive people"],
    contraindications: ["Known penicillin allergy"],
  },
  cetirizine: {
    name: "Cetirizine",
    summary: "Antihistamine used for allergy symptoms like sneezing and itching.",
    usage: ["Seasonal allergies", "Hives", "Itching"],
    dosageForms: ["Tablet", "Drops"],
    sideEffects: ["Mild drowsiness", "Dry mouth"],
    contraindications: ["Severe kidney impairment without dose adjustment"],
  },
  metformin: {
    name: "Metformin",
    summary: "Commonly prescribed medication for managing type 2 diabetes.",
    usage: ["Type 2 diabetes management"],
    dosageForms: ["Tablet"],
    sideEffects: ["Stomach upset", "Vitamin B12 deficiency with long-term use"],
    contraindications: ["Severe kidney disease", "Acute heart failure"],
  },
  omeprazole: {
    name: "Omeprazole",
    summary: "Reduces stomach acid, used for acid reflux and ulcers.",
    usage: ["Acid reflux", "Stomach ulcers", "Heartburn"],
    dosageForms: ["Capsule", "Tablet"],
    sideEffects: ["Headache", "Stomach pain", "Long-term use linked to nutrient absorption issues"],
    contraindications: ["Known hypersensitivity to proton pump inhibitors"],
  },
};

export default async function DrugDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drug = drugs[slug];

  if (!drug) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/drugs"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to drugs & medications
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          {drug.name}
        </h1>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#5B5B5B]">
          {drug.summary}
        </p>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            Typical usage
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {drug.usage.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-6">
          <h2 className="text-[16px] font-semibold text-[#1B2E6E]">
            Available forms
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {drug.dosageForms.map((form) => (
              <span
                key={form}
                className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#2F4EC0]"
              >
                {form}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-[#E24B4A]/15 bg-[#FCEBEB] p-6">
          <h2 className="text-[16px] font-semibold text-[#791F1F]">
            Possible side effects
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {drug.sideEffects.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="mt-4 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
            Avoid if
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {drug.contraindications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-[12px] text-[#8A8A8A]">
          This information is educational only. Always follow your
          doctor&apos;s or pharmacist&apos;s instructions for dosage and use.
        </p>
      </div>
    </div>
  );
}