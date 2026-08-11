"use client";

import { useState } from "react";
import AccountTabs from "../../../components/AccountTabs";

// TODO: replace with a real fetch from the backend (GET /api/account/notifications),
// backed by the notifications table.
const initialNotifications = [
  {
    id: 1,
    title: "Your symptom check results are ready",
    message: "We've generated educational information based on your recent symptom description.",
    createdAt: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Appointment reminder",
    message: "You have an upcoming appointment with Dr. Anita Rao tomorrow at 10:00 AM.",
    createdAt: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "New article added to Health Library",
    message: "\"Getting the most out of a short doctor visit\" was just published.",
    createdAt: "3 days ago",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function markAsRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // TODO: send read status update to the backend here.
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F2F2F2] px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[28px] font-semibold text-[#173F29]">Account</h1>
        <div className="mt-4">
          <AccountTabs />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[14px] text-[#5B5B5B]">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "You're all caught up."}
          </p>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[13px] font-medium text-[#3E63E8] hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`block w-full rounded-xl border p-4 text-left transition-colors ${
                n.read
                  ? "border-black/10 bg-white"
                  : "border-[#1F5D3A]/10 bg-[#EEF6EF]"
              }`}
            >
              <div className="flex items-start gap-2">
                {!n.read && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1F5D3A]" />
                )}
                <div>
                  <h2 className="text-[14px] font-semibold text-[#173F29]">
                    {n.title}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#4A4A4A]">{n.message}</p>
                  <p className="mt-1.5 text-[12px] text-[#8A8A8A]">{n.createdAt}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}