import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with a real fetch from the backend (GET /api/articles/[slug]),
// backed by the articles table, once the API exists.
const articles: Record<
  string,
  {
    title: string;
    category: string;
    body: string[];
  }
> = {
  "understanding-blood-pressure-numbers": {
    title: "Understanding your blood pressure numbers",
    category: "Chronic conditions",
    body: [
      "Blood pressure is written as two numbers, like 120/80. The first, systolic pressure, measures the force in your arteries when your heart beats. The second, diastolic pressure, measures the force between beats.",
      "Readings consistently above 130/80 are generally considered elevated, though your doctor will interpret your specific numbers based on your overall health history.",
      "Because hypertension often has no early symptoms, regular checks are the main way to catch it early, especially if it runs in your family.",
    ],
  },
  "when-a-cold-becomes-something-more": {
    title: "When a cold becomes something more",
    category: "Everyday illness",
    body: [
      "Most colds run their course within seven to ten days without needing medical treatment. But certain signs suggest it's worth getting checked.",
      "Watch for a fever that lasts more than three days, symptoms that get worse instead of better after the first week, or new symptoms like chest pain or difficulty breathing.",
      "If you're unsure, it's always reasonable to check in with a doctor rather than wait it out.",
    ],
  },
  "managing-diabetes-day-to-day": {
    title: "Managing diabetes day to day",
    category: "Chronic conditions",
    body: [
      "Consistent daily habits matter more for blood sugar management than any single big change.",
      "Regular meal timing, tracking how different foods affect your levels, and staying active all play a role alongside any prescribed medication.",
      "Small, sustainable adjustments tend to work better long-term than drastic short-term changes.",
    ],
  },
  "antibiotics-what-to-know": {
    title: "Antibiotics: what to know before you take them",
    category: "Medications",
    body: [
      "Antibiotics treat bacterial infections, not viral ones, which is why they won't help with most colds or flu.",
      "Finishing the full prescribed course, even after you start feeling better, helps prevent the infection from coming back and reduces the risk of antibiotic-resistant bacteria developing.",
      "Always let your doctor know about any allergies before starting a new antibiotic.",
    ],
  },
  "seasonal-allergies-vs-a-cold": {
    title: "Seasonal allergies vs. a cold: how to tell the difference",
    category: "Everyday illness",
    body: [
      "Both allergies and colds can cause sneezing and a runny nose, which makes them easy to confuse.",
      "Allergies tend to come with itchy eyes and last as long as you're exposed to the trigger, sometimes weeks. Colds usually include a sore throat or mild fever and resolve within a week or two.",
      "If symptoms show up at the same time every year, that's a strong sign it's allergies rather than a recurring cold.",
    ],
  },
  "talking-to-your-doctor-effectively": {
    title: "Getting the most out of a short doctor visit",
    category: "Navigating care",
    body: [
      "Appointments are often shorter than we'd like, so a little preparation goes a long way.",
      "Write down your main concern first, since that's most likely to get addressed if time runs short. Note when symptoms started and anything that makes them better or worse.",
      "Don't hesitate to ask your doctor to repeat or clarify something. It's your visit, and understanding the plan matters more than getting through it quickly.",
    ],
  },
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/articles"
          className="text-[14px] font-medium text-[#3E63E8] hover:underline"
        >
          ← Back to health library
        </Link>

        <span className="mt-4 inline-flex text-[12px] font-semibold uppercase tracking-wide text-[#3E63E8]">
          {article.category}
        </span>
        <h1 className="mt-1.5 text-[28px] font-semibold text-[#173F29]">
          {article.title}
        </h1>

        <div className="mt-6 space-y-4">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-[15px] leading-[1.75] text-[#3B3B3B]">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-8 text-[12px] text-[#8A8A8A]">
          This article is for general education and is reviewed by AyuPro
          admins. It is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}