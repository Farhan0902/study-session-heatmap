import { formatTime } from '../../services/timerService'
import FocusControls from './FocusControls'

export default function FocusProgressPanel({
  progressPercent,
  remainingSeconds,
  subject,
  duration,
  isRunning,
  sessionActive,
  onStart,
  onPauseResume,
  onReset,
}) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-col items-center gap-5 sm:justify-between">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-linear-to-r from-white to-slate-100 px-6 py-5 shadow-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Timer Display
          </p>
          <p className="mt-2 text-center font-mono text-xl font-bold tracking-tight text-slate-800 sm:text-8xl">
            {formatTime(remainingSeconds)}
          </p>
          <FocusControls
            isRunning={isRunning}
            sessionActive={sessionActive}
            onStart={onStart}
            onPauseResume={onPauseResume}
            onReset={onReset}
          />
        </div>

        <div className="w-full sm:max-w-full">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-orange-500 transition-[width] duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Subject: <span className="font-semibold text-slate-800">{subject}</span>
          </p>
          <p className="text-sm text-slate-600">
            Duration: <span className="font-semibold text-slate-800">{duration} minutes</span>
          </p>
        </div>
      </div>
    </div>
  )
}
