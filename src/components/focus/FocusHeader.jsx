import { Timer } from 'lucide-react'

export default function FocusHeader() {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h1 className="flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
        <Timer className="text-orange-500" size={22} />
        Focus Timer
      </h1>
      <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
        Real-time Session
      </span>
    </div>
  )
}
