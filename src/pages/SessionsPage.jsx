// src/pages/SessionsPage.jsx

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SessionCard from "../components/SessionCard";
import SessionFilterBar from "../components/SessionFilterBar";
import dummySessions from "../data/dummySessions";

const initialFilters = {
  search: "",
  subject: "All",
  status: "All",
  sortBy: "newest",
};

const SESSIONS_PER_PAGE = 10;

export default function SessionsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [sessions, setSessions] = useState(dummySessions);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredSessions.length / SESSIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * SESSIONS_PER_PAGE;
  const endIndex = startIndex + SESSIONS_PER_PAGE;
  const paginatedSessions = filteredSessions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <SessionFilterBar
        subjects={subjects}
        filters={filters}
        onChange={handleFilterChange}
        onReset={() => {
          setFilters(initialFilters);
          setCurrentPage(1);
        }}
      />

      <div className="grid gap-4">
        {paginatedSessions.length > 0 ? (
          paginatedSessions.map((session) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 disabled:cursor-not-allowed disabled:opacity-50 enabled:text-slate-600 enabled:hover:border-orange-300 enabled:hover:text-orange-700"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <span className="text-xs text-slate-500">
              ({filteredSessions.length} total sessions)
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 disabled:cursor-not-allowed disabled:opacity-50 enabled:text-slate-600 enabled:hover:border-orange-300 enabled:hover:text-orange-700"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}