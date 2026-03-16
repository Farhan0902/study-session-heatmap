import { SUBJECT_OPTIONS, TIMER_PRESETS } from '../../utils/constants'

const minDuration = Math.min(...TIMER_PRESETS)
const maxDuration = Math.max(...TIMER_PRESETS)

export default function FocusSetupPanel({
  subject,
  duration,
  isRunning,
  sessionActive,
  onSubjectChange,
  onDurationChange,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Choose Subject</p>
        <select
          value={subject}
          onChange={(event) => onSubjectChange(event.target.value)}
          disabled={sessionActive}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-400 disabled:cursor-not-allowed"       >
          {SUBJECT_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Choose Duration</p>
          <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
            {duration} min
          </span>
        </div>

        <input
          type="range"
          min={minDuration}
          max={maxDuration}
          step={1}
          value={duration}
          onChange={(event) => onDurationChange(Number(event.target.value))}
          disabled={isRunning}
          className="focus-duration-slider w-full accent-orange-500 disabled:cursor-not-allowed"
        />

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{minDuration} min</span>
          <span>{maxDuration} min</span>
        </div>
      </div>
    </div>
  )
}
