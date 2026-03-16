// src/pages/SessionsPage.jsx

import { useMemo, useState } from "react";
import SessionCard from "../components/SessionCard";
import SessionFilterBar from "../components/SessionFilterBar";
import dummySessions from "../data/dummySessions";

const initialFilters = {
  search: "",
  subject: "All",
  status: "All",
  sortBy: "newest",
};

export default function SessionsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [sessions, setSessions] = useState(dummySessions);

  const subjects = useMemo(() => {
    return [...new Set(sessions.map((item) => item.subject).filter(Boolean))];
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    let result = [...sessions];

    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      result = result.filter(
        (item) =>
          item.subject?.toLowerCase().includes(keyword) ||
          item.notes?.toLowerCase().includes(keyword)
      );
    }

    if (filters.subject !== "All") {
      result = result.filter((item) => item.subject === filters.subject);
    }

    if (filters.status !== "All") {
      result = result.filter((item) =>
        filters.status === "completed" ? item.completed : !item.completed
      );
    }

    switch (filters.sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(`${a.date}T${a.startTime || "00:00"}`) -
            new Date(`${b.date}T${b.startTime || "00:00"}`)
        );
        break;
      case "longest":
        result.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        break;
      case "shortest":
        result.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case "subject-asc":
        result.sort((a, b) => (a.subject || "").localeCompare(b.subject || ""));
        break;
      case "subject-desc":
        result.sort((a, b) => (b.subject || "").localeCompare(a.subject || ""));
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(`${b.date}T${b.startTime || "00:00"}`) -
            new Date(`${a.date}T${a.startTime || "00:00"}`)
        );
        break;
    }

    return result;
  }, [sessions, filters]);

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <SessionFilterBar
        subjects={subjects}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
      />

      <div className="grid gap-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No sessions found.
          </div>
        )}
      </div>
    </div>
  );
}