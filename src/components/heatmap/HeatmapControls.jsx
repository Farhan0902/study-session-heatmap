import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeatmapControls({
  range,
  onRangeChange,
  baseDate,
  onPrevious,
  onNext,
  totalMinutes,
}) {
  function getDateRangeLabel() {
    if (range === 'month') {
      return baseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } else {
      const end = new Date(baseDate)
      end.setDate(end.getDate() + 6)
      return `${baseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    }
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-2">
        <button
          onClick={() => onRangeChange('week')}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            range === 'week'
              ? 'bg-orange-500 text-white'
              : 'border border-slate-300 text-slate-700 hover:border-orange-300 hover:text-orange-700'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onRangeChange('month')}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            range === 'month'
              ? 'bg-orange-500 text-white'
              : 'border border-slate-300 text-slate-700 hover:border-orange-300 hover:text-orange-700'
          }`}
        >
          Month
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPrevious}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:border-orange-300 hover:text-orange-700"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-slate-700 min-w-40 text-center">
          {getDateRangeLabel()}
        </span>
        <button
          onClick={onNext}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:border-orange-300 hover:text-orange-700"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="rounded-lg bg-orange-50 px-3 py-1.5">
        <p className="text-xs text-slate-600">Total</p>
        <p className="text-lg font-bold text-orange-700">{totalMinutes} min</p>
      </div>
    </div>
  )
}
