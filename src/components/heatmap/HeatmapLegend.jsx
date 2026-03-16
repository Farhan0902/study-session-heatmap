const HEAT_COLORS = {
  0: 'bg-slate-100',
  1: 'bg-orange-100',
  2: 'bg-orange-300',
  3: 'bg-orange-500',
  4: 'bg-orange-700',
}

export default function HeatmapLegend() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="mb-3 text-sm font-semibold text-slate-700">Intensity</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { level: 0, label: 'No study', color: HEAT_COLORS[0] },
          { level: 1, label: 'Light (1-25 min)', color: HEAT_COLORS[1] },
          { level: 2, label: 'Moderate (26-50 min)', color: HEAT_COLORS[2] },
          { level: 3, label: 'Strong (51-90 min)', color: HEAT_COLORS[3] },
          { level: 4, label: 'Very strong (90+ min)', color: HEAT_COLORS[4] },
        ].map((item) => (
          <div key={item.level} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded ${item.color}`} />
            <span className="text-xs text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
