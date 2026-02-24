import { useState } from "react";

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Habit name cannot be empty.");
      return;
    }
    onAdd(trimmed);
    setName("");
    setError("");
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          className="habit-input"
          placeholder="Enter a new habit..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          maxLength={100}
          aria-label="New habit name"
        />
        <button type="submit" className="add-btn">
          Add Habit
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}