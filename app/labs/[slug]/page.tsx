import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/labs/[slug]),
// backed by labs + lab_tests + lab_test_panels tables, once the API exists.
const labs: Record<
  string,
  {
    name: string;
    address: string;
    phone: string;
    labType: string;
    accreditation: string;
    homeCollection: boolean;
    onlineReports: boolean;
    hours: string;
    tests: string[];
  }
> = {
  "quickpath-diagnostics": {
    name: "QuickPath Diagnostics",
    address: "4210 Elm Street, Suite 100",
    phone: "(214) 555-0142",
    labType: "Full-service diagnostic lab",
    accreditation: "CAP accredited",
    homeCollection: true,
    onlineReports: true,
    hours: "Mon–Sat, 7:00 AM – 6:00 PM",
    tests: ["Complete blood count", "Lipid panel", "Thyroid panel", "Blood glucose"],
  },
  "riverside-lab-services": {
    name: "Riverside Lab Services",
    address: "118 Riverside Drive",
    phone: "(214) 555-0198",
    labType: "Pathology & imaging",
    accreditation: "ISO 15189 accredited",
    homeCollection: false,
    onlineReports: true,
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    tests: ["Biopsy analysis", "MRI", "CT scan", "X-ray"],
  },
  "lakeview-pathology-lab": {
    name: "Lakeview Pathology Lab",
    address: "56 Lakeview Ave",
    phone: "(214) 555-0176",
    labType: "Pathology lab",
    accreditation: "CAP accredited",
    homeCollection: true,
    onlineReports: false,
    hours: "Mon–Fri, 8:00 AM – 4:00 PM",
    tests: ["Biopsy analysis", "Cytology", "Blood chemistry panel"],
  },
  "cedar-blvd-testing-center": {
    name: "Cedar Blvd Testing Center",
    address: "980 Cedar Blvd",
    phone: "(214) 555-0123",
    labType: "Full-service diagnostic lab",
    accreditation: "NABL accredited",
    homeCollection: true,
    onlineReports: true,
    hours: "Open daily, 7:00 AM – 8:00 PM",
    tests: ["Complete blood count", "Urinalysis", "Liver function panel", "COVID-19 testing"],
  },
};

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = labs[slug];

  if (!lab) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/labs"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to labs
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          {lab.name}
        </h1>
        <p className="mt-1 text-[15px] text-[#5B5B5B]">{lab.address}</p>
        <p className="mt-1 text-[15px] text-[#5B5B5B]">{lab.phone}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#EEF6EF] px-2.5 py-1 text-[12px] font-medium text-[#173F29]">
            {lab.accreditation}
          </span>
          {lab.homeCollection && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-[#4A4A4A]">
              Home collection
            </span>
          )}
          {lab.onlineReports && (
            <span className="rounded-full bg-[#EEF2FC] px-2.5 py-1 text-[12px] font-medium text-[#1B2E6E]">
              Online reports
            </span>
          )}
        </div>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">Overview</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-[14px]">
            <div>
              <dt className="text-[#8A8A8A]">Lab type</dt>
              <dd className="text-[#3B3B3B]">{lab.labType}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A]">Hours</dt>
              <dd className="text-[#3B3B3B]">{lab.hours}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-4 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
            Tests offered
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {lab.tests.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}