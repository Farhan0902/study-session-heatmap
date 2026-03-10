const SESSION_KEY = "study_sessions";
const REFLECTION_KEY = "study_reflections";

const isBrowser = typeof window !== "undefined";

function safeParse(value, fallback = []) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function sortSessionsDesc(sessions) {
  return [...sessions].sort((a, b) => {
    const aDate = new Date(`${a.date}T${a.startTime || "00:00:00"}`).getTime();
    const bDate = new Date(`${b.date}T${b.startTime || "00:00:00"}`).getTime();
    return bDate - aDate;
  });
}

function sortReflectionsDesc(reflections) {
  return [...reflections].sort((a, b) => {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

function createId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeSession(session = {}) {
  return {
    id: session.id || createId("sess"),
    subject: session.subject || "General",
    duration: Number(session.duration || 0),
    date: session.date || new Date().toISOString().split("T")[0],
    startTime: session.startTime || "",
    endTime: session.endTime || "",
    notes: session.notes || "",
    completed: Boolean(session.completed),
    createdAt: session.createdAt || new Date().toISOString(),
  };
}

function normalizeReflection(reflection = {}) {
  return {
    id: reflection.id || createId("note"),
    sessionId: reflection.sessionId || null,
    subject: reflection.subject || "General",
    content: reflection.content || "",
    date: reflection.date || new Date().toISOString().split("T")[0],
    createdAt: reflection.createdAt || new Date().toISOString(),
  };
}

export function getSessions() {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(SESSION_KEY);
  const sessions = safeParse(raw, []).map(normalizeSession);
  return sortSessionsDesc(sessions);
}

export function getSessionById(id) {
  return getSessions().find((session) => session.id === id) || null;
}

export function saveSessions(sessions = []) {
  if (!isBrowser) return [];
  const normalized = sessions.map(normalizeSession);
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  return sortSessionsDesc(normalized);
}

export function saveSession(session) {
  const sessions = getSessions();
  const normalized = normalizeSession(session);
  const nextSessions = [normalized, ...sessions.filter((item) => item.id !== normalized.id)];
  return saveSessions(nextSessions);
}

export function updateSession(id, updatedData = {}) {
  const sessions = getSessions();
  const nextSessions = sessions.map((session) =>
    session.id === id ? normalizeSession({ ...session, ...updatedData, id: session.id }) : session
  );
  saveSessions(nextSessions);
  return getSessionById(id);
}

export function deleteSession(id) {
  const sessions = getSessions();
  const nextSessions = sessions.filter((session) => session.id !== id);
  return saveSessions(nextSessions);
}

export function clearSessions() {
  if (!isBrowser) return;
  localStorage.removeItem(SESSION_KEY);
}

export function getReflections() {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(REFLECTION_KEY);
  const reflections = safeParse(raw, []).map(normalizeReflection);
  return sortReflectionsDesc(reflections);
}

export function getReflectionById(id) {
  return getReflections().find((reflection) => reflection.id === id) || null;
}

export function saveReflections(reflections = []) {
  if (!isBrowser) return [];
  const normalized = reflections.map(normalizeReflection);
  localStorage.setItem(REFLECTION_KEY, JSON.stringify(normalized));
  return sortReflectionsDesc(normalized);
}

export function saveReflection(reflection) {
  const reflections = getReflections();
  const normalized = normalizeReflection(reflection);
  const nextReflections = [
    normalized,
    ...reflections.filter((item) => item.id !== normalized.id),
  ];
  return saveReflections(nextReflections);
}

export function updateReflection(id, updatedData = {}) {
  const reflections = getReflections();
  const nextReflections = reflections.map((reflection) =>
    reflection.id === id
      ? normalizeReflection({ ...reflection, ...updatedData, id: reflection.id })
      : reflection
  );
  saveReflections(nextReflections);
  return getReflectionById(id);
}

export function deleteReflection(id) {
  const reflections = getReflections();
  const nextReflections = reflections.filter((reflection) => reflection.id !== id);
  return saveReflections(nextReflections);
}

export function clearReflections() {
  if (!isBrowser) return;
  localStorage.removeItem(REFLECTION_KEY);
}

export function clearAllStudyData() {
  clearSessions();
  clearReflections();
}

const storageService = {
  getSessions,
  getSessionById,
  saveSessions,
  saveSession,
  updateSession,
  deleteSession,
  clearSessions,
  getReflections,
  getReflectionById,
  saveReflections,
  saveReflection,
  updateReflection,
  deleteReflection,
  clearReflections,
  clearAllStudyData,
};

export default storageService;