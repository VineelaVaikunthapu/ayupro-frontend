"use client";

import Link from "next/link";
import { useState } from "react";
import AccountTabs from "../../../components/AccountTabs";

// TODO: replace with a real fetch from the backend (GET /api/account/favorites),
// backed by favorite_articles + favorite_facilities + favorite_specialists tables.
const initialFavorites = {
  articles: [
    { slug: "understanding-blood-pressure-numbers", title: "Understanding your blood pressure numbers" },
    { slug: "antibiotics-what-to-know", title: "Antibiotics: what to know before you take them" },
  ],
  facilities: [
    { slug: "riverside-medical-center", name: "Riverside Medical Center", type: "hospital" as const },
    { slug: "quickpath-diagnostics", name: "QuickPath Diagnostics", type: "lab" as const },
  ],
  specialists: [
    { slug: "dr-anita-rao", name: "Dr. Anita Rao" },
  ],
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites);

  function removeArticle(slug: string) {
    setFavorites((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.slug !== slug),
    }));
    // TODO: send removal to the backend here.
  }

  function removeFacility(slug: string) {
    setFavorites((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f.slug !== slug),
    }));
  }

  function removeSpecialist(slug: string) {
    setFavorites((prev) => ({
      ...prev,
      specialists: prev.specialists.filter((s) => s.slug !== slug),
    }));
  }

  const isEmpty =
    favorites.articles.length === 0 &&
    favorites.facilities.length === 0 &&
    favorites.specialists.length === 0;

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Account</h1>
        <div className="mt-4">
          <AccountTabs />
        </div>

        {isEmpty && (
          <p className="mt-6 text-[14px] text-[#8A8A8A]">
            You haven&apos;t saved anything yet.
          </p>
        )}

        {favorites.articles.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[16px] font-semibold text-[#173F29]">
              Saved articles
            </h2>
            <div className="mt-3 space-y-2">
              {favorites.articles.map((a) => (
                <div
                  key={a.slug}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-4"
                >
                  <Link
                    href={`/articles/${a.slug}`}
                    className="text-[14px] font-medium text-[#173F29] hover:underline"
                  >
                    {a.title}
                  </Link>
                  <button
                    onClick={() => removeArticle(a.slug)}
                    className="text-[13px] font-medium text-[#A32D2D] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {favorites.facilities.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[16px] font-semibold text-[#173F29]">
              Saved facilities
            </h2>
            <div className="mt-3 space-y-2">
              {favorites.facilities.map((f) => (
                <div
                  key={f.slug}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-4"
                >
                  <Link
                    href={`/${f.type === "hospital" ? "hospitals" : "labs"}/${f.slug}`}
                    className="text-[14px] font-medium text-[#1B2E6E] hover:underline"
                  >
                    {f.name}
                  </Link>
                  <button
                    onClick={() => removeFacility(f.slug)}
                    className="text-[13px] font-medium text-[#A32D2D] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {favorites.specialists.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[16px] font-semibold text-[#173F29]">
              Saved specialists
            </h2>
            <div className="mt-3 space-y-2">
              {favorites.specialists.map((s) => (
                <div
                  key={s.slug}
                  className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white p-4"
                >
                  <Link
                    href={`/specialists/${s.slug}`}
                    className="text-[14px] font-medium text-[#1A1A1A] hover:underline"
                  >
                    {s.name}
                  </Link>
                  <button
                    onClick={() => removeSpecialist(s.slug)}
                    className="text-[13px] font-medium text-[#A32D2D] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}