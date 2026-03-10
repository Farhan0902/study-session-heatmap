function pad(value) {
  return String(value).padStart(2, "0");
}

function createId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getInitialTime(minutes = 25) {
  return Math.max(0, Math.floor(Number(minutes || 0) * 60));
}

export function formatTime(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatClockTime(date = new Date()) {
  const d = new Date(date);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatSessionDate(date = new Date()) {
  return new Date(date).toISOString().split("T")[0];
}

export function calculateRemainingTime(endTimestamp) {
  if (!endTimestamp) return 0;
  const remainingMs = new Date(endTimestamp).getTime() - Date.now();
  return Math.max(0, Math.ceil(remainingMs / 1000));
}

export function isTimerComplete(remainingSeconds = 0) {
  return Number(remainingSeconds) <= 0;
}

export function createTimerSession({
  subject = "General",
  duration = 25,
  notes = "",
} = {}) {
  const now = new Date();
  return {
    id: createId("sess"),
    subject,
    duration: Number(duration || 0),
    date: formatSessionDate(now),
    startTime: formatClockTime(now),
    endTime: "",
    notes,
    completed: false,
    createdAt: now.toISOString(),
  };
}

export function buildCompletedSession({
  subject = "General",
  duration = 25,
  startDate = new Date(),
  endDate = new Date(),
  notes = "",
  id,
} = {}) {
  const safeStart = new Date(startDate);
  const safeEnd = new Date(endDate);

  return {
    id: id || createId("sess"),
    subject,
    duration: Number(duration || 0),
    date: formatSessionDate(safeStart),
    startTime: formatClockTime(safeStart),
    endTime: formatClockTime(safeEnd),
    notes,
    completed: true,
    createdAt: safeStart.toISOString(),
  };
}

export function getProgressPercent(totalSeconds, remainingSeconds) {
  const total = Math.max(0, Number(totalSeconds || 0));
  const remaining = Math.max(0, Number(remainingSeconds || 0));

  if (total === 0) return 0;

  const completed = total - remaining;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

export function getTimerStatus({ isRunning = false, remainingSeconds = 0 } = {}) {
  if (isTimerComplete(remainingSeconds)) return "completed";
  return isRunning ? "running" : "paused";
}

export function getEndTimestampFromNow(minutes = 25) {
  const now = Date.now();
  const durationMs = Math.max(0, Number(minutes || 0) * 60 * 1000);
  return new Date(now + durationMs).toISOString();
}

const timerService = {
  getInitialTime,
  formatTime,
  formatClockTime,
  formatSessionDate,
  calculateRemainingTime,
  isTimerComplete,
  createTimerSession,
  buildCompletedSession,
  getProgressPercent,
  getTimerStatus,
  getEndTimestampFromNow,
};

export default timerService;