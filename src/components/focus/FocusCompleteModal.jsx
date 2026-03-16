import { CheckCircle2, X } from 'lucide-react'

export default function FocusCompleteModal({
  isOpen,
  completedSession,
  learned,
  difficult,
  nextTarget,
  onChangeLearned,
  onChangeDifficult,
  onChangeNextTarget,
  onClose,
  onSave,
}) {
  if (!isOpen || !completedSession) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/45 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <CheckCircle2 className="text-emerald-500" size={22} />
              Session completed
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Subject: {completedSession.subject} | Duration: {completedSession.duration} minutes
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Apa yang dipelajari
            </label>
            <textarea
              value={learned}
              onChange={(event) => onChangeLearned(event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-orange-400"
              placeholder="Contoh: Paham konsep array dan loop"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Apa yang masih susah
            </label>
            <textarea
              value={difficult}
              onChange={(event) => onChangeDifficult(event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-orange-400"
              placeholder="Contoh: Masih bingung optimasi waktu"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Target sesi berikutnya
            </label>
            <textarea
              value={nextTarget}
              onChange={(event) => onChangeNextTarget(event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition-colors focus:border-orange-400"
              placeholder="Contoh: Latihan 20 soal selama 45 menit"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
          >
            Save Without Notes
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Save Reflection
          </button>
        </div>
      </div>
    </div>
  )
}
