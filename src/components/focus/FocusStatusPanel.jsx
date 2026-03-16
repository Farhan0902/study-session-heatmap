import { formatTime } from '../../services/timerService'

export default function FocusStatusPanel({
  isRunning,
  remainingSeconds,
  subject,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg text-center font-bold text-slate-900">Session Status</h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-slate-500">Mode</p>
          <p className="font-semibold text-slate-800">
            {isRunning ? 'Running' : remainingSeconds === 0 ? 'Completed' : 'Idle / Paused'}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-slate-500">Current Subject</p>
          <p className="font-semibold text-slate-800">{subject}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-slate-500">Remaining Time</p>
          <p className="font-semibold text-slate-800">{formatTime(remainingSeconds)}</p>
        </div>
      </div>
    </section>
  )
}
