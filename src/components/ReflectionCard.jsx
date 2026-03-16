import { BookOpen, CalendarDays, Clock3, Pencil, Trash2 } from "lucide-react";
import {
  formatDuration,
  formatFullDateLabel,
  formatSubject,
  truncateText,
} from "../utils/format";

export default function ReflectionCard({
  reflection,
  onDelete,
  onEdit,
  showActions = true,
  truncateLength = 180,
}) {
  if (!reflection) return null;

  const {
    id,
    subject,
    content,
    date,
    duration,
    startTime,
    createdAt,
  } = reflection;

  const handleDelete = () => {
    if (!onDelete) return;

    const confirmed = window.confirm("Hapus catatan refleksi ini?");
    if (!confirmed) return;

    onDelete(id);
  };

  const handleEdit = () => {
    if (!onEdit) return;
    onEdit(reflection);
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

            {duration ? (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Clock3 className="mr-1 h-3.5 w-3.5" />
                {formatDuration(duration)}
              </span>
            ) : null}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Reflection Note
            </h3>
            <p className="text-sm text-slate-500">
              {date
                ? formatFullDateLabel(date)
                : createdAt
                ? formatFullDateLabel(createdAt)
                : "-"}
            </p>
          </div>
        </div>

        {showActions ? (
          <div className="flex items-center gap-2">
            {onEdit ? (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </button>
            ) : null}

            {onDelete ? (
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
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Date
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {date
              ? formatFullDateLabel(date)
              : createdAt
              ? formatFullDateLabel(createdAt)
              : "-"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            <Clock3 className="h-4 w-4" />
            Time
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {startTime || "--:--"}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
          {content?.trim()
            ? truncateText(content, truncateLength)
            : "No reflection written yet."}
        </p>
      </div>
    </div>
  );
}   