import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-6">
      {/* Hero */}
      <div className="text-center max-w-xl">
        <div className="text-6xl mb-6">🔥</div>
        <h1 className="text-4xl font-bold text-white mb-3">
          Study Session Heatmap
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Lacak waktu belajarmu, visualisasikan produktivitasmu, dan raih konsistensi belajar setiap hari.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
        >
          Mulai Sekarang →
        </button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl w-full">
        {[
          { icon: '⏱️', label: 'Pomodoro Timer' },
          { icon: '📅', label: 'Heatmap Kalender' },
          { icon: '📊', label: 'Weekly Analytics' },
          { icon: '📝', label: 'Notes & Refleksi' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <p className="text-sm text-gray-400 font-medium">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}