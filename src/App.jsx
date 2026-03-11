import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import FocusPage from './pages/FocusPage'
import HeatmapPage from './pages/HeatmapPage'
import SessionsPage from './pages/SessionsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import NotesPage from './pages/NotesPage'

export default function App() {
  return (
    <Routes>
      {/* Home (landing page, tanpa sidebar) */}
      <Route path="/" element={<HomePage />} />

      {/* Pages dengan Layout + Sidebar */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}