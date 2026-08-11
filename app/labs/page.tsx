"use client";

import { useEffect, useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/labs?lat=&lng=),
// backed by labs + lab_tests + facility_addresses tables, once the API exists.
// Coordinates below are illustrative sample data.
const labs = [
  {
    name: "QuickPath Diagnostics",
    address: "4210 Elm Street, Suite 100",
    lat: 32.8329,
    lng: -96.9622,
    homeCollection: true,
    onlineReports: true,
    accreditation: "CAP accredited",
  },
  {
    name: "Riverside Lab Services",
    address: "118 Riverside Drive",
    lat: 32.7973,
    lng: -96.9089,
    homeCollection: false,
    onlineReports: true,
    accreditation: "ISO 15189 accredited",
  },
  {
    name: "Lakeview Pathology Lab",
    address: "56 Lakeview Ave",
    lat: 32.8801,
    lng: -96.9497,
    homeCollection: true,
    onlineReports: false,
    accreditation: "CAP accredited",
  },
  {
    name: "Cedar Blvd Testing Center",
    address: "980 Cedar Blvd",
    lat: 32.7502,
    lng: -97.0334,
    homeCollection: true,
    onlineReports: true,
    accreditation: "NABL accredited",
  },
];

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

export default function LabsPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "granted" | "denied">("idle");

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

  const sorted = coords
    ? [...labs].sort(
        (a, b) =>
          distanceMiles(coords.lat, coords.lng, a.lat, a.lng) -
          distanceMiles(coords.lat, coords.lng, b.lat, b.lng)
      )
    : labs;

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Labs</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Find diagnostic labs near you.
        </p>

        {status !== "granted" && (
          <div className="mt-5 rounded-xl border border-[#3E63E8]/10 bg-[#EEF2FC] p-5">
            {status === "loading" && (
              <p className="text-[14px] text-[#1B2E6E]">Finding your location...</p>
            )}
            {(status === "idle" || status === "denied") && (
              <div className="flex items-center justify-between gap-4">
                <p className="text-[14px] text-[#1B2E6E]">
                  {status === "denied"
                    ? "Location access wasn't available. Showing all labs instead."
                    : "Share your location to see labs sorted by distance."}
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
          {sorted.map((lab) => {
            const miles = coords
              ? distanceMiles(coords.lat, coords.lng, lab.lat, lab.lng)
              : null;
            return (
              <div
                key={lab.name}
                className="rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[17px] font-semibold text-[#173F29]">
                      {lab.name}
                    </h2>
                    <p className="mt-0.5 text-[14px] text-[#4A4A4A]">{lab.address}</p>
                    <p className="mt-0.5 text-[13px] text-[#8A8A8A]">
                      {lab.accreditation}
                    </p>
                  </div>
                  {miles !== null && (
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#173F29]">
                      {miles.toFixed(1)} mi
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}