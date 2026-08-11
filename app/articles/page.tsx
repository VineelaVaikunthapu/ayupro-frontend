"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/articles),
// backed by the articles + article_categories tables, once the API exists.
const articles = [
  {
    slug: "understanding-blood-pressure-numbers",
    title: "Understanding your blood pressure numbers",
    category: "Chronic conditions",
    summary: "What systolic and diastolic numbers actually mean, and when to be concerned.",
  },
  {
    slug: "when-a-cold-becomes-something-more",
    title: "When a cold becomes something more",
    category: "Everyday illness",
    summary: "Warning signs that suggest you should see a doctor rather than wait it out.",
  },
  {
    slug: "managing-diabetes-day-to-day",
    title: "Managing diabetes day to day",
    category: "Chronic conditions",
    summary: "Practical habits that make blood sugar management easier to sustain.",
  },
  {
    slug: "antibiotics-what-to-know",
    title: "Antibiotics: what to know before you take them",
    category: "Medications",
    summary: "Why finishing the full course matters, and what resistance really means.",
  },
  {
    slug: "seasonal-allergies-vs-a-cold",
    title: "Seasonal allergies vs. a cold: how to tell the difference",
    category: "Everyday illness",
    summary: "Key differences in symptoms, timing, and what actually helps.",
  },
  {
    slug: "talking-to-your-doctor-effectively",
    title: "Getting the most out of a short doctor visit",
    category: "Navigating care",
    summary: "How to prepare so a 10-minute appointment actually covers what matters.",
  },
];

const categories = ["All", "Chronic conditions", "Everyday illness", "Medications", "Navigating care"];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">
          Health library
        </h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Curated health articles created and reviewed by AyuPro admins.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#1F5D3A] text-white"
                  : "bg-white text-[#4A4A4A] hover:bg-[#EEF6EF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-[12px] font-semibold uppercase tracking-wide text-[#3E63E8]">
                {article.category}
              </span>
              <h2 className="mt-1.5 text-[18px] font-semibold text-[#173F29]">
                {article.title}
              </h2>
              <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4A4A4A]">
                {article.summary}
              </p>
              <span className="mt-3 inline-flex text-[13px] font-medium text-[#3E63E8]">
                Read article →
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No articles in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}