import { Pause, Play, RotateCcw } from 'lucide-react'
import { useState } from 'react'

export default function FocusControls({
  isRunning,
  sessionActive,
  onStart,
  onPauseResume,
  onReset,
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  function handleResetClick() {
    setShowConfirm(true)
  }

  function handleConfirm() {
    setShowConfirm(false)
    onReset()
  }

  function handleCancel() {
    setShowConfirm(false)
  }

  return (
    <>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={isRunning ? onPauseResume : sessionActive ? onPauseResume : onStart}
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 p-2.5 text-white transition-colors hover:bg-orange-600"
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          type="button"
          onClick={handleResetClick}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2.5 text-slate-700 transition-colors hover:border-orange-300 hover:text-orange-700"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-xs rounded-xl bg-white p-6 shadow-xl">
            <p className="text-sm font-semibold text-slate-800">Reset timer?</p>
            <p className="mt-1 text-xs text-slate-500">Sesi yang sedang berjalan akan dihapus.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
