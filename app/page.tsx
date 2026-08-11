import Link from "next/link";


function IconStethoscope() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 3v6a4 4 0 008 0V3" strokeLinecap="round" />
      <path d="M10 13v2a5 5 0 0010 0v-2" strokeLinecap="round" />
      <circle cx="20" cy="11" r="1.6" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3.5h6a1 1 0 011 1V6H8V4.5a1 1 0 011-1z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" strokeLinecap="round" />
    </svg>
  );
}

function IconPill() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="9" width="17" height="7" rx="3.5" transform="rotate(-35 12 12.5)" />
      <path d="M11 8.3l3.6 7.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#1A1A1A]">
    

      {/* Feature cards */}
      <section className="px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-[#1F5D3A]/10 blur-2xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1F5D3A]/15 text-[#1F5D3A]">
              <IconStethoscope />
            </div>
            <h2 className="relative mt-4 text-[22px] font-semibold text-[#173F29]">Symptom Checker (AI)</h2>
            <p className="relative mt-2 text-[15px] leading-[1.65] text-[#4A4A4A]">
              Describe your symptoms in simple words. AyuPro AI gives you
              educational information and guidance questions for your
              doctor visit.
            </p>
            <Link
              href="/symptom-checker"
              className="relative mt-5 inline-flex rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d]"
            >
              Try Now
            </Link>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-[#3E63E8]/10 blur-2xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#3E63E8]/15 text-[#3E63E8]">
              <IconClipboard />
            </div>
            <h2 className="relative mt-4 text-[22px] font-semibold text-[#1B2E6E]">Conditions</h2>
            <p className="relative mt-2 text-[15px] leading-[1.65] text-[#4A4A4A]">
              Browse conditions, common symptoms, possible causes and
              treatment options.
            </p>
            <Link
              href="/conditions"
              className="relative mt-5 inline-flex rounded-full bg-[#3E63E8] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#2f4ec0]"
            >
              Browse
            </Link>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-[#1F5D3A]/10 blur-2xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1F5D3A]/15 text-[#1F5D3A]">
              <IconPill />
            </div>
            <h2 className="relative mt-4 text-[22px] font-semibold text-[#173F29]">Drugs & Medications</h2>
            <p className="relative mt-2 text-[15px] leading-[1.65] text-[#4A4A4A]">
              Basic information about medications, typical usage and
              possible side effects.
            </p>
            <Link
              href="/drugs"
              className="relative mt-5 inline-flex rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d]"
            >
              View
            </Link>
          </div>
        </div>
      </section>

      {/* Find Care + Health Library */}
      <section className="px-6 pb-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg">
            <h2 className="text-[22px] font-medium">Find Care</h2>
            <p className="mt-2 text-[15px] leading-[1.65] text-[#4A4A4A]">
              Search for hospitals, labs, specialists and insurance plans
              in one place.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                { label: "Hospitals", href: "/hospitals" },
                { label: "Specialists", href: "/specialists" },
                { label: "Labs", href: "/labs" },
                { label: "Insurance", href: "/insurance" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-full bg-[#E4E9F9] px-3.5 py-1.5 text-[14px] font-medium text-[#2F4EC0] transition-colors hover:bg-[#D6DEF6]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg">
            <h2 className="text-[22px] font-medium">Health Library</h2>
            <p className="mt-2 text-[15px] leading-[1.65] text-[#4A4A4A]">
              Read curated health articles created and managed by AyuPro
              admins.
            </p>
            <Link
              href="/articles"
              className="mt-5 inline-flex rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d]"
            >
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white px-6 py-6 text-[13px] text-[#8A8A8A] md:px-10">
        © {new Date().getFullYear()} AyuPro. For informational purposes
        only — always consult a qualified healthcare provider.
      </footer>
    </div>
  );
}