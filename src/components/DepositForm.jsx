import { useState, useEffect } from "react";

function DepositForm({ onDepositRefresh }) {
  const [goals, setGoals] = useState([]);
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const depositAmount = parseFloat(amount);
    if (!goalId || depositAmount <= 0) return;

    const selectedGoal = goals.find((g) => g.id === parseInt(goalId));
    if (!selectedGoal) return;

    const updatedGoal = {
      ...selectedGoal,
      saved: selectedGoal.saved + depositAmount,
    };

    try {
      const res = await fetch(
        `http://localhost:3001/goals/${selectedGoal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGoal),
        }
      );

      if (res.ok) {
        setAmount("");
        setGoalId("");
        alert("💰 Deposit successful!");
        onDepositRefresh(); // 🔁 Refetch latest data
      }
    } catch (err) {
      console.error("Deposit failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h2>Make a Deposit</h2>

      <label>Select Goal:</label>
      <select
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        required
      >
        <option value="">-- Choose a goal --</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>

      <label>Amount:</label>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
