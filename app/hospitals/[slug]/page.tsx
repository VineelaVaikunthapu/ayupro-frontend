import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/hospitals/[slug]),
// backed by healthcare_facilities + hospitals + facility_services +
// facility_departments + facility_hours tables, once the API exists.
const hospitals: Record<
  string,
  {
    name: string;
    address: string;
    phone: string;
    hospitalType: string;
    bedCount: number;
    traumaLevel: string;
    hasICU: boolean;
    hasEmergencyRoom: boolean;
    hours: string;
    departments: string[];
    services: string[];
  }
> = {
  "northside-general-hospital": {
    name: "Northside General Hospital",
    address: "4210 Elm Street",
    phone: "(214) 555-0142",
    hospitalType: "General acute care",
    bedCount: 220,
    traumaLevel: "Level III",
    hasICU: true,
    hasEmergencyRoom: true,
    hours: "Open 24 hours",
    departments: ["Emergency medicine", "Cardiology", "Orthopedics", "Pediatrics"],
    services: ["Emergency care", "Inpatient surgery", "Imaging & radiology", "Lab services"],
  },
  "riverside-medical-center": {
    name: "Riverside Medical Center",
    address: "118 Riverside Drive",
    phone: "(214) 555-0198",
    hospitalType: "General acute care",
    bedCount: 340,
    traumaLevel: "Level II",
    hasICU: true,
    hasEmergencyRoom: true,
    hours: "Open 24 hours",
    departments: ["Emergency medicine", "Oncology", "Neurology", "Maternity"],
    services: ["Emergency care", "Cancer treatment", "Inpatient surgery", "Maternity ward"],
  },
  "lakeview-community-hospital": {
    name: "Lakeview Community Hospital",
    address: "56 Lakeview Ave",
    phone: "(214) 555-0176",
    hospitalType: "Community hospital",
    bedCount: 90,
    traumaLevel: "Not designated",
    hasICU: false,
    hasEmergencyRoom: false,
    hours: "6:00 AM – 10:00 PM",
    departments: ["Internal medicine", "Outpatient surgery", "Physical therapy"],
    services: ["Outpatient surgery", "Physical therapy", "Lab services"],
  },
  "st-annes-hospital": {
    name: "St. Anne's Hospital",
    address: "980 Cedar Blvd",
    phone: "(214) 555-0123",
    hospitalType: "General acute care",
    bedCount: 410,
    traumaLevel: "Level I",
    hasICU: true,
    hasEmergencyRoom: true,
    hours: "Open 24 hours",
    departments: ["Emergency medicine", "Trauma surgery", "Cardiology", "Neurology"],
    services: ["Emergency care", "Trauma center", "Inpatient surgery", "Imaging & radiology"],
  },
};

export default async function HospitalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = hospitals[slug];

  if (!hospital) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/hospitals"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to hospitals
        </Link>

        <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
          {hospital.name}
        </h1>
        <p className="mt-1 text-[15px] text-[#5B5B5B]">{hospital.address}</p>
        <p className="mt-1 text-[15px] text-[#5B5B5B]">{hospital.phone}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {hospital.hasEmergencyRoom && (
            <span className="rounded-full bg-[#FCEBEB] px-2.5 py-1 text-[12px] font-medium text-[#791F1F]">
              Emergency room
            </span>
          )}
          {hospital.hasICU && (
            <span className="rounded-full bg-[#EEF2FC] px-2.5 py-1 text-[12px] font-medium text-[#1B2E6E]">
              ICU
            </span>
          )}
          <span className="rounded-full bg-[#EEF6EF] px-2.5 py-1 text-[12px] font-medium text-[#173F29]">
            {hospital.bedCount} beds
          </span>
        </div>

        <section className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6">
          <h2 className="text-[16px] font-semibold text-[#173F29]">Overview</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-[14px]">
            <div>
              <dt className="text-[#8A8A8A]">Hospital type</dt>
              <dd className="text-[#3B3B3B]">{hospital.hospitalType}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A]">Trauma level</dt>
              <dd className="text-[#3B3B3B]">{hospital.traumaLevel}</dd>
            </div>
            <div>
              <dt className="text-[#8A8A8A]">Hours</dt>
              <dd className="text-[#3B3B3B]">{hospital.hours}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-4 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-6">
          <h2 className="text-[16px] font-semibold text-[#1B2E6E]">Departments</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {hospital.departments.map((d) => (
              <span
                key={d}
                className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#2F4EC0]"
              >
                {d}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A]">Services</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[14px] text-[#4A4A4A]">
            {hospital.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}