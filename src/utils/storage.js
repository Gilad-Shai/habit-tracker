const STORAGE_KEY = 'habit-tracker-data';

export function loadHabits() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Failed to load habits from localStorage:', err);
    return [];
  }
}

export function saveHabits(habits) {
  try {
    const serialized = JSON.stringify(habits);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Failed to save habits to localStorage:', err);
  }
}

export function clearHabits() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear habits from localStorage:', err);
  }
}