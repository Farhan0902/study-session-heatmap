const HEAT_COLORS = {
  0: 'bg-slate-100',
  1: 'bg-orange-100',
  2: 'bg-orange-300',
  3: 'bg-orange-500',
  4: 'bg-orange-700',
}

const HEAT_COLORS_RING = {
  0: 'ring-slate-300',
  1: 'ring-orange-200',
  2: 'ring-orange-400',
  3: 'ring-orange-600',
  4: 'ring-orange-800',
}

export default function HeatmapGrid({ heatmapData, hoveredDay, onHoverDay, onLeaveDay }) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="grid grid-cols-7 gap-2">
        {heatmapData.map((day) => (
          <div key={day.date} className="flex flex-col items-center gap-1">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
            </p>
            <div
              className={`relative w-full aspect-square rounded-lg ring-2 ${HEAT_COLORS[day.level]} ${HEAT_COLORS_RING[day.level]} cursor-pointer transition-transform hover:scale-110`}
              onMouseEnter={() => onHoverDay(day)}
              onMouseLeave={() => onLeaveDay()}
            >
              {hoveredDay?.date === day.date && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white">
                  <p className="font-semibold">{day.minutes} min</p>
                  <p className="text-slate-400">{day.label}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                </div>
              )}
            </div>
            <p className="text-xs text-slate-600">
              {new Date(day.date).getDate()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
