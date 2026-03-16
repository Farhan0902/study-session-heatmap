

import { useState } from "react";
import dummySessions from "../data/dummySessions";
import {
  getTotalStudyMinutes,
  getTotalSessions,
  getAverageSessionDuration,
  getMostStudiedSubject,
  getSessionsPerDay,
  getSessionsPerWeek,
  getSessionsPerMonth,
  getSubjectDistribution,
} from "../services/analyticsService";
import { formatDuration, formatNumber, formatSubject } from "../utils/format";
import SessionCard from "../components/SessionCard";
import SessionPieChart from "../components/SessionPieChart";
import SubjectBarChart from "../components/SubjectBarChart";
import SubjectPieChart from "../components/SubjectPieChart";


export default function DashboardPage() {
  // Pakai data dummy
  const [sessions] = useState([...dummySessions]);

  // Statistik utama (analytics)
  const totalSessions = getTotalSessions(sessions);
  const totalMinutes = getTotalStudyMinutes(sessions);
  const avgDuration = getAverageSessionDuration(sessions);
  const mostStudied = getMostStudiedSubject(sessions);
  const subjectDist = getSubjectDistribution(sessions);

  // 3 sesi terbaru
  const latestSessions = sessions.slice(0, 3);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Statistik utama (analytics) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-2xl font-bold text-indigo-600">{formatNumber(totalSessions)}</span>
          <span className="text-xs text-slate-500 mt-1">Total Sessions</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-2xl font-bold text-emerald-600">{formatDuration(totalMinutes)}</span>
          <span className="text-xs text-slate-500 mt-1">Total Minutes</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-2xl font-bold text-indigo-700">{formatDuration(avgDuration)}</span>
          <span className="text-xs text-slate-500 mt-1">Avg. Duration</span>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center">
          <span className="text-2xl font-bold text-pink-700">{formatSubject(mostStudied.subject)}</span>
          <span className="text-xs text-slate-500 mt-1">Top Subject</span>
        </div>
      </div>

      {/* Sessions Pie Chart & Subject Bar/Pie Chart dalam grid */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Pie Chart kiri */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-800">Subject Distribution (Pie)</h2>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center justify-center h-[400px]">
            <SubjectPieChart data={subjectDist} />
          </div>
        </div>
        {/* Subject Distribution Bar Chart kanan */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Subject Distribution (Bar)</h2>
          <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center justify-center h-[400px]">
            <SubjectBarChart data={subjectDist} />
          </div>
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

