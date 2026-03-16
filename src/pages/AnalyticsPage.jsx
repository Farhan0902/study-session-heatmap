

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

export default function AnalyticsPage() {

  // Pakai data dummy
  const [sessions] = useState([...dummySessions]);
  const [granularity, setGranularity] = useState("day");

  // Statistik utama
  const totalSessions = getTotalSessions(sessions);
  const totalMinutes = getTotalStudyMinutes(sessions);
  const avgDuration = getAverageSessionDuration(sessions);
  const mostStudied = getMostStudiedSubject(sessions);
  const sessionsPerDay = getSessionsPerDay(sessions);
  const sessionsPerWeek = getSessionsPerWeek(sessions);
  const sessionsPerMonth = getSessionsPerMonth(sessions);
  const subjectDist = getSubjectDistribution(sessions);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Statistik utama */}
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



      {/* Grafik Sessions: Granularity selector & box */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-800">Sessions</h2>
          <div className="flex gap-2">
            <button
              className={
                granularity === "day"
                  ? "px-3 py-1 rounded-lg border text-sm font-semibold transition-colors focus:outline-none bg-emerald-500 text-white border-emerald-500"
                  : "rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center px-3 py-1 text-emerald-500 text-sm font-semibold focus:outline-none"
              }
              onClick={() => setGranularity("day")}
              type="button"
            >
              Per Day
            </button>
            <button
              className={
                granularity === "week"
                  ? "px-3 py-1 rounded-lg border text-sm font-semibold transition-colors focus:outline-none bg-yellow-400 text-white border-yellow-400"
                  : "rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center px-3 py-1 text-yellow-500 text-sm font-semibold focus:outline-none"
              }
              onClick={() => setGranularity("week")}
              type="button"
            >
              Per Week
            </button>
            <button
              className={
                granularity === "month"
                  ? "px-3 py-1 rounded-lg border text-sm font-semibold transition-colors focus:outline-none bg-red-500 text-white border-red-500"
                  : "rounded-xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col items-center px-3 py-1 text-red-500 text-sm font-semibold focus:outline-none"
              }
              onClick={() => setGranularity("month")}
              type="button"
            >
              Per Month
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
          {granularity === "day" && (
            <div className="overflow-x-auto">
              <div className="flex gap-2 items-end h-32">
                {sessionsPerDay.length === 0 ? (
                  <div className="text-slate-400">No data</div>
                ) : (
                  sessionsPerDay.map((d) => (
                    <div key={d.date} className="flex flex-col items-center justify-end">
                      <div
                        className="w-6 rounded-t bg-indigo-400"
                        style={{ height: `${16 + d.count * 16}px` }}
                        title={`${d.count} session(s)`}
                      ></div>
                      <span className="text-xs text-slate-500 mt-1">{d.day}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {granularity === "week" && (
            <div className="overflow-x-auto">
              <div className="flex gap-2 items-end h-32">
                {sessionsPerWeek.length === 0 ? (
                  <div className="text-slate-400">No data</div>
                ) : (
                  sessionsPerWeek.map((d) => (
                    <div key={d.week} className="flex flex-col items-center justify-end">
                      <div
                        className="w-8 rounded-t bg-emerald-400"
                        style={{ height: `${16 + d.count * 16}px` }}
                        title={`${d.count} session(s)`}
                      ></div>
                      <span className="text-xs text-slate-500 mt-1">{d.week}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {granularity === "month" && (
            <div className="overflow-x-auto">
              <div className="flex gap-2 items-end h-32">
                {sessionsPerMonth.length === 0 ? (
                  <div className="text-slate-400">No data</div>
                ) : (
                  sessionsPerMonth.map((d) => (
                    <div key={d.month} className="flex flex-col items-center justify-end">
                      <div
                        className="w-10 rounded-t bg-pink-400"
                        style={{ height: `${16 + d.count * 16}px` }}
                        title={`${d.count} session(s)`}
                      ></div>
                      <span className="text-xs text-slate-500 mt-1">{d.month}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Distribusi subject */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Subject Distribution</h2>
        <div className="flex flex-wrap gap-2">
          {subjectDist.length === 0 ? (
            <div className="text-slate-400">No data</div>
          ) : (
            subjectDist.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
              >
                {formatSubject(s.name)}: {formatDuration(s.value)}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}