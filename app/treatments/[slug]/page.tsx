import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/treatments/[slug]),
// backed by treatments + treatment_steps + treatment_medicines tables,
// once the API exists.
const treatments: Record<
  string,
  {
    name: string;
    summary: string;
    steps: string[];
    relatedMedicines: string[];
    relatedConditions: { name: string; slug: string }[];
  }
> = {
  "rest-and-hydration": {
    name: "Rest and hydration",
    summary: "A foundational approach for recovering from mild viral illnesses.",
    steps: [
      "Get plenty of sleep to support your immune system",
      "Drink water, broth, or oral rehydration solutions regularly",
      "Avoid strenuous activity until symptoms improve",
    ],
    relatedMedicines: ["Paracetamol"],
    relatedConditions: [
      { name: "Common cold", slug: "common-cold" },
      { name: "Gastroenteritis", slug: "gastroenteritis" },
    ],
  },
  "antibiotic-course": {
    name: "Antibiotic course",
    summary: "A prescribed sequence of antibiotics to clear a bacterial infection.",
    steps: [
      "Take the full prescribed course, even if you feel better early",
      "Take doses at evenly spaced times as directed",
      "Contact your doctor if symptoms don't improve within a few days",
    ],
    relatedMedicines: ["Amoxicillin"],
    relatedConditions: [],
  },
  "lifestyle-and-diet-changes": {
    name: "Lifestyle & diet changes",
    summary: "Ongoing changes to diet and activity used to manage chronic conditions.",
    steps: [
      "Work with your doctor to set realistic, gradual goals",
      "Track relevant numbers, like blood sugar or blood pressure, regularly",
      "Adjust habits over time rather than all at once",
    ],
    relatedMedicines: ["Metformin"],
    relatedConditions: [
      { name: "Type 2 diabetes", slug: "type-2-diabetes" },
      { name: "Hypertension", slug: "hypertension" },
    ],
  },
  "physical-therapy": {
    name: "Physical therapy",
    summary: "Guided exercises to restore movement and reduce pain after injury.",
    steps: [
      "Start with an assessment from a licensed physical therapist",
      "Follow a personalized set of exercises consistently",
      "Progress intensity gradually as strength and mobility improve",
    ],
    relatedMedicines: ["Ibuprofen"],
    relatedConditions: [],
  },
  "medication-management": {
    name: "Medication management",
    summary: "Regular monitoring and adjustment of prescribed medications.",
    steps: [
      "Keep an up-to-date list of everything you're taking",
      "Attend scheduled check-ins to review how medications are working",
      "Report any side effects to your doctor promptly",
    ],
    relatedMedicines: ["Metformin", "Omeprazole"],
    relatedConditions: [
      { name: "Hypertension", slug: "hypertension" },
      { name: "Type 2 diabetes", slug: "type-2-diabetes" },
    ],
  },
  "allergy-avoidance-plan": {
    name: "Allergy avoidance plan",
    summary: "Identifying and reducing exposure to specific allergy triggers.",
    steps: [
      "Identify your specific triggers, ideally with allergy testing",
      "Reduce exposure where possible, such as during high-pollen days",
      "Keep antihistamines on hand for unavoidable exposure",
    ],
    relatedMedicines: ["Cetirizine"],
    relatedConditions: [{ name: "Seasonal allergies", slug: "seasonal-allergies" }],
  },
};

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = treatments[slug];

  if (!treatment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/treatments"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to treatments
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          {treatment.name}
        </h1>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#5B5B5B]">
          {treatment.summary}
        </p>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            What it typically involves
          </h2>
          <ol className="mt-2 list-inside list-decimal space-y-1.5 text-[14px] text-[#4A4A4A]">
            {treatment.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        {treatment.relatedMedicines.length > 0 && (
          <section className="mt-4 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-6">
            <h2 className="text-[16px] font-semibold text-[#1B2E6E]">
              Related medications
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {treatment.relatedMedicines.map((med) => (
                <span
                  key={med}
                  className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#2F4EC0]"
                >
                  {med}
                </span>
              ))}
            </div>
          </section>
        )}

        {treatment.relatedConditions.length > 0 && (
          <section className="mt-4 rounded-xl border border-black/10 bg-white p-6">
            <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
              Commonly used for
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {treatment.relatedConditions.map((c) => (
                <Link
                  key={c.slug}
                  href={`/conditions/${c.slug}`}
                  className="rounded-full bg-[#EEF6EF] px-3 py-1 text-[13px] font-medium text-[#173F29] hover:bg-[#DDEEDF]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-6 text-[12px] text-[#8A8A8A]">
          This information is educational only. Always follow a treatment
          plan created with your own doctor.
        </p>
      </div>
    </div>
  );
}
