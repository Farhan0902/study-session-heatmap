export const APP_NAME = "Study Session Heatmap";

export const STORAGE_KEYS = {
  SESSIONS: "study_sessions",
  REFLECTIONS: "study_reflections",
  TIMER_STATE: "study_timer_state",
  SETTINGS: "study_settings",
};

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  FOCUS: "/focus",
  HEATMAP: "/heatmap",
  ANALYTICS: "/analytics",
  SESSIONS: "/sessions",
  NOTES: "/notes",
};

export const TIMER_PRESETS = [15, 25, 45, 60];

export const DEFAULT_TIMER_MINUTES = 25;

export const SUBJECT_OPTIONS = [
  "Math",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "English",
  "Programming",
  "Database",
  "UI/UX",
  "General",
];

export const HEATMAP_RANGES = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "30 Days", value: "30days" },
];

export const HEATMAP_LEVELS = [
  { level: 0, label: "No study", min: 0, max: 0 },
  { level: 1, label: "Light", min: 1, max: 25 },
  { level: 2, label: "Moderate", min: 26, max: 50 },
  { level: 3, label: "Strong", min: 51, max: 90 },
  { level: 4, label: "Very strong", min: 91, max: Infinity },
];

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const SESSION_STATUS = {
  COMPLETED: "completed",
  RUNNING: "running",
  PAUSED: "paused",
};

export const CHART_EMPTY_STATE = {
  label: "No data",
  value: 0,
};

const constants = {
  APP_NAME,
  STORAGE_KEYS,
  ROUTES,
  TIMER_PRESETS,
  DEFAULT_TIMER_MINUTES,
  SUBJECT_OPTIONS,
  HEATMAP_RANGES,
  HEATMAP_LEVELS,
  WEEKDAY_LABELS,
  MONTH_LABELS,
  SESSION_STATUS,
  CHART_EMPTY_STATE,
};

export default constants;