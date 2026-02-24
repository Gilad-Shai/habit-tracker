import { useState, useEffect } from "react";
import HabitList from "./components/HabitList";
import AddHabitForm from "./components/AddHabitForm";
import { loadHabits, saveHabits } from "./utils/storage";
import "./styles/app.css";

export default function App() {
  const [habits, setHabits] = useState(() => loadHabits());

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  function addHabit(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newHabit = {
      id: crypto.randomUUID(),
      name: trimmed,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
  }

  function toggleToday(habitId) {
    const today = new Date().toISOString().slice(0, 10);
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const alreadyDone = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: alreadyDone
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today],
        };
      })
    );
  }

  function deleteHabit(habitId) {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Habit Tracker</h1>
        <p className="app-subtitle">Build streaks, one day at a time.</p>
      </header>
      <main>
        <AddHabitForm onAdd={addHabit} />
        <HabitList
          habits={habits}
          onToggleToday={toggleToday}
          onDelete={deleteHabit}
        />
      </main>
    </div>
  );
}