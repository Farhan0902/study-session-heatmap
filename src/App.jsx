import { Navigate, Route, Routes } from 'react-router-dom'
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
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/focus" element={<FocusPage />} />
      <Route path="/heatmap" element={<HeatmapPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}