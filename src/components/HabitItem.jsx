import React from "react";
import { calculateStreak } from "../utils/streakCalculator";

export default function HabitItem({ habit, onToggleDay, onDelete }) {
  const today = new Date().toISOString().split("T")[0];
  const checkedToday = habit.completedDates.includes(today);
  const streak = calculateStreak(habit.completedDates);

  return (
    <div className={`habit-item ${checkedToday ? "completed" : ""}`}>
      <div className="habit-info">
        <button
          className={`check-btn ${checkedToday ? "checked" : ""}`}
          onClick={() => onToggleDay(habit.id, today)}
          aria-label={checkedToday ? "Unmark habit" : "Mark habit as done"}
        >
          {checkedToday ? "✓" : ""}
        </button>
        <span className="habit-name">{habit.name}</span>
      </div>
      <div className="habit-meta">
        <span className="streak-badge" title="Current streak">
          🔥 {streak} {streak === 1 ? "day" : "days"}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(habit.id)}
          aria-label="Delete habit"
        >
          🗑
        </button>
      </div>
    </div>
  );
}