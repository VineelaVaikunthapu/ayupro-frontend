"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// TODO: replace with a real fetch from the backend (GET /api/hospitals?lat=&lng=),
// backed by healthcare_facilities + hospitals + facility_addresses tables,
// once the API exists. Coordinates below are illustrative sample data.
const hospitals = [
  {
    slug: "northside-general-hospital",
    name: "Northside General Hospital",
    address: "4210 Elm Street",
    lat: 32.8329,
    lng: -96.9622,
    emergencyRoom: true,
    bedCount: 220,
  },
  {
    slug: "riverside-medical-center",
    name: "Riverside Medical Center",
    address: "118 Riverside Drive",
    lat: 32.7973,
    lng: -96.9089,
    emergencyRoom: true,
    bedCount: 340,
  },
  {
    slug: "lakeview-community-hospital",
    name: "Lakeview Community Hospital",
    address: "56 Lakeview Ave",
    lat: 32.8801,
    lng: -96.9497,
    emergencyRoom: false,
    bedCount: 90,
  },
  {
    slug: "st-annes-hospital",
    name: "St. Anne's Hospital",
    address: "980 Cedar Blvd",
    lat: 32.7502,
    lng: -97.0334,
    emergencyRoom: true,
    bedCount: 410,
  },
];

function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function HospitalsPage() {
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
    ? [...hospitals].sort(
        (a, b) =>
          distanceMiles(coords.lat, coords.lng, a.lat, a.lng) -
          distanceMiles(coords.lat, coords.lng, b.lat, b.lng)
      )
    : hospitals;

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Hospitals</h1>
        <p className="mt-2 text-[15px] text-[#5B5B5B]">
          Find hospitals near you.
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
                    ? "Location access wasn't available. Showing all hospitals instead."
                    : "Share your location to see hospitals sorted by distance."}
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
          {sorted.map((h) => {
            const miles = coords
              ? distanceMiles(coords.lat, coords.lng, h.lat, h.lng)
              : null;
            return (
              <Link
                key={h.name}
                href={`/hospitals/${h.slug}`}
                className="block rounded-xl border border-[#1F5D3A]/10 bg-[#EEF6EF] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[17px] font-semibold text-[#173F29]">
                      {h.name}
                    </h2>
                    <p className="mt-0.5 text-[14px] text-[#4A4A4A]">{h.address}</p>
                  </div>
                  {miles !== null && (
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[13px] font-medium text-[#173F29]">
                      {miles.toFixed(1)} mi
                    </span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {h.emergencyRoom && (
                    <span className="rounded-full bg-[#FCEBEB] px-2.5 py-1 text-[12px] font-medium text-[#791F1F]">
                      Emergency room
                    </span>
                  )}
                  <span className="rounded-full bg-white px-2.5 py-1 text-[12px] font-medium text-[#4A4A4A]">
                    {h.bedCount} beds
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}