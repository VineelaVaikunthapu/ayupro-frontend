import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/insurance/[slug]),
// backed by insurance_plans + insurance_plan_facilities +
// insurance_plan_specialists tables, once the API exists.
const plans: Record<
  string,
  {
    provider: string;
    name: string;
    planType: string;
    monthlyPremium: number;
    annualDeductible: number;
    outOfPocketMax: number;
    acceptedHospitals: { name: string; slug: string }[];
    acceptedSpecialists: { name: string; slug: string }[];
  }
> = {
  "blueshield-silver-ppo": {
    provider: "BlueShield Health",
    name: "Silver PPO",
    planType: "PPO",
    monthlyPremium: 320,
    annualDeductible: 2000,
    outOfPocketMax: 6500,
    acceptedHospitals: [
      { name: "Northside General Hospital", slug: "northside-general-hospital" },
      { name: "Riverside Medical Center", slug: "riverside-medical-center" },
    ],
    acceptedSpecialists: [
      { name: "Dr. Anita Rao", slug: "dr-anita-rao" },
      { name: "Dr. James Whitfield", slug: "dr-james-whitfield" },
    ],
  },
  "blueshield-gold-hmo": {
    provider: "BlueShield Health",
    name: "Gold HMO",
    planType: "HMO",
    monthlyPremium: 410,
    annualDeductible: 500,
    outOfPocketMax: 4000,
    acceptedHospitals: [
      { name: "Northside General Hospital", slug: "northside-general-hospital" },
      { name: "St. Anne's Hospital", slug: "st-annes-hospital" },
    ],
    acceptedSpecialists: [{ name: "Dr. Sarah Kim", slug: "dr-sarah-kim" }],
  },
  "careplus-bronze-ppo": {
    provider: "CarePlus Insurance",
    name: "Bronze PPO",
    planType: "PPO",
    monthlyPremium: 260,
    annualDeductible: 4500,
    outOfPocketMax: 8500,
    acceptedHospitals: [
      { name: "Lakeview Community Hospital", slug: "lakeview-community-hospital" },
    ],
    acceptedSpecialists: [{ name: "Dr. Priya Nair", slug: "dr-priya-nair" }],
  },
  "apollo-family-hmo": {
    provider: "Apollo Insurance",
    name: "Family HMO",
    planType: "HMO",
    monthlyPremium: 480,
    annualDeductible: 800,
    outOfPocketMax: 5000,
    acceptedHospitals: [
      { name: "Riverside Medical Center", slug: "riverside-medical-center" },
      { name: "St. Anne's Hospital", slug: "st-annes-hospital" },
    ],
    acceptedSpecialists: [
      { name: "Dr. Marcus Bell", slug: "dr-marcus-bell" },
      { name: "Dr. Sarah Kim", slug: "dr-sarah-kim" },
    ],
  },
};

export default async function InsuranceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plan = plans[slug];

  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/insurance"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to insurance plans
        </Link>

        <span className="mt-4 inline-flex text-[12px] font-semibold uppercase tracking-wide text-[#3E63E8]">
          {plan.provider}
        </span>
        <h1 className="mt-1 text-[28px] font-semibold text-[#173F29]">
          {plan.name}
        </h1>
        <p className="mt-1 text-[15px] text-[#5B5B5B]">{plan.planType}</p>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            Plan overview
          </h2>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-[14px]">
            <div>
              <dt className="text-[#8A8A8A]">Monthly premium</dt>
              <dd className="text-[#3B3B3B]">${plan.monthlyPremium}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A]">Annual deductible</dt>
              <dd className="text-[#3B3B3B]">${plan.annualDeductible}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A]">Out-of-pocket max</dt>
              <dd className="text-[#3B3B3B]">${plan.outOfPocketMax}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-4 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-6">
          <h2 className="text-[16px] font-semibold text-[#1B2E6E]">
            Accepted hospitals
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {plan.acceptedHospitals.map((h) => (
              <Link
                key={h.slug}
                href={`/hospitals/${h.slug}`}
                className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#2F4EC0] hover:bg-[#D6DEF6]"
              >
                {h.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
            Accepted specialists
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {plan.acceptedSpecialists.map((s) => (
              <Link
                key={s.slug}
                href={`/specialists/${s.slug}`}
                className="rounded-full bg-[#EEF6EF] px-3 py-1 text-[13px] font-medium text-[#173F29] hover:bg-[#DDEEDF]"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}