function toSafeDate(value = new Date()) {
  if (value instanceof Date) return new Date(value);
  return new Date(value);
}

export function pad(value) {
  return String(value).padStart(2, "0");
}

export function toDateKey(value = new Date()) {
  const date = toSafeDate(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function toTimeKey(value = new Date()) {
  const date = toSafeDate(value);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function startOfDay(value = new Date()) {
  const date = toSafeDate(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(value = new Date()) {
  const date = toSafeDate(value);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function addDays(value = new Date(), amount = 0) {
  const date = toSafeDate(value);
  date.setDate(date.getDate() + Number(amount || 0));
  return date;
}

export function addMinutes(value = new Date(), amount = 0) {
  const date = toSafeDate(value);
  date.setMinutes(date.getMinutes() + Number(amount || 0));
  return date;
}

export function addMonths(value = new Date(), amount = 0) {
  const date = toSafeDate(value);
  date.setMonth(date.getMonth() + Number(amount || 0));
  return date;
}

export function getStartOfWeek(value = new Date()) {
  const date = startOfDay(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(date, diff);
}

export function getEndOfWeek(value = new Date()) {
  const start = getStartOfWeek(value);
  const end = addDays(start, 6);
  return endOfDay(end);
}

export function getStartOfMonth(value = new Date()) {
  const date = startOfDay(value);
  date.setDate(1);
  return date;
}

export function getEndOfMonth(value = new Date()) {
  const date = toSafeDate(value);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getDaysInMonth(value = new Date()) {
  const date = toSafeDate(value);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

export function isToday(value) {
  return isSameDay(value, new Date());
}

export function isThisWeek(value, baseDate = new Date()) {
  const date = toSafeDate(value).getTime();
  const start = getStartOfWeek(baseDate).getTime();
  const end = getEndOfWeek(baseDate).getTime();
  return date >= start && date <= end;
}

export function isThisMonth(value, baseDate = new Date()) {
  const target = toSafeDate(value);
  const base = toSafeDate(baseDate);
  return (
    target.getFullYear() === base.getFullYear() &&
    target.getMonth() === base.getMonth()
  );
}

export function getDateRange(range = "week", baseDate = new Date()) {
  if (range === "month") {
    const start = getStartOfMonth(baseDate);
    const total = getDaysInMonth(baseDate);
    return Array.from({ length: total }, (_, index) => toDateKey(addDays(start, index)));
  }

  if (range === "30days") {
    const end = startOfDay(baseDate);
    const start = addDays(end, -29);
    return Array.from({ length: 30 }, (_, index) => toDateKey(addDays(start, index)));
  }

  const start = getStartOfWeek(baseDate);
  return Array.from({ length: 7 }, (_, index) => toDateKey(addDays(start, index)));
}

export function getWeekdayIndex(value = new Date()) {
  const day = toSafeDate(value).getDay();
  return day === 0 ? 6 : day - 1;
}

export function getWeekdayShort(value = new Date(), locale = "en-US") {
  return toSafeDate(value).toLocaleDateString(locale, { weekday: "short" });
}

export function getMonthShort(value = new Date(), locale = "en-US") {
  return toSafeDate(value).toLocaleDateString(locale, { month: "short" });
}

export function getMonthLong(value = new Date(), locale = "en-US") {
  return toSafeDate(value).toLocaleDateString(locale, { month: "long" });
}

export function getYear(value = new Date()) {
  return toSafeDate(value).getFullYear();
}

export function getHour(value = new Date()) {
  return toSafeDate(value).getHours();
}

export function getReadableDate(value = new Date(), locale = "en-US") {
  return toSafeDate(value).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getReadableDateTime(value = new Date(), locale = "en-US") {
  return toSafeDate(value).toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const dateUtils = {
  pad,
  toDateKey,
  toTimeKey,
  startOfDay,
  endOfDay,
  addDays,
  addMinutes,
  addMonths,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getDaysInMonth,
  isSameDay,
  isToday,
  isThisWeek,
  isThisMonth,
  getDateRange,
  getWeekdayIndex,
  getWeekdayShort,
  getMonthShort,
  getMonthLong,
  getYear,
  getHour,
  getReadableDate,
  getReadableDateTime,
};

export default dateUtils;