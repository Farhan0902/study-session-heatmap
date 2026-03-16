import { createElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  NotebookText,
  Sparkles,
  Timer,
} from 'lucide-react'

const heroSlides = [
  {
    title: 'Belajar Konsisten, Hasil Lebih Terukur',
    description:
      'Pantau ritme belajar harian dengan tampilan progress yang jelas, cepat dipahami, dan rapi.',
    badge: 'Focus Rhythm',
    stat: 'Streak minggu ini',
    value: '7 Hari',
    tone: 'from-orange-500 to-amber-500',
    bars: [82, 64, 90, 73, 88],
  },
  {
    title: 'Heatmap yang Bikin Pola Belajar Terlihat',
    description:
      'Temukan jam paling produktif dan hari terkuatmu untuk menyusun jadwal belajar yang realistis.',
    badge: 'Calendar Insight',
    stat: 'Total sesi bulan ini',
    value: '126 Sesi',
    tone: 'from-sky-500 to-indigo-500',
    bars: [56, 74, 70, 92, 80],
  },
  {
    title: 'Refleksi Cepat, Improvement Lebih Tajam',
    description:
      'Simpan insight setelah sesi agar target berikutnya tetap terarah dan tidak mengulang kesalahan yang sama.',
    badge: 'Reflection Boost',
    stat: 'Catatan refleksi aktif',
    value: '24 Notes',
    tone: 'from-emerald-500 to-teal-500',
    bars: [68, 78, 62, 85, 94],
  },
]

const featureCards = [
  {
    icon: Timer,
    title: 'Focus Timer',
    desc: 'Rancang sprint belajar, break, dan target harian dalam satu alur kerja yang fokus.',
    classes: 'bg-orange-50 border-orange-200 text-orange-700',
    stat: 'Avg. 3 sesi/hari',
    span: 'sm:col-span-2 xl:col-span-6',
    ring: 'from-orange-200/80 to-amber-100/20',
  },
  {
    icon: CalendarDays,
    title: 'Heatmap Calendar',
    desc: 'Pola belajar harian dan mingguan terlihat cepat untuk evaluasi ritme.',
    classes: 'bg-sky-50 border-sky-200 text-sky-700',
    stat: '30 hari tracking',
    span: 'sm:col-span-1 xl:col-span-3',
    ring: 'from-sky-200/80 to-indigo-100/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Bandingkan performa mingguan dan temukan momentum terbaikmu.',
    classes: 'bg-violet-50 border-violet-200 text-violet-700',
    stat: 'Insight realtime',
    span: 'sm:col-span-1 xl:col-span-3',
    ring: 'from-violet-200/80 to-fuchsia-100/20',
  },
  {
    icon: NotebookText,
    title: 'Reflection Notes',
    desc: 'Tulis apa yang dipelajari, hambatan utama, dan next action yang konkret.',
    classes: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    stat: 'Growth journal',
    span: 'sm:col-span-2 xl:col-span-12',
    ring: 'from-emerald-200/80 to-teal-100/20',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4500)

    return () => clearInterval(intervalId)
  }, [])

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    )
  }

  const currentSlide = heroSlides[activeSlide]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_10%,#fff7ed_0%,#f1f5f9_45%,#e2e8f0_100%)] text-slate-900 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="absolute inset-0 opacity-[0.08] [background:linear-gradient(120deg,#f97316_10%,transparent_10.5%,transparent_20%,#f97316_20.5%,#f97316_30%,transparent_30.5%,transparent_40%,#f97316_40.5%,#f97316_50%,transparent_50.5%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
                <Sparkles size={14} />
                Study Session Heatmap
              </span>

              <div className="mt-5 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {heroSlides.map((slide) => (
                    <article key={slide.title} className="min-w-full pr-1">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {slide.badge}
                      </p>
                      <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
                        {slide.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Mulai Sekarang
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/heatmap')}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-orange-300 hover:text-orange-700"
                >
                  Lihat Heatmap
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index
                        ? 'w-8 bg-slate-900'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 shadow-lg shadow-slate-400/20">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">Live Preview</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-orange-400 hover:text-orange-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-orange-400 hover:text-orange-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className={`rounded-xl bg-linear-to-r ${currentSlide.tone} p-4`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  {currentSlide.stat}
                </p>
                <p className="mt-1 text-3xl font-bold text-white">{currentSlide.value}</p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Weekly trend</span>
                  <span>Mon - Fri</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {currentSlide.bars.map((value, index) => (
                    <div key={`${value}-${index}`} className="space-y-2">
                      <div className="h-20 rounded-md bg-slate-800 p-1">
                        <div
                          className="w-full rounded-md bg-orange-400/90"
                          style={{ height: `${value}%` }}
                        />
                      </div>
                      <p className="text-center text-[10px] text-slate-500">{index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
          {featureCards.map(({ icon, title, desc, classes, stat, span, ring }) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${span}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${ring} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${classes}`}
                  >
                    {createElement(icon, { size: 20 })}
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {stat}
                  </span>
                </div>

                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">{title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{desc}</p>

                <div className="mt-4 h-1.5 w-24 rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full bg-slate-900" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Ready to start?
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              Bangun habit belajar yang konsisten dari hari ini.
            </h3>
          </div>
          <button
            onClick={() => navigate('/focus')}
            className="mt-4 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 sm:mt-0"
          >
            Buka Focus Timer
          </button>
        </section>
      </div>
    </div>
  )
}