function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function pad(value) {
  return String(value).padStart(2, "0");
}

export function formatTime(totalSeconds = 0) {
  const safeSeconds = Math.max(0, Math.floor(toNumber(totalSeconds)));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function formatMinutes(minutes = 0) {
  const total = Math.max(0, Math.floor(toNumber(minutes)));
  return `${total} min`;
}

export function formatMinutesShort(minutes = 0) {
  const total = Math.max(0, Math.floor(toNumber(minutes)));
  return `${total}m`;
}

export function formatDuration(minutes = 0) {
  const total = Math.max(0, Math.floor(toNumber(minutes)));

  if (total < 60) {
    return `${total} min`;
  }

  const hours = Math.floor(total / 60);
  const remainingMinutes = total % 60;

  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

export function formatDurationCompact(minutes = 0) {
  const total = Math.max(0, Math.floor(toNumber(minutes)));
  const hours = Math.floor(total / 60);
  const remainingMinutes = total % 60;

  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatPercent(value = 0, digits = 0) {
  const safe = toNumber(value, 0);
  return `${safe.toFixed(digits)}%`;
}

export function formatNumber(value = 0, locale = "en-US") {
  return toNumber(value, 0).toLocaleString(locale);
}

export function formatSubject(subject = "") {
  return String(subject || "General").trim() || "General";
}

export function formatSessionCount(count = 0) {
  const total = Math.max(0, Math.floor(toNumber(count)));
  return `${total} session${total === 1 ? "" : "s"}`;
}

export function formatDateLabel(dateValue, locale = "en-US") {
  const date = new Date(dateValue);
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  });
}

export function formatFullDateLabel(dateValue, locale = "en-US") {
  const date = new Date(dateValue);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTimeLabel(dateValue, locale = "en-US") {
  const date = new Date(dateValue);
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatClockTime(dateValue, locale = "en-US") {
  const date = new Date(dateValue);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function truncateText(text = "", maxLength = 80) {
  const value = String(text || "");
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

export function capitalize(text = "") {
  const value = String(text || "").trim();
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatHeatLevelLabel(level = 0) {
  const safeLevel = toNumber(level, 0);

  switch (safeLevel) {
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

export function formatInsightText(text = "") {
  return capitalize(String(text || "").trim());
}

const formatUtils = {
  formatTime,
  formatMinutes,
  formatMinutesShort,
  formatDuration,
  formatDurationCompact,
  formatPercent,
  formatNumber,
  formatSubject,
  formatSessionCount,
  formatDateLabel,
  formatFullDateLabel,
  formatDateTimeLabel,
  formatClockTime,
  truncateText,
  capitalize,
  formatHeatLevelLabel,
  formatInsightText,
};

export default formatUtils;