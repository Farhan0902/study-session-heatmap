import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Timer,
  Grid3X3,
  BarChart2,
  BookOpen,
  NotebookPen,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react'
import { createElement, useState } from 'react'
import { APP_NAME } from '../utils/constants'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/focus', label: 'Focus Timer', icon: Timer },
  { to: '/heatmap', label: 'Heatmap', icon: Grid3X3 },
  { to: '/sessions', label: 'Sessions', icon: BookOpen },
  { to: '/notes', label: 'Notes', icon: NotebookPen },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-slate-900 text-sm leading-tight">
              {APP_NAME}
            </span>
          </div>
          <button
            className="lg:hidden text-slate-500 hover:text-slate-900"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {createElement(icon, { size: 18 })}
              {label}
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-200">
            <NavLink
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={18} />
              Home
            </NavLink>
          </div>
        </nav>

        {/* Footer sidebar */}
        <div className="px-5 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">Study Session Heatmap v0.1</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-10">
          <button
            className="text-slate-500 hover:text-slate-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <span className="text-sm font-semibold text-slate-900 flex items-center gap-1">
            🔥 {APP_NAME}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto bg-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
