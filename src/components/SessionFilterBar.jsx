import { Search, Funnel, X } from "lucide-react";

export default function SessionFilterBar({
  subjects = [],
  filters,
  onChange,
  onReset,
}) {
  const safeFilters = filters || {
    search: "",
    subject: "All",
    status: "All",
    sortBy: "newest",
  };

  const handleFieldChange = (field, value) => {
    if (!onChange) return;
    onChange({
      ...safeFilters,
      [field]: value,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Funnel className="h-5 w-5 text-slate-500" />
        <h2 className="text-base font-semibold text-slate-800">Filter Sessions</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Search
          </label>
          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={safeFilters.search}
              onChange={(e) => handleFieldChange("search", e.target.value)}
              placeholder="Search subject or notes..."
              className="w-full rounded-xl border-none bg-transparent px-2 py-3 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Subject
          </label>
          <select
            value={safeFilters.subject}
            onChange={(e) => handleFieldChange("subject", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none"
          >
            <option value="All">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Status
          </label>
          <select
            value={safeFilters.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none"
          >
            <option value="All">All Status</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Sort By
          </label>
          <select
            value={safeFilters.sortBy}
            onChange={(e) => handleFieldChange("sortBy", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="longest">Longest Duration</option>
            <option value="shortest">Shortest Duration</option>
            <option value="subject-asc">Subject A-Z</option>
            <option value="subject-desc">Subject Z-A</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Filter sessions by subject, notes, status, and sorting.
        </p>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </button>
      </div>
    </div>
  );
}