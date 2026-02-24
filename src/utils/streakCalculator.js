/**
 * Calculates the current consecutive-day streak for a habit.
 * @param {string[]} completedDates - Array of ISO date strings (YYYY-MM-DD) when the habit was completed.
 * @returns {number} The current streak count.
 */
export function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  const uniqueDates = [...new Set(completedDates)].sort((a, b) =>
    b.localeCompare(a)
  );

  const today = getTodayString();
  const yesterday = getDateString(1);

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const currentDate = new Date(uniqueDates[i - 1] + "T00:00:00");
    const prevDate = new Date(uniqueDates[i] + "T00:00:00");

    const diffTime = currentDate - prevDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Returns today's date as an ISO date string (YYYY-MM-DD).
 * @returns {string}
 */
export function getTodayString() {
  return getDateString(0);
}

/**
 * Returns a date string (YYYY-MM-DD) for a given number of days ago.
 * @param {number} daysAgo - Number of days in the past.
 * @returns {string}
 */
export function getDateString(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks whether a habit has been completed today.
 * @param {string[]} completedDates - Array of ISO date strings when the habit was completed.
 * @returns {boolean}
 */
export function isCompletedToday(completedDates) {
  if (!completedDates || completedDates.length === 0) return false;
  return completedDates.includes(getTodayString());
}

/**
 * Toggles today's completion status for a habit.
 * @param {string[]} completedDates - Array of ISO date strings when the habit was completed.
 * @returns {string[]} Updated array of completed dates.
 */
export function toggleTodayCompletion(completedDates) {
  const today = getTodayString();
  const dates = completedDates ? [...completedDates] : [];

  if (dates.includes(today)) {
    return dates.filter((date) => date !== today);
  } else {
    return [...dates, today];
  }
}