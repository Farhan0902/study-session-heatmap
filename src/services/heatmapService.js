function toDateKey(dateValue) {
  return new Date(dateValue).toISOString().split("T")[0];
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

function getStartOfMonth(dateValue = new Date()) {
  const d = startOfDay(dateValue);
  d.setDate(1);
  return d;
}

export function getHeatLevel(minutes = 0) {
  const total = Number(minutes || 0);

  if (total <= 0) return 0;
  if (total <= 25) return 1;
  if (total <= 50) return 2;
  if (total <= 90) return 3;
  return 4;
}

export function getHeatLabel(minutes = 0) {
  const level = getHeatLevel(minutes);

  switch (level) {
    case 0:
      return "No study";
    case 1:
      return "Light";
    case 2:
      return "Moderate";
    case 3:
      return "Strong";
    case 4:
      return "Very strong";
    default:
      return "No study";
  }
}

export function groupSessionsByDate(sessions = []) {
  return sessions.reduce((acc, session) => {
    const dateKey = session.date || toDateKey(session.createdAt || new Date());
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(session);
    return acc;
  }, {});
}

export function getDailyStudyMinutes(sessions = []) {
  const grouped = groupSessionsByDate(sessions);

  return Object.entries(grouped).reduce((acc, [date, items]) => {
    acc[date] = items.reduce((sum, item) => sum + Number(item.duration || 0), 0);
    return acc;
  }, {});
}

export function groupSessionsByDayAndHour(sessions = []) {
  return sessions.reduce((acc, session) => {
    const date = session.date || toDateKey(session.createdAt || new Date());
    const hour = Number((session.startTime || "00:00").split(":")[0] || 0);

    if (!acc[date]) acc[date] = {};
    if (!acc[date][hour]) acc[date][hour] = 0;

    acc[date][hour] += Number(session.duration || 0);
    return acc;
  }, {});
}

export function getRangeDates(range = "week", baseDate = new Date()) {
  const safeBase = startOfDay(baseDate);

  if (range === "month") {
    const start = getStartOfMonth(safeBase);
    const daysInMonth = new Date(
      safeBase.getFullYear(),
      safeBase.getMonth() + 1,
      0
    ).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const current = addDays(start, index);
      return toDateKey(current);
    });
  }

  const start = getStartOfWeek(safeBase);
  return Array.from({ length: 7 }, (_, index) => {
    const current = addDays(start, index);
    return toDateKey(current);
  });
}

export function generateHeatmapData(
  sessions = [],
  range = "week",
  baseDate = new Date()
) {
  const dailyMinutes = getDailyStudyMinutes(sessions);
  const dates = getRangeDates(range, baseDate);

  return dates.map((date) => {
    const minutes = Number(dailyMinutes[date] || 0);

    return {
      date,
      minutes,
      level: getHeatLevel(minutes),
      label: getHeatLabel(minutes),
    };
  });
}

export function buildCalendarHeatmapData(sessions = [], totalDays = 30, baseDate = new Date()) {
  const safeBase = startOfDay(baseDate);
  const dailyMinutes = getDailyStudyMinutes(sessions);
  const startDate = addDays(safeBase, -(totalDays - 1));

  return Array.from({ length: totalDays }, (_, index) => {
    const current = addDays(startDate, index);
    const date = toDateKey(current);
    const minutes = Number(dailyMinutes[date] || 0);

    return {
      date,
      dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
      minutes,
      level: getHeatLevel(minutes),
      label: getHeatLabel(minutes),
    };
  });
}

export function getTotalMinutesInRange(
  sessions = [],
  range = "week",
  baseDate = new Date()
) {
  const heatmapData = generateHeatmapData(sessions, range, baseDate);
  return heatmapData.reduce((sum, item) => sum + item.minutes, 0);
}

const heatmapService = {
  getHeatLevel,
  getHeatLabel,
  groupSessionsByDate,
  getDailyStudyMinutes,
  groupSessionsByDayAndHour,
  getRangeDates,
  generateHeatmapData,
  buildCalendarHeatmapData,
  getTotalMinutesInRange,
};

export default heatmapService;