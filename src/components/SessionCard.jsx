import { CalendarDays, Clock3, BookOpen, FileText, Trash2 } from "lucide-react";
import { formatDuration, formatFullDateLabel, formatSubject } from "../utils/format";

export default function SessionCard({ session, onDelete, showDelete = true }) {
  if (!session) return null;

  const {
    id,
    subject,
    duration,
    date,
    startTime,
    endTime,
    notes,
    completed,
  } = session;

  const handleDelete = () => {
    if (!onDelete) return;

    const confirmed = window.confirm("Hapus session ini?");
    if (!confirmed) return;

    onDelete(id);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <BookOpen className="mr-1 h-3.5 w-3.5" />
              {formatSubject(subject)}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                completed
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {completed ? "Completed" : "Incomplete"}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {formatSubject(subject)}
            </h3>
            <p className="text-sm text-slate-500">
              Session duration: {formatDuration(duration)}
            </p>
          </div>
        </div>

        {showDelete && onDelete ? (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Date
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {formatFullDateLabel(date)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <Clock3 className="h-4 w-4" />
            Time
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {startTime || "--:--"} {endTime ? `- ${endTime}` : ""}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <Clock3 className="h-4 w-4" />
            Duration
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {formatDuration(duration)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          <FileText className="h-4 w-4" />
          Notes
        </div>
        <p className="text-sm leading-6 text-slate-700">
          {notes?.trim() ? notes : "No notes for this session yet."}
        </p>
      </div>
    </div>
  );
}