import { useState, useEffect } from "react";

function EditGoalForm({ goal, onSave, onCancel }) {
  const [formData, setFormData] = useState(goal);

  useEffect(() => {
    setFormData(goal);
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3002/goals/${goal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedGoal = await res.json();
        onSave(updatedGoal);
      } else {
        console.error("Failed to update goal");
      }
    } catch (err) {
      console.error("Error updating goal:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-goal-form">
      <h3>Edit Goal</h3>
      <input
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Goal name"
        required
      />
      <input
        name="category"
        value={formData.category || ""}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        name="targetAmount"
        type="number"
        value={formData.targetAmount || ""}
        onChange={handleChange}
        placeholder="Target Amount"
        required
      />
      <input
        name="deadline"
        type="date"
        value={formData.deadline || ""}
        onChange={handleChange}
        required
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditGoalForm;
