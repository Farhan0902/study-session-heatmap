// Helper untuk dapatkan minggu ke berapa dalam tahun
function getWeekKey(dateValue) {
  const d = new Date(dateValue);
  d.setHours(0, 0, 0, 0);
  // Minggu dimulai Senin
  const firstDay = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d - firstDay) / (24 * 60 * 60 * 1000)) + 1;
  const week = Math.ceil((dayOfYear + firstDay.getDay()) / 7);
  return `${d.getFullYear()}-W${week}`;
}

// Helper untuk dapatkan bulan
function getMonthKey(dateValue) {
  const d = new Date(dateValue);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function getSessionsPerWeek(sessions = []) {
  const counts = sessions.reduce((acc, session) => {
    const week = getWeekKey(getDateFromSession(session));
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([week, count]) => ({ week, count }));
}

export function getSessionsPerMonth(sessions = []) {
  const counts = sessions.reduce((acc, session) => {
    const month = getMonthKey(getDateFromSession(session));
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }));
}
function getDateFromSession(session) {
  return session.date || new Date(session.createdAt || new Date()).toISOString().split("T")[0];
}

function getWeekdayName(dateValue) {
  return new Date(dateValue).toLocaleDateString("en-US", { weekday: "short" });
}

function startOfDay(dateValue = new Date()) {
  const d = new Date(dateValue);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(dateValue, amount) {
  const d = new Date(dateValue);
  d.setDate(d.getDate() + amount);
  return d;
}

function getStartOfWeek(dateValue = new Date()) {
  const d = startOfDay(dateValue);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(d, diff);
}

function toDateKey(dateValue) {
  return new Date(dateValue).toISOString().split("T")[0];
}

export function getTotalStudyMinutes(sessions = []) {
  return sessions.reduce((sum, session) => sum + Number(session.duration || 0), 0);
}

export function getTotalSessions(sessions = []) {
  return sessions.length;
}

export function getAverageSessionDuration(sessions = []) {
  if (!sessions.length) return 0;
  return Math.round(getTotalStudyMinutes(sessions) / sessions.length);
}

export function getMostStudiedSubject(sessions = []) {
  if (!sessions.length) return { subject: "-", minutes: 0 };

  const subjectMap = sessions.reduce((acc, session) => {
    const subject = session.subject || "General";
    acc[subject] = (acc[subject] || 0) + Number(session.duration || 0);
    return acc;
  }, {});

  const [subject, minutes] = Object.entries(subjectMap).sort((a, b) => b[1] - a[1])[0];
  return { subject, minutes };
}

export function getSessionsPerDay(sessions = []) {
  const counts = sessions.reduce((acc, session) => {
    const date = getDateFromSession(session);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({
      date,
      day: getWeekdayName(date),
      count,
    }));
}

export function getStudyMinutesPerDay(sessions = []) {
  const totals = sessions.reduce((acc, session) => {
    const date = getDateFromSession(session);
    acc[date] = (acc[date] || 0) + Number(session.duration || 0);
    return acc;
  }, {});

  return Object.entries(totals)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, minutes]) => ({
      date,
      day: getWeekdayName(date),
      minutes,
    }));
}

export function getSubjectDistribution(sessions = []) {
  const totals = sessions.reduce((acc, session) => {
    const subject = session.subject || "General";
    acc[subject] = (acc[subject] || 0) + Number(session.duration || 0);
    return acc;
  }, {});

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value,
    }));
}

export function getWeeklyProductivityData(sessions = [], baseDate = new Date()) {
  const start = getStartOfWeek(baseDate);
  const dates = Array.from({ length: 7 }, (_, index) => toDateKey(addDays(start, index)));

  const totals = sessions.reduce((acc, session) => {
    const date = getDateFromSession(session);
    acc[date] = (acc[date] || 0) + Number(session.duration || 0);
    return acc;
  }, {});

  return dates.map((date) => ({
    date,
    day: getWeekdayName(date),
    minutes: Number(totals[date] || 0),
  }));
}

export function getTopInsights(sessions = []) {
  if (!sessions.length) {
    return [
      "Belum ada sesi belajar.",
      "Mulai satu sesi fokus untuk melihat insight.",
      "Heatmap dan analytics akan muncul setelah data tersimpan.",
    ];
  }

  const totalMinutes = getTotalStudyMinutes(sessions);
  const totalSessions = getTotalSessions(sessions);
  const average = getAverageSessionDuration(sessions);
  const mostStudied = getMostStudiedSubject(sessions);

  const dailyMinutes = getStudyMinutesPerDay(sessions);
  const bestDay = [...dailyMinutes].sort((a, b) => b.minutes - a.minutes)[0];

  return [
    `Total belajar ${totalMinutes} menit dari ${totalSessions} sesi.`,
    `Rata-rata durasi sesi ${average} menit.`,
    `Subject paling dominan ${mostStudied.subject} (${mostStudied.minutes} menit).`,
    bestDay ? `Hari paling produktif ${bestDay.day} (${bestDay.minutes} menit).` : "Belum ada hari produktif terdeteksi.",
  ];
}

export function getDashboardStats(sessions = [], baseDate = new Date()) {
  const weeklyData = getWeeklyProductivityData(sessions, baseDate);
  const totalStudyMinutes = getTotalStudyMinutes(sessions);
  const totalSessions = getTotalSessions(sessions);
  const averageSessionDuration = getAverageSessionDuration(sessions);
  const mostStudiedSubject = getMostStudiedSubject(sessions);

  return {
    totalStudyMinutes,
    totalSessions,
    averageSessionDuration,
    mostStudiedSubject,
    weeklyData,
    insights: getTopInsights(sessions),
  };
}

const analyticsService = {
  getTotalStudyMinutes,
  getTotalSessions,
  getAverageSessionDuration,
  getMostStudiedSubject,
  getSessionsPerDay,
  getStudyMinutesPerDay,
  getSubjectDistribution,
  getWeeklyProductivityData,
  getTopInsights,
  getDashboardStats,
};

export default analyticsService;