"use client";

import { useState } from "react";
import AccountTabs from "../../../components/AccountTabs";

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "Vineela",
    lastName: "Vaikunthapu",
    dateOfBirth: "",
    sexAtBirth: "",
    bloodType: "unknown",
    heightCm: "",
    weightKg: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a real call to PATCH /api/account/profile,
    // backed by the user_profiles table, once the API exists.
    console.log("Profile saved:", form);
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Account</h1>
        <div className="mt-4">
          <AccountTabs />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-7"
        >
          <h2 className="text-[16px] font-semibold text-[#173F29]">
            Personal info
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                First name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                type="text"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Last name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                type="text"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Date of birth
              </label>
              <input
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                type="date"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Sex at birth
              </label>
              <select
                name="sexAtBirth"
                value={form.sexAtBirth}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="intersex">Intersex</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Blood type
              </label>
              <select
                name="bloodType"
                value={form.bloodType}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              >
                {["unknown", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Height (cm)
              </label>
              <input
                name="heightCm"
                value={form.heightCm}
                onChange={handleChange}
                type="number"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Weight (kg)
              </label>
              <input
                name="weightKg"
                value={form.weightKg}
                onChange={handleChange}
                type="number"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
          </div>

          <h2 className="mt-6 text-[16px] font-semibold text-[#173F29]">
            Emergency contact
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Name
              </label>
              <input
                name="emergencyContactName"
                value={form.emergencyContactName}
                onChange={handleChange}
                type="text"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
            <div>
              <label className="text-[13px] font-medium text-[#173F29]">
                Phone
              </label>
              <input
                name="emergencyContactPhone"
                value={form.emergencyContactPhone}
                onChange={handleChange}
                type="tel"
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-[#1F5D3A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-[#1F5D3A] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#164a2d]"
          >
            Save changes
          </button>
          {saved && (
            <p className="mt-2 text-[13px] font-medium text-[#173F29]">
              Saved.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}