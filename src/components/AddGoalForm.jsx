import { useState } from "react";

function AddGoalForm({ onGoalAdded }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !targetAmount || !category || !deadline) {
      alert("Please fill out all fields.");
      return;
    }

    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
      saved: 0,
    };

    try {
      const response = await fetch("http://localhost:3001/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error("Failed to save goal.");
      }

      const savedGoal = await response.json();
      onGoalAdded(savedGoal); // update the dashboard's state
      setName("");
      setTargetAmount("");
      setCategory("");
      setDeadline("");
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Something went wrong while saving the goal.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>

      <label>Goal Name:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Target Amount:</label>
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
      />

      <label>Category:</label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <label>Deadline:</label>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      <button type="submit">Save Goal</button>
    </form>
  );
}

export default AddGoalForm;
