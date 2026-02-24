import React from "react";
import HabitItem from "./HabitItem";

const HabitList = ({ habits, onToggle, onDelete }) => {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <p>No habits yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default HabitList;