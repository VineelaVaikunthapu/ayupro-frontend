"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SymptomCheckerPage() {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const ageNum = Number(age);
    if (!age || Number.isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setError("Please enter a valid age.");
      return;
    }
    if (!gender) {
      setError("Please select a gender.");
      return;
    }
    if (symptoms.trim().length < 10) {
      setError("Please describe your symptoms in a bit more detail.");
      return;
    }

    setSubmitting(true);
    // TODO: replace with a real call to POST /api/symptom-check once the
    // FastAPI backend and LLM pipeline are live. For now we pass the intake
    // details through to the results page via query params.
    const params = new URLSearchParams({
      age: String(ageNum),
      gender,
      symptoms: symptoms.trim(),
    });
    router.push(`/results?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 text-center">
          <span className="inline-flex rounded-full bg-[#1F5D3A]/15 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#173F29]">
            Grounded in medical references
          </span>
          <h1 className="mt-3 text-[28px] font-semibold text-[#173F29]">
            Symptom checker
          </h1>
          
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7 shadow-sm"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="age" className="text-[13px] font-medium text-[#173F29]">
                Age
              </label>
              <input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                min={0}
                max={120}
                placeholder="e.g. 34"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label htmlFor="gender" className="text-[13px] font-medium text-[#173F29]">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="symptoms" className="text-[13px] font-medium text-[#173F29]">
              What symptoms are you experiencing?
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={5}
              placeholder="e.g. I've had a mild fever and sore throat for the past two days, and I feel more tired than usual."
              className="mt-1 w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
            />
            <p className="mt-1 text-[12px] text-[#8A8A8A]">
              The more detail you give, the more useful the information will be.
            </p>
          </div>

          {error && (
            <p className="mt-3 text-[13px] font-medium text-[#A32D2D]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d] disabled:opacity-60"
          >
            {submitting ? "Analyzing..." : "Analyze symptoms"}
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-[#8A8A8A]">
          AyuPro provides educational information only and is not a
          substitute for professional medical advice. If this is a medical
          emergency, call your local emergency number immediately.
        </p>
      </div>
    </div>
  );
}