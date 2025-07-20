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
      name: name.trim(),
      targetAmount: parseFloat(targetAmount),
      category: category.trim(),
      deadline,
      saved: 0,
      createdAt: new Date().toISOString()  // <-- ✅ add this line
    };

    try {
      const res = await fetch("http://localhost:3002/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (!res.ok) {
        console.error("Failed POST response:", res.status);
        throw new Error("Failed to save goal.");
      }

      const savedGoal = await res.json();

      if (onGoalAdded) {
        onGoalAdded(savedGoal);
      }

      setName("");
      setTargetAmount("");
      setCategory("");
      setDeadline("");
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Could not save goal. Check if the backend is running.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>

      <label htmlFor="goal-name">Goal Name:</label>
      <input
        id="goal-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="E.g., Buy a Laptop"
        required
      />

      <label htmlFor="target-amount">Target Amount:</label>
      <input
        id="target-amount"
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="E.g., 50000"
        required
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>Select a category</option>
        <option value="Education">Education</option>
        <option value="Travel">Travel</option>
        <option value="Investment">Investment</option>
        <option value="Personal">Personal</option>
        <option value="Emergency">Emergency</option>
      </select>

      <label htmlFor="deadline">Deadline:</label>
      <input
        id="deadline"
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
