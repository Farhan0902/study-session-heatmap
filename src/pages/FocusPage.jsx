import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_TIMER_MINUTES } from '../utils/constants'
import {
  saveReflection,
  saveSession,
  updateSession,
} from '../services/storageService'
import {
  buildCompletedSession,
  getInitialTime,
  getProgressPercent,
} from '../services/timerService'
import FocusHeader from '../components/focus/FocusHeader'
import FocusSetupPanel from '../components/focus/FocusSetupPanel'
import FocusProgressPanel from '../components/focus/FocusProgressPanel'
import FocusStatusPanel from '../components/focus/FocusStatusPanel'
import FocusCompleteModal from '../components/focus/FocusCompleteModal'

function playCompleteAlert() {
  if (typeof window === 'undefined') return

  const audioContext = new window.AudioContext()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.35)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.35)
}

export default function FocusPage() {
  const [subject, setSubject] = useState('General')
  const [duration, setDuration] = useState(DEFAULT_TIMER_MINUTES)
  const [remainingSeconds, setRemainingSeconds] = useState(
    getInitialTime(DEFAULT_TIMER_MINUTES)
  )
  const [isRunning, setIsRunning] = useState(false)
  const [sessionStartDate, setSessionStartDate] = useState(null)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [completedSession, setCompletedSession] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const [learned, setLearned] = useState('')
  const [difficult, setDifficult] = useState('')
  const [nextTarget, setNextTarget] = useState('')

  const totalSeconds = useMemo(() => getInitialTime(duration), [duration])
  const progressPercent = useMemo(
    () => getProgressPercent(totalSeconds, remainingSeconds),
    [totalSeconds, remainingSeconds]
  )

  const handleTimerComplete = useCallback(() => {
    const endDate = new Date()
    const safeStartDate = sessionStartDate || new Date(endDate.getTime() - totalSeconds * 1000)

    const finishedSession = buildCompletedSession({
      id: activeSessionId,
      subject,
      duration,
      startDate: safeStartDate,
      endDate,
      notes: '',
    })

    saveSession(finishedSession)
    setIsRunning(false)
    setCompletedSession(finishedSession)
    setShowCompleteModal(true)
    setStatusMessage('Session completed and automatically saved.')
    playCompleteAlert()
  }, [activeSessionId, duration, sessionStartDate, subject, totalSeconds])

  useEffect(() => {
    if (!isRunning) return undefined

    const timerId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timerId)
          handleTimerComplete()
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [handleTimerComplete, isRunning])

  const handleDurationChange = (nextDuration) => {
    const safeDuration = Number(nextDuration)
    setDuration(safeDuration)

    if (!isRunning) {
      setRemainingSeconds(getInitialTime(safeDuration))
    }
  }

  const handleStart = () => {
    if (remainingSeconds <= 0) {
      setRemainingSeconds(getInitialTime(duration))
    }

    if (!activeSessionId) {
      setActiveSessionId(`sess-${Date.now()}`)
      setSessionStartDate(new Date())
    }

    setIsRunning(true)
    setStatusMessage('Timer is running. Stay focused!')
  }

  const handlePauseResume = () => {
    if (remainingSeconds <= 0) return

    setIsRunning((current) => {
      const nextRunning = !current
      setStatusMessage(nextRunning ? 'Timer resumed.' : 'Timer paused.')
      return nextRunning
    })
  }

  const handleReset = () => {
    setIsRunning(false)
    setRemainingSeconds(getInitialTime(duration))
    setActiveSessionId(null)
    setSessionStartDate(null)
    setStatusMessage('Timer reset. Ready for a new session.')
  }

  const handleSaveReflection = () => {
    if (!completedSession) return

    const reflectionContent = [
      learned ? `Apa yang dipelajari: ${learned}` : '',
      difficult ? `Apa yang masih sulit: ${difficult}` : '',
      nextTarget ? `Target sesi berikutnya: ${nextTarget}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    if (reflectionContent) {
      saveReflection({
        sessionId: completedSession.id,
        subject: completedSession.subject,
        content: reflectionContent,
        date: completedSession.date,
      })

      updateSession(completedSession.id, {
        notes: reflectionContent,
      })
    }

    setShowCompleteModal(false)
    setCompletedSession(null)
    setLearned('')
    setDifficult('')
    setNextTarget('')
    setActiveSessionId(null)
    setSessionStartDate(null)
    setRemainingSeconds(getInitialTime(duration))
    setStatusMessage('Session and reflection saved successfully.')
  }

  const closeModalWithoutReflection = () => {
    setShowCompleteModal(false)
    setCompletedSession(null)
    setLearned('')
    setDifficult('')
    setNextTarget('')
    setActiveSessionId(null)
    setSessionStartDate(null)
    setRemainingSeconds(getInitialTime(duration))
    setStatusMessage('Session saved without reflection.')
  }

  return (
    <div className="min-h-screen rounded-2xl bg-slate-100">
      <div className="mx-auto grid w-full gap-5 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <FocusHeader />

          <FocusSetupPanel
            subject={subject}
            duration={duration}
            isRunning={isRunning}
            sessionActive={!!activeSessionId}
            onSubjectChange={setSubject}
            onDurationChange={handleDurationChange}
          />

          <FocusProgressPanel
            progressPercent={progressPercent}
            remainingSeconds={remainingSeconds}
            subject={subject}
            duration={duration}
            isRunning={isRunning}
            sessionActive={!!activeSessionId}
            onStart={handleStart}
            onPauseResume={handlePauseResume}
            onReset={handleReset}
          />
        </section>

        <FocusStatusPanel
          statusMessage={statusMessage}
          isRunning={isRunning}
          remainingSeconds={remainingSeconds}
          subject={subject}
        />
      </div>

      <FocusCompleteModal
        isOpen={showCompleteModal}
        completedSession={completedSession}
        learned={learned}
        difficult={difficult}
        nextTarget={nextTarget}
        onChangeLearned={setLearned}
        onChangeDifficult={setDifficult}
        onChangeNextTarget={setNextTarget}
        onClose={closeModalWithoutReflection}
        onSave={handleSaveReflection}
      />
    </div>
  )
}