import { useState, useMemo } from 'react'
import {
  generateHeatmapData,
  getTotalMinutesInRange,
} from '../services/heatmapService'
import dummySessions from '../data/dummySessions'
import HeatmapHeader from '../components/heatmap/HeatmapHeader'
import HeatmapControls from '../components/heatmap/HeatmapControls'
import HeatmapGrid from '../components/heatmap/HeatmapGrid'
import HeatmapLegend from '../components/heatmap/HeatmapLegend'

export default function HeatmapPage() {
  const [range, setRange] = useState('week')
  const [baseDate, setBaseDate] = useState(new Date())
  const [hoveredDay, setHoveredDay] = useState(null)

  const { heatmapData, totalMinutes } = useMemo(() => {
    const data = generateHeatmapData(dummySessions, range, baseDate)
    const total = getTotalMinutesInRange(dummySessions, range, baseDate)
    return { heatmapData: data, totalMinutes: total }
  }, [range, baseDate])

  function handlePrevious() {
    setBaseDate((prev) => {
      const next = new Date(prev)
      if (range === 'month') {
        next.setMonth(next.getMonth() - 1)
      } else {
        next.setDate(next.getDate() - 7)
      }
      return next
    })
  }

  function handleNext() {
    setBaseDate((prev) => {
      const next = new Date(prev)
      if (range === 'month') {
        next.setMonth(next.getMonth() + 1)
      } else {
        next.setDate(next.getDate() + 7)
      }
      return next
    })
  }

  return (
    <div className="min-h-screen rounded-2xl bg-slate-100">
      <div className="mx-auto">
        <HeatmapHeader />
        <HeatmapControls
          range={range}
          onRangeChange={setRange}
          baseDate={baseDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          totalMinutes={totalMinutes}
        />
        <HeatmapGrid
          heatmapData={heatmapData}
          hoveredDay={hoveredDay}
          onHoverDay={setHoveredDay}
          onLeaveDay={() => setHoveredDay(null)}
        />
        <HeatmapLegend />
      </div>
    </div>
  )
}