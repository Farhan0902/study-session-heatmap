

import { useState, useEffect } from "react";
import dummySessions from "../data/dummySessions";
import { formatDuration, formatNumber, formatSubject } from "../utils/format";
import SessionCard from "../components/SessionCard";

export default function DashboardPage() {

  // Pakai data dummy
  const [sessions] = useState([...dummySessions]);

  // Statistik
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const subjectCount = {};
  sessions.forEach((s) => {
    subjectCount[s.subject] = (subjectCount[s.subject] || 0) + 1;
  });
  const topSubject = Object.entries(subjectCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  // 3 sesi terbaru
  const latestSessions = sessions.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Statistik ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-3xl font-bold text-indigo-600">{formatNumber(totalSessions)}</span>
          <span className="text-sm text-slate-500 mt-1">Total Sessions</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-3xl font-bold text-emerald-600">{formatDuration(totalMinutes)}</span>
          <span className="text-sm text-slate-500 mt-1">Total Minutes</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-3xl font-bold text-indigo-700">{formatSubject(topSubject)}</span>
          <span className="text-sm text-slate-500 mt-1">Top Subject</span>
        </div>
      </div>

      {/* Sesi terbaru */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Latest Sessions</h2>
        {/* Bisa tambahkan link ke halaman sessions jika mau */}
      </div>
      <div className="space-y-4">
        {latestSessions.length === 0 ? (
          <div className="text-slate-500 text-center py-8">No sessions yet.</div>
        ) : (
          latestSessions.map((session) => (
            <SessionCard key={session.id} session={session} showDelete={false} />
          ))
        )}
      </div>
    </div>
  );
}