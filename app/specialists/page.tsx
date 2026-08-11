"use client";

import { useEffect, useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/specialists?lat=&lng=),
// backed by specialists + specialist_specialties + facility_specialists tables,
// once the API exists. Coordinates below are illustrative sample data.
const specialists = [
  {
    name: "Dr. Anita Rao",
    specialty: "Cardiology",
    credentials: "MD, FACC",
    yearsExperience: 14,
    telehealth: true,
    acceptingPatients: true,
    address: "4210 Elm Street, Suite 200",
    lat: 32.8329,
    lng: -96.9622,
  },
  {
    name: "Dr. James Whitfield",
    specialty: "Dermatology",
    credentials: "MD",
    yearsExperience: 9,
    telehealth: true,
    acceptingPatients: true,
    address: "118 Riverside Drive",
    lat: 32.7973,
    lng: -96.9089,
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Endocrinology",
    credentials: "MD, PhD",
    yearsExperience: 18,
    telehealth: false,
    acceptingPatients: false,
    address: "56 Lakeview Ave, Suite 4",
    lat: 32.8801,
    lng: -96.9497,
  },
  {
    name: "Dr. Marcus Bell",
    specialty: "Orthopedics",
    credentials: "MD, FAAOS",
    yearsExperience: 21,
    telehealth: false,
    acceptingPatients: true,
    address: "980 Cedar Blvd",
    lat: 32.7502,
    lng: -97.0334,
  },
  {
    name: "Dr. Sarah Kim",
    specialty: "Cardiology",
    credentials: "MD",
    yearsExperience: 7,
    telehealth: true,
    acceptingPatients: true,
    address: "22 Harbor Lane",
    lat: 32.8102,
    lng: -96.8890,
  },
];

const specialties = ["All", "Cardiology", "Dermatology", "Endocrinology", "Orthopedics"];

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function SpecialistsPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");
  const [activeSpecialty, setActiveSpecialty] = useState("All");

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }

  useEffect(() => {
    requestLocation();
  }, []);

  const filtered =
    activeSpecialty === "All"
      ? specialists
      : specialists.filter((s) => s.specialty === activeSpecialty);

  const sorted = coords
    ? [...filtered].sort(
        (a, b) =>
          distanceMiles(coords.lat, coords.lng, a.lat, a.lng) -
          distanceMiles(coords.lat, coords.lng, b.lat, b.lng)
      )
    : filtered;

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Specialists</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Find verified specialists near you.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {specialties.map((sp) => (
            <button
              key={sp}
              onClick={() => setActiveSpecialty(sp)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                activeSpecialty === sp
                  ? "bg-[#1F5D3A] text-white"
                  : "bg-white text-[#4A4A4A] hover:bg-[#EEF6EF]"
              }`}
            >
              {sp}
            </button>
          ))}
        </div>

        {status !== "granted" && (
          <div className="mt-5 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-5">
            {status === "loading" && (
              <p className="text-[14px] text-[#1B2E6E]">Finding your location...</p>
            )}
            {(status === "idle" || status === "denied") && (
              <div className="flex items-center justify-between gap-4">
                <p className="text-[14px] text-[#1B2E6E]">
                  {status === "denied"
                    ? "Location access wasn't available. Showing all specialists instead."
                    : "Share your location to see specialists sorted by distance."}
                </p>
                <button
                  onClick={requestLocation}
                  className="shrink-0 rounded-full bg-[#3E63E8] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#2f4ec0]"
                >
                  Enable location
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {sorted.map((s) => {
            const miles = coords
              ? distanceMiles(coords.lat, coords.lng, s.lat, s.lng)
              : null;
            return (
              <div
                key={s.name}
                className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[17px] font-semibold text-[#173F29]">
                      {s.name}{" "}
                      <span className="text-[14px] font-normal text-[#4A4A4A]">
                        · {s.credentials}
                      </span>
                    </h2>
                    <p className="mt-0.5 text-[14px] text-[#4A4A4A]">
                      {s.specialty} · {s.yearsExperience} years experience
                    </p>
                    <p className="mt-0.5 text-[13px] text-[#8A8A8A]">{s.address}</p>
                  </div>
                  {miles !== null && (
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#173F29]">
                      {miles.toFixed(1)} mi
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.telehealth && (
                    <span className="rounded-full bg-[#EEF2FC] px-2.5 py-1 text-[12px] font-medium text-[#1B2E6E]">
                      Telehealth available
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${
                      s.acceptingPatients
                        ? "bg-white text-[#173F29]"
                        : "bg-[#FCEBEB] text-[#791F1F]"
                    }`}
                  >
                    {s.acceptingPatients ? "Accepting new patients" : "Not currently accepting patients"}
                  </span>
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <p className="text-[14px] text-[#8A8A8A]">
              No specialists match this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}