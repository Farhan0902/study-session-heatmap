import { useEffect, useMemo, useState } from "react";
import { BookOpen, Clock3, FileText, RotateCcw, Save } from "lucide-react";
import { SUBJECT_OPTIONS } from "../utils/constants";

const initialForm = {
  subject: "General",
  duration: "",
  startTime: "",
  date: new Date().toISOString().split("T")[0],
  content: "",
};

export default function ReflectionInput({
  onSubmit,
  onCancel,
  initialValue = null,
  subjects = SUBJECT_OPTIONS,
  submitLabel = "Save Reflection",
  showCancel = false,
}) {
  const isEditMode = Boolean(initialValue?.id);

  const resolvedInitialForm = useMemo(() => {
    if (!initialValue) return initialForm;

    return {
      subject: initialValue.subject || "General",
      duration:
        initialValue.duration === 0 || initialValue.duration
          ? String(initialValue.duration)
          : "",
      startTime: initialValue.startTime || "",
      date: initialValue.date || new Date().toISOString().split("T")[0],
      content: initialValue.content || "",
    };
  }, [initialValue]);

  const [form, setForm] = useState(resolvedInitialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(resolvedInitialForm);
    setErrors({});
  }, [resolvedInitialForm]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleReset = () => {
    setForm(resolvedInitialForm);
    setErrors({});
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.subject?.trim()) {
      nextErrors.subject = "Subject wajib dipilih.";
    }

    if (!form.date?.trim()) {
      nextErrors.date = "Tanggal wajib diisi.";
    }

    if (!form.content?.trim()) {
      nextErrors.content = "Isi refleksi tidak boleh kosong.";
    } else if (form.content.trim().length < 10) {
      nextErrors.content = "Isi refleksi minimal 10 karakter.";
    }

    if (form.duration && Number(form.duration) < 0) {
      nextErrors.duration = "Durasi tidak boleh kurang dari 0.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const payload = {
      ...initialValue,
      subject: form.subject.trim(),
      duration: form.duration ? Number(form.duration) : 0,
      startTime: form.startTime || "",
      date: form.date,
      content: form.content.trim(),
      createdAt: initialValue?.createdAt || new Date().toISOString(),
    };

    onSubmit?.(payload);

    if (!isEditMode) {
      setForm(initialForm);
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">
          {isEditMode ? "Edit Reflection" : "Write Reflection"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Simpan catatan singkat tentang sesi belajarmu hari ini.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <BookOpen className="h-4 w-4 text-slate-500" />
            Subject
          </label>
          <select
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p className="mt-2 text-xs text-red-500">{errors.subject}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock3 className="h-4 w-4 text-slate-500" />
            Duration (minutes)
          </label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 25"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
          />
          {errors.duration ? (
            <p className="mt-2 text-xs text-red-500">{errors.duration}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
          />
          {errors.date ? (
            <p className="mt-2 text-xs text-red-500">{errors.date}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Start Time
          </label>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileText className="h-4 w-4 text-slate-500" />
          Reflection Content
        </label>
        <textarea
          rows={6}
          placeholder="Tulis apa yang kamu pelajari, bagian yang sulit, atau target berikutnya..."
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-indigo-400"
        />
        <div className="mt-2 flex items-center justify-between">
          {errors.content ? (
            <p className="text-xs text-red-500">{errors.content}</p>
          ) : (
            <p className="text-xs text-slate-400">
              Minimal 10 karakter.
            </p>
          )}
          <p className="text-xs text-slate-400">
            {form.content.trim().length} characters
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </button>

        {showCancel && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Save className="mr-2 h-4 w-4" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}